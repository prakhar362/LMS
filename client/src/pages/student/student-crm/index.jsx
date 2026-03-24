import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Coins, GraduationCap, MessageSquareQuote, Star, Award, Calendar, UserCheck, Users, Mail, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchStudentBoughtCoursesService } from "@/services";

function StudentCRMPage() {
  const { auth } = useContext(AuthContext);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [feedback, setFeedback] = useState({
    subject: "",
    message: "",
  });

  async function fetchBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setBoughtCourses(response?.data);
      if (response?.data?.length > 0) {
        setSelectedInstructor(response?.data[0].instructorName);
      }
    }
  }

  useEffect(() => {
    if (auth?.user?._id) fetchBoughtCourses();
  }, [auth]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Mentorship request for ${selectedInstructor} sent successfully! They will contact you via ${auth?.user?.userEmail} soon.`);
    setFeedback({ subject: "", message: "" });
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900">Student CRM & Rewards</h1>
          <p className="text-gray-500 mt-1">Manage your learning journey, credits, and mentorship</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg border-2 border-amber-300">
          <Coins className="w-8 h-8 drop-shadow-md" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Available Credits</p>
            <p className="text-2xl font-black">{auth?.user?.credits || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-xl mb-4">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
              <TabsTrigger value="rewards" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Rewards</TabsTrigger>
              <TabsTrigger value="mentorship" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">1:1 Mentorship</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-white border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
                    <Star className="w-5 h-5 text-amber-500 group-hover:scale-125 transition-transform" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{auth?.user?.credits || 0}</div>
                    <p className="text-xs text-muted-foreground mt-1">+10 per topic completion</p>
                  </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
                    <Calendar className="w-5 h-5 text-indigo-500 group-hover:scale-125 transition-transform" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">
                      {new Date(auth?.user?.lastLoginDate || Date.now()).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Log in daily to stay active!</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  Milestones
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Starter Learner', threshold: 0, status: 'Achieved' },
                    { name: 'Rising Star', threshold: 100, status: (auth?.user?.credits >= 100 ? 'Achieved' : 'Locked') },
                    { name: 'Course Master', threshold: 500, status: (auth?.user?.credits >= 500 ? 'Achieved' : 'Locked') },
                    { name: 'Elite Scholar', threshold: 1000, status: (auth?.user?.credits >= 1000 ? 'Achieved' : 'Locked') }
                  ].map((milestone, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-xl border-2 ${milestone.status === 'Achieved' ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${milestone.status === 'Achieved' ? 'bg-emerald-200' : 'bg-gray-200'}`}>
                          {milestone.status === 'Achieved' ? <UserCheck className="w-5 h-5 text-emerald-700" /> : <Lock className="w-5 h-5 text-gray-500" />}
                        </div>
                        <div>
                          <p className="font-bold">{milestone.name}</p>
                          <p className="text-xs text-gray-500">Requires {milestone.threshold} credits</p>
                        </div>
                      </div>
                      <span className={`text-xs font-black uppercase px-2 py-1 rounded ${milestone.status === 'Achieved' ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>{milestone.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards">
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
                <CardHeader>
                  <CardTitle>Redeem Shop</CardTitle>
                  <CardDescription>Use your credits to get massive discounts on new courses!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center p-8 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-300">
                    <Coins className="w-16 h-16 text-amber-500 mb-4 animate-bounce" />
                    <h4 className="text-2xl font-black text-amber-900">1 Credit = ₹1 Discount</h4>
                    <p className="text-amber-700 text-center mt-2 max-w-md">Applied automatically during checkout when you choose the 'Use Credits' option.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <p className="font-bold">Next Course Discount</p>
                      <p className="text-sm text-gray-500">Apply up to 100% of price using credits</p>
                      <Button className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700" onClick={() => window.location.href='/courses'}>Browse Courses</Button>
                    </div>
                    <div className="p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <p className="font-bold">Premium Certifications</p>
                      <p className="text-sm text-gray-500">Use credits to unlock special exams</p>
                      <Button variant="outline" className="w-full mt-3" disabled>Coming Soon</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mentorship">
              <Card className="border-none shadow-md overflow-hidden">
                <div className="h-2 bg-indigo-600" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquareQuote className="w-6 h-6 text-indigo-600" />
                    1:1 Professional Mentorship
                  </CardTitle>
                  <CardDescription>Get personalized guidance from your course instructors (Free for premium course buyers)</CardDescription>
                </CardHeader>
                <CardContent>
                  {boughtCourses.length > 0 ? (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Users className="w-4 h-4 text-indigo-500" />
                          Choose Your Instructor
                        </label>
                        <select 
                          className="w-full p-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          value={selectedInstructor}
                          onChange={(e) => setSelectedInstructor(e.target.value)}
                          required
                        >
                          {boughtCourses.map((course) => (
                            <option key={course.courseId} value={course.instructorName}>
                              {course.instructorName} ({course.title})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Subject / Area of Interest</label>
                        <Input 
                          placeholder="e.g., Career Guidance in Web Development" 
                          value={feedback.subject}
                          onChange={(e) => setFeedback({...feedback, subject: e.target.value})}
                          required
                          className="p-6 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Your Message / Questions</label>
                        <Textarea 
                          placeholder={`Specify what you'd like to ask ${selectedInstructor}...`} 
                          rows={4}
                          value={feedback.message}
                          onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg hover:shadow-indigo-200 transition-all rounded-xl">
                        Send Mentorship Request
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-900">No Mentors Available Yet</h4>
                      <p className="text-gray-500 mt-2 max-w-sm mx-auto">Purchase your first course to unlock 1:1 mentorship sessions with top industry instructors!</p>
                      <Button className="mt-6 bg-indigo-600" onClick={() => window.location.href='/courses'}>Explore Courses</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-400" />
                Learner Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-4xl font-bold mb-4 ring-4 ring-indigo-400/50 ring-offset-4 ring-offset-gray-900">
                  {auth?.user?.userName?.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold">{auth?.user?.userName}</h3>
                <p className="text-indigo-300">{auth?.user?.userEmail}</p>
                <span className="mt-4 px-4 py-1 bg-indigo-500/30 border border-indigo-400/50 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-200">
                  {auth?.user?.role}
                </span>
              </div>
              
              <div className="pt-4 border-t border-indigo-700/50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-indigo-300">Level</span>
                  <span className="font-bold">Pro Learner</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[10px] text-center text-indigo-400">Next rank at 1000 credits</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 bg-indigo-50/50">
            <CardHeader>
              <CardTitle className="text-indigo-900 text-lg">Did You Know?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-indigo-800 space-y-3">
              <p>💡 <b>Pro-Tip:</b> Completing a full course awards a bonus 100 credits!</p>
              <p>🚀 Students with 500+ credits are 3x more likely to get placed.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentCRMPage;
