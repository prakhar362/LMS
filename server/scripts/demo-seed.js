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
        console.log("Connected to MongoDB for Course-Only Seeding...");

        // ONLY CLEAR COURSE-RELATED DATA (Leave Users/Instructors alone)
        await Course.deleteMany({});
        await Forecast.deleteMany({});
        await SupplyLog.deleteMany({});
        // await CourseRequest.deleteMany({}); // Keep these as they are market signals
        await InteractionLog.deleteMany({});
        await FinancialRecord.deleteMany({});
        
        console.log("Cleared course-related collections. Keeping Users & Instructors.");

        // Get Existing Instructors
        const instructors = await User.find({ role: 'instructor' });
        if (instructors.length === 0) {
            console.log("No instructors found in DB. Please create one first.");
            process.exit(1);
        }

        const categories = ["web-development", "artificial-intelligence", "business", "design", "devops"];
        
        const assets = {
            "web-development": {
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            },
            "artificial-intelligence": {
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
                video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            "business": {
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            },
            "design": {
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
                video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
            },
            "devops": {
                image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
                video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
            }
        };

        const courses = [];
        for(let i=1; i<=15; i++) {
           const instructor = instructors[Math.floor(Math.random()*instructors.length)];
           const cat = categories[Math.floor(Math.random()*categories.length)];
           const asset = assets[cat];

           const course = await Course.create({
              instructorId: instructor._id,
              instructorName: instructor.userName,
              date: new Date(),
              title: `Ultimate ${cat.replace('-', ' ').toUpperCase()} Bootcamp 2026`,
              category: cat,
              level: i % 3 === 0 ? "advanced" : "intermediate",
              primaryLanguage: "english",
              subtitle: `Master ${cat} from zero to hero with expert architecture patterns.`,
              description: "Dive deep into the core principles, advanced strategies, and hands-on projects that will make you a professional in this field. This course includes live examples, comprehensive quizzes, and a final capstone project.",
              image: asset.image,
              welcomeMessage: "Welcome to the Strategic Learning Path! Ready to scale your skills?",
              pricing: Math.floor(Math.random() * 5000) + 1499,
              objectives: "Master core concepts;Build scalable apps;Deploy with CI/CD;Understand Lifecycle Management",
              students: [],
              curriculum: [
                {
                   title: "Introduction & Environment Setup",
                   videoUrl: asset.video,
                   public_id: `lecture_env_${i}`,
                   freePreview: true
                },
                {
                   title: "Core Architecture & Design Patterns",
                   videoUrl: asset.video,
                   public_id: `lecture_core_${i}`,
                   freePreview: false
                },
                {
                   title: "Advanced Implementation Strategies",
                   videoUrl: asset.video,
                   public_id: `lecture_adv_${i}`,
                   freePreview: false
                }
              ],
              isPublised: true
           });
           courses.push(course);
        }
        console.log(`Seeded 15 Multi-Media Courses across ${instructors.length} instructors.`);

        // Seed some new Enrollments to sync the analytics
        const students = await User.find({ role: 'student' });
        if (students.length > 0) {
            const paymentMethods = ["Razorpay", "PayPal", "Stripe"];
            for (let i=0; i<150; i++) {
               const student = students[Math.floor(Math.random()*students.length)];
               const course = courses[Math.floor(Math.random()*courses.length)];
               
               const isAlreadyEnrolled = await Course.findOne({ _id: course._id, "students.studentId": student._id });
               if (!isAlreadyEnrolled) {
                  await Course.findByIdAndUpdate(course._id, {
                     $push: { 
                        students: { 
                           studentId: student._id, 
                           studentName: student.userName, 
                           studentEmail: student.userEmail, 
                           paidAmount: course.pricing.toString() 
                        } 
                     }
                  });

                  await FinancialRecord.create({
                     amount: course.pricing,
                     currency: "INR",
                     paymentMethod: paymentMethods[Math.floor(Math.random()*paymentMethods.length)],
                     transactionType: "revenue",
                     status: "captured",
                     date: new Date(Date.now() - Math.random() * 2592000000)
                  });
               }
            }
            console.log("Simulated 150 multimedia enrollments.");
        }

        // Update SCM Forecasts
        const scmForecasts = courses.map(c => ({
            courseId: c._id,
            courseTitle: c.title,
            predictedDemand: Math.floor(Math.random() * 800) + 100,
            confidenceLevel: 0.88 + (Math.random() * 0.1),
            period: "APRIL-2026",
            featuresUsed: ["historical_enrollment", "multimedia_engagement"]
        }));
        await Forecast.insertMany(scmForecasts);

        console.log("SCM Forecasting updated with multimedia courses.");
        console.log("COMPLETE COURSE-ONLY SEEDING FINISHED.");
        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedData();
