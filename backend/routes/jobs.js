const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');


// Create job
router.post('/', auth, async (req, res) => {
try {
const { title, description, lastDate, company } = req.body;
const job = new Job({ title, description, lastDate, company, postedBy: req.user.id });
await job.save();
res.json(job);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Get all jobs
router.get('/', auth, async (req, res) => {
try {
const jobs = await Job.find().sort({ createdAt: -1 });
res.json(jobs);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Update job
router.put('/:id', auth, async (req, res) => {
try {
const job = await Job.findById(req.params.id);
if (!job) return res.status(404).json({ msg: 'Job not found' });
if (job.postedBy.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
const { title, description, lastDate, company } = req.body;
job.title = title || job.title;
job.description = description || job.description;
job.lastDate = lastDate || job.lastDate;
job.company = company || job.company;
await job.save();
res.json(job);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});


// Delete job
module.exports = router;
