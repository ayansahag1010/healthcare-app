'use strict';

const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./auth');
const patientRoutes = require('./patients');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session
app.use(session({
  secret: 'healthcare-secret',
  resave: false,
  saveUninitialized: false,
}));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Auth middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login');
};

// Routes
app.use('/auth', authRoutes);
app.use('/patients', requireAuth, patientRoutes);

// Root
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/patients');
  res.redirect('/auth/login');
});

// 404
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found', code: 404 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;