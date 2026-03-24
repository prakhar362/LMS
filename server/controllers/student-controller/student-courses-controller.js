const StudentCourses = require("../../models/StudentCourses");
const Progress = require("../../models/CourseProgress");

const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    if (!studentBoughtCourses || !studentBoughtCourses.courses) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const coursesWithProgress = await Promise.all(
      studentBoughtCourses.courses.map(async (course) => {
        const progress = await Progress.findOne({
          userId: studentId,
          courseId: course.courseId,
        });

        return {
          ...course._doc,
          completed: progress ? progress.completed : false,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: coursesWithProgress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { getCoursesByStudentId };