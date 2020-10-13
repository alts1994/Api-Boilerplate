const express = require('express');
const router = express.Router();

const Record = require('../models/records');

// middleware - retrieve record id
async function getRecord(req, res, next) {
  try {
    record = await Record.findById(req.params.id);
    if (record == null) {
      return res.status(404).json({ message: 'Cannot find record' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.record = record;
  next();
}

// Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one record
router.get('/:id', getRecord, (req, res) => {
  res.json(res.record);
});

// Create one record
router.post('/', async (req, res) => {
  const record = new Record({
    name: req.body.name,
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one record - just name property; extend as needed
router.patch('/:id', getRecord, async (req, res) => {
  if (req.body.name != null) {
    res.record.name = req.body.name;
  }
  try {
    const updatedRecord = await res.record.save();
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one record
router.delete('/:id', getRecord, async (req, res) => {
  try {
    await res.record.remove();
    res.json({ message: 'Record Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
