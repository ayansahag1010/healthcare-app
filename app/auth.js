'use strict';

const express = require('express');
const router = express.Router();

// GET login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    (username === 'admin' && password === 'Admin@1234') ||
    (username === 'doctor' && password === 'Doctor@5678')
  ) {
    req.session.user = {
      username,
      displayName: username,
      role: username === 'admin' ? 'Admin' : 'Doctor'
    };
    return res.redirect('/patients');
  }

  res.render('login', { error: 'Invalid credentials' });
});

// POST logout (IMPORTANT — matches your EJS)
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;