
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');
const User = require('./models/User');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Lead.deleteMany({});
        await User.deleteMany({});

        // Create admin user
        const user = await User.create({
            name: 'Admin',
            email: 'admin@crm.com',
            password: 'admin123'
        });
        console.log('✅ Admin user created — email: admin@crm.com / password: admin123');

        // Create sample leads
        const leads = await Lead.insertMany([
            {
                name: 'Alice Johnson',
                email: 'alice@example.com',
                phone: '+1-555-0101',
                source: 'website',
                status: 'new',
                notes: [{ text: 'Filled out contact form requesting pricing info.' }]
            },
            {
                name: 'Bob Williams',
                email: 'bob@example.com',
                phone: '+1-555-0102',
                source: 'referral',
                status: 'contacted',
                notes: [
                    { text: 'Referred by existing client Mark.' },
                    { text: 'Called on Monday — interested in premium plan.' }
                ]
            },
            {
                name: 'Carol Davis',
                email: 'carol@example.com',
                phone: '+1-555-0103',
                source: 'social_media',
                status: 'qualified',
                notes: [{ text: 'Engaged via LinkedIn campaign, scheduled demo.' }]
            },
            {
                name: 'David Lee',
                email: 'david@example.com',
                phone: '+1-555-0104',
                source: 'email_campaign',
                status: 'converted',
                notes: [
                    { text: 'Responded to Q1 newsletter.' },
                    { text: 'Signed annual contract.' }
                ]
            },
            {
                name: 'Emma Brown',
                email: 'emma@example.com',
                phone: '+1-555-0105',
                source: 'website',
                status: 'lost',
                notes: [{ text: 'Was comparing with competitors, chose another vendor.' }]
            }
        ]);
        console.log(`✅ ${leads.length} sample leads created`);

        await mongoose.disconnect();
        console.log('Done!');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error.message);
        process.exit(1);
    }
};

seedData();
