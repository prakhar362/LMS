import { courseCategories } from "@/config";
import banner from "../../../assets/banner-image.jpeg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { Lightbulb, TrendingUp } from "lucide-react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
  logCourseDemandService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courseRequest, setCourseRequest] = useState({ topic: "", description: "", category: "web-development" });

  async function handleCourseRequest() {
    if (!courseRequest.topic || !courseRequest.description) return alert("Please fill in first!");
    const response = await logCourseDemandService({
       topic: courseRequest.topic,
       description: courseRequest.description,
       category: courseRequest.category,
       userId: auth?.user?._id,
       userName: auth?.user?.userName
    });
    if (response?.success) {
       alert("Demand Logged! Our instructors will see this.");
       setCourseRequest({ topic: "", description: "", category: "web-development" });
    }
  }



  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning thet gets you  Forward</h1>
          <p className="text-xl">
            Skills for your present and your future. Get Started with US
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem?._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer bg-white"
              >
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">
                    ₹{courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>

      {/* --- NEW: SCM Pull Model - Market Demand Request --- */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12">
            <Lightbulb className="h-64 w-64 text-yellow-500" />
         </div>
         <div className="max-w-4xl mx-auto text-center relative z-10 font-outfit">
            <h2 className="text-3xl font-black mb-4 tracking-tight">Can't find the course you're looking for? 💡</h2>
            <p className="text-slate-400 text-lg mb-8">Tell our instructors what you want to learn, and we'll prioritize it for you!</p>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl transition-all hover:bg-white/15">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Proposed Topic</label>
                     <input 
                       value={courseRequest.topic}
                       onChange={(e) => setCourseRequest({ ...courseRequest, topic: e.target.value })}
                       placeholder="e.g. Advanced AI Agents for eCommerce" 
                       className="w-full bg-slate-800 border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Category</label>
                     <select 
                       value={courseRequest.category}
                       onChange={(e) => setCourseRequest({ ...courseRequest, category: e.target.value })}
                       className="w-full bg-slate-800 border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                     >
                        {courseCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                     </select>
                  </div>
               </div>
               <div className="mt-6 space-y-2 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Why do you want this?</label>
                  <textarea 
                    value={courseRequest.description}
                    onChange={(e) => setCourseRequest({ ...courseRequest, description: e.target.value })}
                    placeholder="Describe what skills you hope to gain..." 
                    className="w-full bg-slate-800 border-slate-700 rounded-xl p-4 text-white min-h-[100px] focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  />
               </div>
               <Button 
                onClick={handleCourseRequest}
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all text-white font-black h-14 rounded-xl text-lg shadow-xl shadow-purple-900/40"
               >
                  Log Market Request <TrendingUp className="ml-2 h-5 w-5" />
               </Button>
               <p className="mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest italic animate-pulse">
                 This request will be pushed into the SCM Pull Marketplace for instructors.
               </p>
            </div>
         </div>
      </section>

      <section className="py-12 px-4 lg:px-8 bg-purple-50">
        <h2 className="text-2xl font-bold mb-2 text-purple-900 font-outfit">Recommended for You 🎯</h2>
        <p className="text-sm text-purple-700 mb-6">CRM-Driven personalization based on your learn journey</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.slice(0, 4).map((courseItem) => (
              <div
                key={`rec-${courseItem._id}`}
                onClick={() => navigate(`/course/details/${courseItem._id}`)}
                className="bg-white border-2 border-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer scale-100 hover:scale-[1.02]"
              >
                <div className="p-4">
                   <div className="bg-purple-100 text-purple-700 text-[10px] font-bold uppercase w-fit px-2 py-0.5 rounded-full mb-3 flex items-center">
                     <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5 animate-pulse"></span>
                     Personalized
                   </div>
                   <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem]">{courseItem?.title}</h3>
                   <div className="mt-4 pt-4 border-t border-gray-100">
                     <p className="text-xs text-purple-600 font-medium">Continue growing in {courseItem?.category}</p>
                   </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed">
                Log in to see personalized recommendations
             </div>
          )}
        </div>
      </section>




    </div>
  );
}

export default StudentHomePage;