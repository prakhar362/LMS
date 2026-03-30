const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bounty = require('../models/Bounty');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Bounty.deleteMany({});
        await Bounty.insertMany([
            { title: "Fix React Router Hook Warning", company: "React (Open Source)", reward: "OSS Contributor Badge", tags: ["React", "JavaScript"], type: "Hiring Pipeline", url: "https://github.com/remix-run/react-router/issues", submissions: 5 },
            { title: "Create API Rate Limiter Package", company: "Local Startup", reward: "₹1,200", tags: ["Node.js", "Redis"], type: "Paid Gig", url: "https://github.com/expressjs/express/issues", submissions: 1 },
            { title: "Implement Tailwind Design System", company: "UI DesignCorp", reward: "Fast-Track Interview", tags: ["Next.js", "Tailwind"], type: "Hiring Pipeline", url: "https://github.com/tailwindlabs/tailwindcss", submissions: 12 },
            { title: "Analyze Real Estate Dataset", company: "Data Inc.", reward: "₹2,500", tags: ["Python", "Pandas"], type: "Paid Gig", url: "https://github.com/pandas-dev/pandas", submissions: 3 }
        ]);
        console.log("Seeded OS Bounties into database.");
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};
seed();
