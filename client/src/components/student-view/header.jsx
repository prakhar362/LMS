import { GraduationCap, TvMinimalPlay, Coins, MessageSquareQuote } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { auth, resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <img src="https://cdn-icons-png.flaticon.com/512/8521/8521795.png" alt="" className="max-h-10 min-w-10" />
          <span className="font-extrabold ml-3 md:text-xl text-[14px]">
            CourseConvo
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>

          <div
            onClick={() => navigate("/student/crm")}
            className="flex cursor-pointer items-center gap-1 bg-amber-100 px-3 py-1 rounded-full border border-amber-200"
          >
            <Coins className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-amber-700">
              {auth?.user?.credits || 0}
            </span>
          </div>

          <div
            onClick={() => navigate("/student/crm")}
            className="hidden md:flex cursor-pointer items-center gap-2"
          >
            <MessageSquareQuote className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold text-indigo-700">1:1 Mentorship</span>
          </div>

          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;