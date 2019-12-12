const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

//@route  GET  api/auth
//@desc   Logged in user
//@access   Private

router.get('/', auth, async (req, res) => {
  // res.send('Get Logged in User');
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  POST  api/auth
//@desc   Auth  user & get token
//@access   Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required').exists()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ msg: 'Invalid Credentials' });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.send({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
