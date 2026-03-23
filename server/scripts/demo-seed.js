const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Models
const User = require('../models/User');
const Course = require('../models/Course');
const Forecast = require('../models/scm/Forecast');
const SupplyLog = require('../models/scm/SupplyLog');
const CourseRequest = require('../models/scm/CourseRequest');
const CustomerProfile = require('../models/crm/CustomerProfile');
const InteractionLog = require('../models/crm/InteractionLog');
const FinancialRecord = require('../models/erp/FinancialRecord');
const InstructorData = require('../models/erp/InstructorData');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for Seeding...");

        // 1. Clear existing Strategic Data + Demo Users
        await Forecast.deleteMany({});
        await SupplyLog.deleteMany({});
        await CourseRequest.deleteMany({});
        await CustomerProfile.deleteMany({});
        await InteractionLog.deleteMany({});
        await FinancialRecord.deleteMany({});
        await InstructorData.deleteMany({});
        // await User.deleteMany({ role: 'student', userEmail: /@demo\.com$/ }); // Optional: clear old demo students

        console.log("Cleared old Strategic Data.");

        // 2. Ensure an Instructor exists
        let instructor = await User.findOne({ role: 'instructor' });
        if (!instructor) {
            instructor = await User.create({
                userName: 'Prakhar Instructor',
                userEmail: 'prakhar@demo.com',
                password: 'password123',
                role: 'instructor'
            });
            console.log("Created Demo Instructor.");
        }

        // 3. Ensure some Courses exist
        let courses = await Course.find();
        if (courses.length < 3) {
            const courseData = [
                {
                   title: "Strategic React Architecture",
                   category: "web-development",
                   level: "advanced",
                   primaryLanguage: "english",
                   subtitle: "Mastering Scale with Atomic Design",
                   description: "A comprehensive guide to building enterprise-grade apps.",
                   pricing: 4999,
                   instructorId: instructor._id,
                   instructorName: instructor.userName,
                   date: new Date(),
                   isPublised: true,
                   students: []
                },
                {
                   title: "Agentic AI & LLMs",
                   category: "artificial-intelligence",
                   level: "intermediate",
                   primaryLanguage: "english",
                   subtitle: "Building the next generation of AI Agents",
                   description: "Learn how to build autonomous agents using LangChain and Gemini.",
                   pricing: 2999,
                   instructorId: instructor._id,
                   instructorName: instructor.userName,
                   date: new Date(),
                   isPublised: true,
                   students: []
                },
                {
                    title: "Full Stack SCM Logic",
                    category: "business",
                    level: "beginner",
                    primaryLanguage: "english",
                    subtitle: "Connecting Code to Logistics",
                    description: "Learn how to build supply chain software.",
                    pricing: 1999,
                    instructorId: instructor._id,
                    instructorName: instructor.userName,
                    date: new Date(),
                    isPublised: true,
                    students: []
                 }
            ];
            courses = await Course.insertMany(courseData);
            console.log("Created Demo Courses.");
        }

        // 4. Seed SCM Data
        const scmRequests = [
            { requestedTopic: "Rust for Web", category: "Backend", description: "Need deep dive into Axum and Tokio", votes: 45 },
            { requestedTopic: "Advanced Figma", category: "Design", description: "Design systems and variable logic", votes: 22 },
            { requestedTopic: "Kubernetes 101", category: "DevOps", description: "From local to cloud deployment", votes: 68 },
            { requestedTopic: "Next.js 15 Server Components", category: "Web", description: "Mastering the new paradigm", votes: 34 }
        ];
        await CourseRequest.insertMany(scmRequests);

        const scmForecasts = courses.map(c => ({
            courseId: c._id,
            courseTitle: c.title,
            predictedDemand: Math.floor(Math.random() * 500) + 100,
            confidenceLevel: 0.85 + (Math.random() * 0.1),
            period: "Next 30 Days",
            featuresUsed: ["historical_enrollment", "trending_market"]
        }));
        await Forecast.insertMany(scmForecasts);
        console.log("Seeded SCM Data.");

        // 5. Create Demo Students and CRM Profiles
        const stages = ["acquisition", "onboarding", "retention", "loyalty"];
        const segments = ["active", "inactive", "high_spender"];
        
        for(let i=0; i<30; i++) {
           const studentUser = await User.create({
              userName: `Student_Demo_${i}`,
              userEmail: `demo_student${i}@demo.com`,
              password: 'password123',
              role: 'student'
           });

           await CustomerProfile.create({
              userId: studentUser._id,
              userName: studentUser.userName,
              userEmail: studentUser.userEmail,
              segment: segments[Math.floor(Math.random()*segments.length)],
              totalSpent: Math.floor(Math.random()*15000),
              courseCompletionRate: Math.floor(Math.random()*100),
              averageEngagementTime: Math.floor(Math.random()*300),
              lastActive: new Date(),
              lifecycleStage: stages[Math.floor(Math.random()*stages.length)],
              cac: Math.floor(Math.random()*500) + 100,
              clv: Math.floor(Math.random()*5000) + 1000
           });
           
           if (i < 10) { // Some recent interactions from some students
              const actions = ["view_course", "wishlist", "purchase", "abandon_cart", "complete_lesson"];
              await InteractionLog.create({
                 userId: studentUser._id,
                 action: actions[Math.floor(Math.random()*actions.length)],
                 courseId: courses[Math.floor(Math.random()*courses.length)]._id,
                 timestamp: new Date(Date.now() - Math.random() * 86400000)
              });
           }

           // Simulate some enrollments in courses for top 5 students
           if (i < 5) {
              const targetCourse = courses[Math.floor(Math.random()*courses.length)];
              await Course.findByIdAndUpdate(targetCourse._id, {
                 $push: { students: { studentId: studentUser._id, studentName: studentUser.userName, studentEmail: studentUser.userEmail, paidAmount: targetCourse.pricing } }
              });
           }
        }
        console.log("Seeded CRM Data and Mock Students.");

        // 6. Seed ERP Data
        const paymentMethods = ["Razorpay", "PayPal", "Stripe"];
        for(let i=0; i<20; i++) {
           await FinancialRecord.create({
              amount: courses[Math.floor(Math.random()*courses.length)].pricing,
              currency: "INR",
              paymentMethod: paymentMethods[Math.floor(Math.random()*paymentMethods.length)],
              transactionType: "revenue",
              status: "captured",
              date: new Date(Date.now() - Math.random() * 1296000000)
           });
        }

        await InstructorData.create({
           instructorId: instructor._id,
           name: instructor.userName,
           assignedCourses: courses.map(c => c._id),
           totalWorkloadHours: 156,
           performanceRating: 4.9,
           enrollmentsCount: 1240,
           revenueShare: 85000
        });
        
        console.log("Seeded ERP Data.");
        console.log("DEMO SEEDING COMPLETED SUCCESSFULLY.");
        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedData();
