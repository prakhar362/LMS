const razorpay = require("../../helpers/razorpay");
const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");
const User = require("../../models/User");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
      appliedCredits,
    } = req.body;

    const finalAmount = coursePricing - (appliedCredits || 0);

    const newlyCreatedCourseOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod: "razorpay",
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing: finalAmount > 0 ? finalAmount : 0,
    });

    await newlyCreatedCourseOrder.save();

    const options = {
      amount: Math.round((finalAmount > 0 ? finalAmount : 0) * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: newlyCreatedCourseOrder._id.toString(),
    };

    // Store applied credits in the order to deduct later
    newlyCreatedCourseOrder.appliedCredits = appliedCredits || 0;
    await newlyCreatedCourseOrder.save();

    const paymentInfo = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      data: {
        razorpayOrderId: paymentInfo.id,
        orderId: newlyCreatedCourseOrder._id,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { paymentId, payerId, orderId, razorpay_signature } = req.body;

    // Verify the payment signature
    const body = payerId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    await order.save();

    //update out student course model
    const studentCourses = await StudentCourses.findOne({
      userId: order.userId,
    });

    if (studentCourses) {
      studentCourses.courses.push({
        courseId: order.courseId,
        title: order.courseTitle,
        instructorId: order.instructorId,
        instructorName: order.instructorName,
        dateOfPurchase: order.orderDate,
        courseImage: order.courseImage,
      });

      await studentCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [
          {
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
          },
        ],
      });

      await newStudentCourses.save();
    }

    //update the course schema students
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    // Deduct credits if used
    if (order.appliedCredits > 0) {
      const user = await User.findById(order.userId);
      if (user) {
        user.credits = Math.max(0, (user.credits || 0) - order.appliedCredits);
        await user.save();
      }
    }

    // --- NEW: Emit orderConfirmed event for SCM, CRM, and ERP ---
    const systemEvent = require("../../helpers/system-listeners");
    systemEvent.emit("orderConfirmed", order);


    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { createOrder, capturePaymentAndFinalizeOrder };