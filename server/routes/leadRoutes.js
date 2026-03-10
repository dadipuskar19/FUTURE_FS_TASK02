const express = require('express');
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// GET /api/leads — list all leads (with optional filters)
router.get('/', async (req, res) => {
    try {
        const { status, source, search } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (source) filter.source = source;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const leads = await Lead.find(filter).sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// POST /api/leads — create a new lead
router.post(
    '/',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('source').optional().isIn(['website', 'referral', 'social_media', 'email_campaign', 'other'])
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, phone, source } = req.body;
            const lead = await Lead.create({ name, email, phone, source });
            res.status(201).json(lead);
        } catch (error) {
            res.status(500).json({ message: 'Server error.', error: error.message });
        }
    }
);

// GET /api/leads/:id — get single lead
router.get('/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found.' });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// PUT /api/leads/:id — update lead
router.put('/:id', async (req, res) => {
    try {
        const { name, email, phone, source, status } = req.body;
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, source, status },
            { new: true, runValidators: true }
        );
        if (!lead) return res.status(404).json({ message: 'Lead not found.' });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// DELETE /api/leads/:id — delete lead
router.delete('/:id', async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found.' });
        res.json({ message: 'Lead deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// POST /api/leads/:id/notes — add a note to a lead
router.post(
    '/:id/notes',
    [body('text').trim().notEmpty().withMessage('Note text is required')],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const lead = await Lead.findById(req.params.id);
            if (!lead) return res.status(404).json({ message: 'Lead not found.' });

            lead.notes.push({ text: req.body.text });
            await lead.save();
            res.status(201).json(lead);
        } catch (error) {
            res.status(500).json({ message: 'Server error.', error: error.message });
        }
    }
);

module.exports = router;
