import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users, TrendingUp, GraduationCap, LayoutDashboard, Search, Bell, Sparkles } from "lucide-react";
import { motion } from 'framer-motion';

function InstructorDashboard({ listOfCourses }) {
  function calculateTotalStudentsAndProfit() {
    const { totalStudents, totalProfit, studentList } = listOfCourses.reduce(
      (acc, course) => {
        const studentCount = course.students.length;
        acc.totalStudents += studentCount;
        acc.totalProfit += course.pricing * studentCount;

        course.students.forEach((student) => {
          acc.studentList.push({
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });

        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );

    return {
      totalProfit,
      totalStudents,
      studentList,
    };
  }

  const { totalProfit, totalStudents, studentList } = calculateTotalStudentsAndProfit();

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: totalStudents,
      color: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+12.5%",
      iconColor: "text-blue-500"
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `₹${totalProfit.toLocaleString()}`,
      color: "bg-emerald-50",
      textColor: "text-emerald-600",
      trend: "+8.3%",
      iconColor: "text-emerald-500"
    },
    {
      icon: GraduationCap,
      label: "Active Courses",
      value: listOfCourses.length,
      color: "bg-orange-50",
      textColor: "text-orange-600",
      trend: "Steady",
      iconColor: "text-orange-500"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 bg-slate-50/30 p-1"
    >
      {/* Premium Light Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
         <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
               <Sparkles className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
               <h2 className="text-3xl font-black text-slate-900 tracking-tight font-outfit">Instructor Command</h2>
               <p className="text-slate-500 font-medium text-sm">Welcome back! Here's your performance snapshot.</p>
            </div>
         </div>
         <div className="flex items-center space-x-3">
            <div className="relative group">
               <div className="p-3 bg-white hover:bg-slate-50 rounded-2xl shadow-sm border border-slate-200 transition-colors cursor-pointer">
                  <Bell className="h-5 w-5 text-slate-400 group-hover:text-indigo-500" />
                  <span className="absolute top-0 right-0 h-3 w-3 bg-rose-500 border-2 border-white rounded-full"></span>
               </div>
            </div>
            <div className="flex bg-white items-center p-1 rounded-2xl border border-slate-200 shadow-sm">
               <div className="px-4 py-1.5 flex items-center space-x-2 border-r border-slate-100">
                  <Search className="h-4 w-4 text-slate-300" />
                  <input placeholder="Search metrics..." className="bg-transparent border-none text-[10px] font-bold outline-none w-24 text-slate-600 uppercase tracking-widest" />
               </div>
               <button className="px-4 py-1.5 text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800 transition-colors tracking-widest">Reports</button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {config.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white ring-1 ring-slate-200/60 overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </CardTitle>
                <div className={`p-2 rounded-xl ${item.color} shadow-inner`}>
                  <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-4xl font-black font-outfit text-slate-900 tracking-tighter">{item.value}</div>
                <div className="flex items-center mt-3">
                   <div className="flex items-center bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 mr-2">
                      <TrendingUp className="h-2.5 w-2.5 text-emerald-500 mr-1" />
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">{item.trend}</span>
                   </div>
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Growth Factor</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-200/60 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-200 py-8 px-8">
          <div className="flex justify-between items-center">
             <div>
                <CardTitle className="text-xl font-black flex items-center text-slate-900">
                   <Users className="mr-3 h-6 w-6 text-indigo-500" />
                   Strategic Enrollment Roster
                </CardTitle>
                <CardDescription className="text-slate-500 font-medium mt-1">Cross-referencing student identity with course synthesis</CardDescription>
             </div>
             <LayoutDashboard className="h-6 w-6 text-slate-200" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader className="bg-slate-50/80">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-5 pl-8">Course Module</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-5">Active Student</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-5 pr-8 text-right">Digital Identity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentList.map((studentItem, index) => (
                  <TableRow key={index} className="group hover:bg-indigo-50/30 transition-all border-slate-100">
                    <TableCell className="py-5 pl-8 font-bold text-slate-700">
                      {studentItem.courseTitle}
                    </TableCell>
                    <TableCell className="py-5">
                       <span className="bg-white text-slate-800 px-4 py-1.5 rounded-xl text-[10px] font-black border border-slate-200 uppercase shadow-sm group-hover:border-indigo-200 transition-colors">
                          {studentItem.studentName}
                       </span>
                    </TableCell>
                    <TableCell className="py-5 pr-8 text-right font-mono text-[11px] text-slate-400 font-bold group-hover:text-indigo-400 transition-colors">
                      {studentItem.studentEmail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {studentList.length === 0 && (
           <div className="py-32 text-center bg-white">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Users className="h-8 w-8 text-slate-200" />
              </div>
              <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em] font-outfit">Zero Students Synced</p>
           </div>
        )}
        <CardFooter className="bg-slate-50/50 py-4 px-8 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <span>Showing Sync Pulse: {new Date().toLocaleTimeString()}</span>
           <span className="text-indigo-500 font-black cursor-pointer hover:underline">Download Master CSV</span>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default InstructorDashboard;