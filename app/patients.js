const express = require('express');
const router = express.Router();

let patients = [
  { id: 'P001', name: 'Alice', age: 25, gender: 'Female', diagnosis: 'Fever', doctor: 'Dr. A', ward: 'General', status: 'Stable', admittedOn: '2024-01-01' }
];

router.get('/', (req, res) => {
  res.render('patients', { patients, user: req.session.user, success: null });
});

router.get('/new', (req, res) => {
  res.render('patient-form', { errors: [], form: {}, user: req.session.user });
});

router.post('/', (req, res) => {
  const newPatient = {
    id: 'P00' + (patients.length + 1),
    ...req.body
  };
  patients.push(newPatient);
  res.redirect('/patients');
});

router.get('/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  res.render('patient-detail', { patient, user: req.session.user });
});

module.exports = router;