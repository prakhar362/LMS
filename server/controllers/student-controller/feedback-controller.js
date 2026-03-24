const CourseFeedback = require("../../models/CourseFeedback");

const submitCourseFeedback = async (req, res) => {
  try {
    const { courseId, studentId, studentName, instructorId, rating, message } =
      req.body;

    const newFeedback = new CourseFeedback({
      courseId,
      studentId,
      studentName,
      instructorId,
      rating,
      message,
    });

    await newFeedback.save();

    res.status(201).json({
      success: true,
      data: newFeedback,
      message: "Feedback submitted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getInstructorFeedback = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const feedbackList = await CourseFeedback.find({ instructorId }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      data: feedbackList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { submitCourseFeedback, getInstructorFeedback };
