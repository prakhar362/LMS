import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import SCMDashboard from "@/components/instructor-view/scm";
import CRMDashboard from "@/components/instructor-view/crm";
import ERPDashboard from "@/components/instructor-view/erp";
import { BarChart, Book, LogOut, Truck, Users, LayoutGrid, LayoutDashboard, Settings, Sparkles, GraduationCap } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { motion } from 'framer-motion';

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Performance",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "My Modules",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Truck,
      label: "SCM Pulse",
      value: "scm",
      component: <SCMDashboard />,
    },
    {
      icon: Users,
      label: "CRM Lifecycle",
      value: "crm",
      component: <CRMDashboard />,
    },
    {
      icon: LayoutGrid,
      label: "ERP Hub",
      value: "erp",
      component: <ERPDashboard />,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="flex h-full min-h-screen bg-slate-50">
      <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-8 border-b border-slate-50 flex items-center space-x-3">
          <div className="h-10 w-10 bg-slate-950 rounded-2xl flex items-center justify-center shadow-slate-200 shadow-xl">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tight uppercase">CourseConvo</span>
        </div>

        <div className="flex-1 p-6 space-y-8 mt-4 overflow-y-auto">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Strategic Core</p>
            <nav className="space-y-1">
              {menuItems.map((menuItem) => (
                <button
                  key={menuItem.value}
                  onClick={() => setActiveTab(menuItem.value)}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-3xl text-sm font-black transition-all group ${activeTab === menuItem.value
                      ? "bg-slate-950 text-white shadow-xl shadow-slate-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <menuItem.icon className={`h-5 w-5 transition-colors ${activeTab === menuItem.value ? "text-white" : "text-slate-300 group-hover:text-slate-500"
                    }`} />
                  <span className="tracking-tight">{menuItem.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">System Utilities</p>
            <nav className="space-y-1">
              <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-3xl text-sm font-black text-slate-500 hover:bg-slate-50 hover:text-slate-900 group transition-all">
                <Settings className="h-5 w-5 text-slate-300 group-hover:text-slate-500" />
                <span className="tracking-tight">Preference Logic</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-4 px-6 py-4 rounded-3xl text-sm font-black text-slate-500 hover:bg-slate-900 hover:text-white transition-all group"
              >
                <LogOut className="h-5 w-5 text-slate-300 group-hover:text-white" />
                <span className="tracking-tight">Terminate Session</span>
              </button>
            </nav>
          </div>
        </div>

        <div className="p-8 border-t border-slate-50">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>
              <span className="text-xs font-black text-slate-700 uppercase tracking-widest leading-none">AI Insight Engine</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed lowercase italic">
              Cross-layer synthesis ready for April-2026 forecast...
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-hidden flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Workspace: </span>
            <span className="text-[10px] font-black uppercase text-white bg-slate-950 px-3 py-1 rounded-full border border-slate-800">Strat-A-Module (Primary)</span>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
            A-OS
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto mb-20">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs value={activeTab}>
                {menuItems.map((menuItem) => (
                  <TabsContent key={menuItem.value} value={menuItem.value} className="mt-0 outline-none">
                    {menuItem.component}
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;