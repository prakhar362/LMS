import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit, Plus, BookText, Users, DollarSign, Search, Filter } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50">
         <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 border border-slate-100 shadow-sm">
               <BookText className="h-6 w-6" />
            </div>
            <div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Manifested Modules</h2>
               <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">Global Catalog Control</p>
            </div>
         </div>
         <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl space-x-3">
               <Search className="h-4 w-4 text-slate-300" />
               <input placeholder="Search catalog..." className="bg-transparent border-none text-[10px] font-bold outline-none text-slate-600 uppercase tracking-widest w-32" />
            </div>
            <Button
              onClick={() => {
                setCurrentEditedCourseId(null);
                setCourseLandingFormData(courseLandingInitialFormData);
                setCourseCurriculumFormData(courseCurriculumInitialFormData);
                navigate("/instructor/create-new-course");
              }}
              className="bg-slate-600 hover:bg-slate-700 text-white font-black px-6 h-12 rounded-2xl shadow-xl shadow-slate-100 transition-all hover:scale-[1.02] active:scale-95 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Manifest New Course</span>
            </Button>
         </div>
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-200 py-6 px-8 flex flex-row items-center justify-between">
           <div>
              <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Active Course Ledger</CardTitle>
              <CardDescription className="text-slate-500 font-medium">Monitoring module performance & integrity</CardDescription>
           </div>
           <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase text-slate-400">
                <Filter className="h-3 w-3 mr-2" /> Sort Velocity
              </Button>
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto overflow-y-hidden">
            <Table className="w-full">
              <TableHeader className="bg-slate-50/30">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-6 pl-10">Module Identity</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-6">Engagement</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-6">Capital Flow</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-6 text-center">Status Check</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-6 pr-10 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfCourses && listOfCourses.length > 0
                  ? listOfCourses.map((course, i) => (
                    <TableRow key={course._id} className="group border-slate-50 hover:bg-slate-50/50 transition-all">
                      <TableCell className="py-6 pl-10">
                         <div className="flex flex-col">
                            <span className="font-black text-slate-900 tracking-tight leading-none mb-1 group-hover:text-slate-600 transition-colors uppercase">{course?.title}</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">#{course._id.slice(-8)}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6 font-bold text-slate-600">
                         <div className="flex items-center space-x-2">
                            <Users className="h-3 w-3 text-slate-300" />
                            <span className="text-xs uppercase tracking-tighter">{course?.students?.length || 0} Students</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6">
                         <div className="flex items-center space-x-2 font-black text-slate-900">
                            <DollarSign className="h-3 w-3 text-emerald-500" />
                            <span className="text-xs">₹{(course?.students?.length * course?.pricing).toLocaleString()}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6 text-center">
                         <div className="flex justify-center">
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-black border border-emerald-100 uppercase tracking-tighter">Verified Live</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-6 pr-10 text-right">
                         <div className="flex items-center justify-end space-x-2">
                            <Button
                              onClick={() => {
                                navigate(`/instructor/edit-course/${course?._id}`);
                              }}
                              variant="ghost"
                              className="h-9 w-9 p-0 rounded-xl hover:bg-slate-50 hover:text-slate-600 flex items-center justify-center transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="h-9 w-9 p-0 rounded-xl hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-colors"
                            >
                              <Delete className="h-4 w-4" />
                            </Button>
                         </div>
                      </TableCell>
                    </TableRow>
                  ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {listOfCourses && listOfCourses.length === 0 && (
           <div className="py-24 text-center bg-white flex flex-col items-center">
              <div className="h-16 w-16 bg-slate-50 border border-dashed border-slate-200 rounded-full flex items-center justify-center mb-6">
                 <BookText className="h-8 w-8 text-slate-100" />
              </div>
              <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em]">Module Inventory Empty</p>
           </div>
        )}
      </Card>
    </motion.div>
  );
}

export default InstructorCourses;