const systemEvent = require("./event-emitter");
const CustomerProfile = require("../models/crm/CustomerProfile");
const InteractionLog = require("../models/crm/InteractionLog");
const SupplyLog = require("../models/scm/SupplyLog");
const FinancialRecord = require("../models/erp/FinancialRecord");
const InstructorData = require("../models/erp/InstructorData");
const Course = require("../models/Course");

// --- CRM Listener ---
systemEvent.on("orderConfirmed", async (order) => {
  console.log("CRM: Order confirmed, updating customer profile for", order.userId);
  
  // Track interaction
  await InteractionLog.create({
    userId: order.userId,
    action: "purchase",
    courseId: order.courseId,
    timestamp: new Date()
  });

  // Update/Create customer profile
  let profile = await CustomerProfile.findOne({ userId: order.userId });
  if (profile) {
    profile.totalSpent += parseFloat(order.coursePricing);
    profile.lastActive = new Date();
    // Re-segment logic
    if (profile.totalSpent > 1000) profile.segment = "high_spender";
    await profile.save();
  } else {
    await CustomerProfile.create({
      userId: order.userId,
      userName: order.userName,
      userEmail: order.userEmail,
      totalSpent: parseFloat(order.coursePricing),
      lastActive: new Date(),
      segment: "active"
    });
  }
});

// --- SCM (Pull-based) Listener ---
systemEvent.on("orderConfirmed", async (order) => {
  console.log("SCM: Triggering Pull-based supply action for", order.courseId);
  
  // Dynamically allocate resource
  await SupplyLog.create({
    resourceType: "bandwidth",
    courseId: order.courseId,
    allocatedAmount: 1, // unit increment
    allocationType: "dynamic",
    timestamp: new Date()
  });

  // ERP HR: Notify instructor (simulate by updating instructor workload)
  let instructor = await InstructorData.findOne({ instructorId: order.instructorId });
  if (instructor) {
    instructor.enrollmentsCount += 1;
    instructor.totalWorkloadHours += 0.5; // Assume 30 mins workload per student enrollment support
    await instructor.save();
  } else {
    await InstructorData.create({
       instructorId: order.instructorId,
       name: order.instructorName,
       assignedCourses: [order.courseId],
       enrollmentsCount: 1,
       totalWorkloadHours: 0.5
    });
  }
});

// --- ERP (Finance) Listener ---
systemEvent.on("orderConfirmed", async (order) => {
  console.log("ERP: Generating finance entry for", order.paymentId);
  
  await FinancialRecord.create({
    orderId: order._id,
    amount: parseFloat(order.coursePricing),
    currency: "INR",
    paymentMethod: "razorpay",
    transactionType: "revenue",
    status: "captured",
    date: new Date()
  });
});

module.exports = systemEvent;
