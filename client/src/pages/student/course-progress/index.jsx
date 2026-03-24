import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
  submitCourseFeedbackService,
} from "@/services";
import { Check, ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth, refreshAuthUser } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isCurrentVideoFinished, setIsCurrentVideoFinished] = useState(false);
  const { id } = useParams();

  async function handleNextVideo() {
    const { curriculum } = studentCurrentCourseProgress?.courseDetails;
    const currentLectureIndex = curriculum.findIndex(
      (item) => item._id === currentLecture?._id
    );

    if (currentLectureIndex !== -1 && currentLectureIndex < curriculum.length - 1) {
      setCurrentLecture(curriculum[currentLectureIndex + 1]);
      setIsCurrentVideoFinished(false);
    }
  }

  async function handleFeedbackSubmit() {
    const feedbackData = {
      courseId: id,
      studentId: auth?.user?._id,
      studentName: auth?.user?.userName,
      instructorId: studentCurrentCourseProgress?.courseDetails?.instructorId,
      rating: rating,
      message: feedbackMessage,
    };

    const response = await submitCourseFeedbackService(feedbackData);
    if (response?.success) {
      setIsFeedbackSubmitted(true);
    }
  }

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
            lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
        refreshAuthUser();

        const { curriculum } = studentCurrentCourseProgress?.courseDetails;
        const currentLectureIndex = curriculum.findIndex(
          (item) => item._id === currentLecture?._id
        );

        if (currentLectureIndex !== -1 && currentLectureIndex < curriculum.length - 1) {
          setIsCurrentVideoFinished(true);
        }
      }
    }
  }

  useEffect(() => {
    setIsCurrentVideoFinished(false);
  }, [currentLecture?._id]);

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  console.log(currentLecture, "currentLecture");

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`relative flex-1 ${isSideBarOpen ? "mr-[400px]" : ""
            } transition-all duration-300`}
        >
          <div className="relative group">
            <VideoPlayer
              width="100%"
              height="500px"
              url={currentLecture?.videoUrl}
              onProgressUpdate={setCurrentLecture}
              progressData={currentLecture}
            />
            {isCurrentVideoFinished && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-in fade-in zoom-in duration-300">
                 <div className="bg-green-500/10 border-2 border-green-500/30 p-6 rounded-3xl text-center mb-6">
                   <div className="bg-green-500 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                     <Check className="h-10 w-10 text-white" strokeWidth={3} />
                   </div>
                   <h3 className="text-xl font-black text-white">Topic Completed!</h3>
                   <p className="text-green-200 text-sm font-bold">+10 Credits Earned</p>
                 </div>
                 <Button 
                   onClick={handleNextVideo}
                   className="bg-white hover:bg-gray-100 text-[#1c1d1f] flex items-center gap-3 px-8 py-7 rounded-2xl text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20"
                 >
                   Start Next Topic <ChevronRight className="h-6 w-6" strokeWidth={3} />
                 </Button>
              </div>
            )}
          </div>
          <div className="p-6 bg-[#1c1d1f] flex justify-between items-center border-t border-gray-800">
            <div>
              <h2 className="text-2xl font-bold mb-1">{currentLecture?.title}</h2>
              <p className="text-gray-400 text-sm italic">Lecture { (studentCurrentCourseProgress?.courseDetails?.curriculum.findIndex(it => it._id === currentLecture?._id) || 0) + 1 } of { studentCurrentCourseProgress?.courseDetails?.curriculum.length }</p>
            </div>
            {isCurrentVideoFinished && (
              <Button 
                onClick={handleNextVideo} 
                className="bg-indigo-600 hover:bg-indigo-700 font-bold"
              >
                Next Video <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
             )}
          </div>
        </div>
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${isSideBarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className=" text-white rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className=" text-white rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => (
                      <div
                        className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                        key={item._id}
                      >
                        {studentCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4 " />
                        )}
                        <span>{item?.title}</span>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent showOverlay={false} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3 pt-4">
              <Label className="text-lg font-bold">You have completed the course!</Label>

              {!isFeedbackSubmitted ? (
                <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                  <Label className="text-gray-600">How would you rate this course?</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer transition-colors ${star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                          }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your thoughts with the instructor..."
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    className="h-24 bg-white"
                  />
                  <Button
                    onClick={handleFeedbackSubmit}
                    disabled={rating === 0}
                    className="bg-indigo-600 hover:bg-indigo-700 w-full"
                  >
                    Submit Feedback
                  </Button>
                </div>
              ) : (
                <div className="bg-emerald-50 p-4 rounded-lg text-emerald-800 text-center font-bold animate-in zoom-in duration-300">
                  Thank you for your valuable feedback!
                </div>
              )}

              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full" onClick={() => navigate("/student-courses")}>
                  Go to My Courses
                </Button>
                <Button variant="outline" className="w-full" onClick={handleRewatchCourse}>
                  Rewatch Course
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;