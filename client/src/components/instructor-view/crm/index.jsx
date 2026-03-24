import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  Activity, 
  Target, 
  Rocket, 
  RefreshCcw, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  Zap,
  Users2,
  PieChart,
  ArrowRight,
  Target as Target2,
  Rocket as Rocket2,
  Heart as Heart2
} from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { fetchCRMDashboardDataService, fetchInstructorFeedbackService } from "@/services";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

function CRMDashboard() {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchCRMDashboardDataService();
      if (response?.success) setData(response.data);
    }
    
    async function fetchFeedback() {
      const response = await fetchInstructorFeedbackService(auth?.user?._id);
      if (response?.success) setFeedbackList(response.data);
    }

    if (auth?.user?._id) {
      fetchData();
      fetchFeedback();
    }
  }, [auth]);

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
       <div className="h-10 w-10 border-4 border-slate-100 border-t-slate-600 rounded-full animate-spin"></div>
       <p className="mt-4 text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">Syncing Lifecycle Intelligence...</p>
    </div>
  );

  const lifecycleConfig = [
    {
      id: "acquisition",
      title: "Acquisition",
      icon: Target2,
      color: "bg-slate-950",
      lightColor: "bg-slate-50",
      textColor: "text-slate-900",
      description: "Synthesis & Conversion",
      focus: "CAC Optimization"
    },
    {
      id: "onboarding",
      title: "Onboarding",
      icon: Rocket2,
      color: "bg-slate-800",
      lightColor: "bg-slate-50",
      textColor: "text-slate-900",
      description: "First 30-Day Synthesis",
      focus: "Velocity Factor"
    },
    {
       id: "retention",
       title: "Retention",
       icon: RefreshCcw,
       color: "bg-slate-400",
       lightColor: "bg-slate-50",
       textColor: "text-slate-900",
       description: "Proactive Engagement",
       focus: "Churn Defense"
    },
    {
       id: "loyalty",
       title: "Loyalty",
       icon: Heart2,
       color: "bg-slate-200",
       lightColor: "bg-slate-50",
       textColor: "text-slate-900",
       description: "Brand Advocacy",
       focus: "CLV Maximization"
    }
  ];

  const COLORS = ['#020617', '#1e293b', '#475569', '#94a3b8', '#cbd5e1'];
  
  const pieData = data.segmentsCount.map((s, i) => ({
    name: s._id.replace('_', ' ').toUpperCase(),
    value: s.count
  }));

  return (
    <div className="space-y-8 p-1">
      {/* CRM Light Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8"
      >
        <div className="flex items-center space-x-4">
           <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
              <Users2 className="h-6 w-6 text-slate-500" />
           </div>
           <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lifecycle Center</h2>
              <p className="text-slate-500 font-medium text-sm italic">Strategic synthesis of the 4 CRM Interaction Methods</p>
           </div>
        </div>
        <div className="flex items-center space-x-3">
           <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 flex items-center space-x-4">
              <div className="text-right border-r border-slate-100 pr-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Core CLV</p>
                 <p className="text-xl font-black text-slate-900 mt-1">₹4,250</p>
              </div>
              <div className="flex items-center space-x-2">
                 <div className="p-2 bg-emerald-50 rounded-xl">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-emerald-600 leading-none">Healthy</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Status Sync</p>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* 4-Method Lifecycle Grid - Pure Light */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {lifecycleConfig.map((stage, i) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white ring-1 ring-slate-100 hover:ring-slate-400 hover:-translate-y-1 transition-all duration-300 group">
              <div className={`h-1.5 w-full ${stage.color}`}></div>
              <CardHeader className="pb-2">
                 <div className={`p-3 w-fit rounded-2xl ${stage.lightColor} group-hover:scale-110 transition-transform mb-4`}>
                   <stage.icon className={`h-6 w-6 ${stage.textColor}`} />
                 </div>
                 <CardTitle className="text-xl font-black text-slate-800 tracking-tight">{stage.title}</CardTitle>
                 <CardDescription className="text-xs font-bold leading-tight line-clamp-1">{stage.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                 <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-slate-900">
                       {data.lifecycleStats?.find(s => s._id === stage.id)?.count || 0}
                    </span>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Units</span>
                 </div>
                 <div className="mt-5 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Performance Focus</span>
                    <span className={stage.textColor}>{stage.focus}</span>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INTERACTION STREAM - Synthetic Light Feed */}
        <Card className="lg:col-span-2 border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-200 py-8 px-8 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black text-slate-800 flex items-center">
                <Activity className="mr-3 h-6 w-6 text-slate-950" />
                Strategic Signal Stream
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">Monitoring real-time behavioral vectors across lifecycle stages</CardDescription>
            </div>
            <div className="flex bg-white rounded-xl border border-slate-200 p-1">
               <Button variant="ghost" className="h-7 text-[10px] font-black uppercase tracking-widest px-4 text-slate-600 hover:bg-slate-50">Filter Signals</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-5 pl-8">Signal Interaction</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-5">Lifecycle Category</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-5 text-center">Stability Check</TableHead>
                  <TableHead className="text-[11px] font-black uppercase text-slate-400 tracking-widest py-5 pr-8 text-right">System Sync</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentInteractions.map((log, i) => (
                  <TableRow key={i} className="group border-slate-50 hover:bg-slate-50/30 transition-all cursor-default">
                    <TableCell className="pl-8 py-5">
                       <div className="flex items-center space-x-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                            log.action === 'purchase' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                          }`}>
                             {log.action === 'purchase' ? <Zap className="h-5 w-5 fill-emerald-500" /> : <RefreshCcw className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 capitalize leading-none tracking-tight">{log.action.replace('_', ' ')}</p>
                            <p className="text-[10px] text-slate-400 font-mono font-bold mt-1 uppercase">USR-#{log.userId.slice(-6)}</p>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-5 capitalize font-bold text-slate-600 text-[11px] tracking-wide mt-2 block">
                       <span className="px-2 py-0.5 rounded-full border border-slate-100 bg-white">Onboarding Stage</span>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                       <div className="flex justify-center">
                          <ShieldCheck className="h-4 w-4 text-emerald-500" />
                       </div>
                    </TableCell>
                    <TableCell className="py-5 pr-8 text-right text-[11px] font-black font-mono text-slate-400 group-hover:text-black transition-colors">
                       {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* FEEDBACK FEED - Synthetic Sentiment */}
        <Card className="lg:col-span-2 border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-100 overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-200 py-8 px-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-slate-800 flex items-center">
                  <Heart className="mr-3 h-6 w-6 text-rose-500 fill-rose-500" />
                  Course Completion Sentiment
                </CardTitle>
                <CardDescription className="text-slate-500 font-medium">Post-completion feedback and qualitative ratings</CardDescription>
              </div>
              {feedbackList.length > 0 && (
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm transition-all hover:scale-105">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s <= (feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-slate-800 mt-0.5">{(feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length).toFixed(1)} AVG</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[500px] overflow-y-auto">
            {feedbackList.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {feedbackList.map((feedback, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={index} 
                    className="p-8 hover:bg-slate-50/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100">
                          <span className="text-xs font-black text-indigo-700">{feedback.studentName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-black text-slate-900 tracking-tight leading-none">{feedback.studentName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Course Complete</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-4 w-4 ${s <= feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-100 pl-4 py-1">"{feedback.message}"</p>
                    <div className="mt-4 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <span className="group-hover:text-slate-950 transition-colors">{new Date(feedback.date).toLocaleDateString()}</span>
                       <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg">Verified Signal</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-20 text-center">
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Activity className="h-8 w-8 text-slate-200" />
                </div>
                <h4 className="text-slate-900 font-black tracking-tight mb-2">No Qualitative Feedback Yet</h4>
                <p className="text-slate-400 text-xs font-medium max-w-[240px] mx-auto">Student sentiment analysis will appear here as users complete course modules.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* COMPREHENSION PIE - Pure Light */}
        <div className="space-y-8 h-full">
           <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-100 h-auto overflow-hidden">
             <CardHeader className="bg-slate-50/50 pb-0 border-b border-slate-100 mb-4 px-8 py-6">
               <CardTitle className="text-lg font-black flex items-center text-slate-800 uppercase tracking-widest">
                 <PieChart className="mr-3 h-5 w-5 text-slate-950" />
                 Spend Tier Matrix
               </CardTitle>
               <CardDescription className="text-slate-500 font-medium">Synthesis of user capital value distribution</CardDescription>
             </CardHeader>
             <CardContent className="h-[280px] p-0 flex flex-col justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
             </CardContent>
             <CardFooter className="flex-col items-start pt-0 space-y-3 pb-8 px-8">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between w-full border-b border-slate-50 pb-2">
                     <div className="flex items-center space-x-3">
                        <div className="h-3 w-3 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                        <span className="text-[11px] font-black text-slate-500 tracking-widest">{item.name}</span>
                     </div>
                     <span className="text-[11px] font-black text-slate-900 border border-slate-100 px-2 rounded-lg bg-slate-50">{item.value} Units</span>
                  </div>
                ))}
             </CardFooter>
           </Card>

           <Card className="border-none shadow-2xl shadow-slate-100 bg-white ring-1 ring-slate-200 overflow-hidden group">
              <CardContent className="p-8 relative">
                 <Sparkles className="absolute top-6 right-6 h-8 w-8 text-slate-200 opacity-50 animate-pulse" />
                 <h4 className="text-2xl font-black mb-3 text-slate-950 tracking-tighter">Behavioral Auto-Pilot</h4>
                 <p className="text-xs text-slate-900/60 leading-relaxed mb-8 font-bold italic">
                    "4 Students are currently stalled in Lesson 2 (Onboarding stage). This indicates potential churn-drift."
                 </p>
                 <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white font-black rounded-2xl h-14 shadow-2xl shadow-slate-300 transition-all hover:scale-[1.02] active:scale-95 group-hover:rotate-1">
                    Execute Recall Synthesis <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

export default CRMDashboard;
