import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
   DollarSign,
   Award,
   Briefcase,
   TrendingUp,
   PieChart,
   Layers,
   Monitor,
   CreditCard,
   ChevronRight,
   ShieldCheck,
   Building2,
   Calendar,
   Zap,
   ArrowRight,
   CheckCircle2,
   Lock,
   Star,
   Rocket,
   Search,
   LayoutGrid
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchERPDashboardDataService } from "@/services";
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   BarChart,
   Bar,
   Cell,
   Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

function ERPDashboard() {
   const [data, setData] = useState(null);

   useEffect(() => {
      async function fetchData() {
         const response = await fetchERPDashboardDataService();
         if (response?.success) setData(response.data);
      }
      fetchData();
   }, []);

   if (!data) return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
         <div className="h-12 w-12 border-4 border-slate-50 border-t-slate-900 rounded-full animate-spin"></div>
         <p className="mt-10 text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">Initializing Core Resources...</p>
      </div>
   );

   const revenueData = [
      { name: 'Week 1', revenue: 4200 },
      { name: 'Week 2', revenue: 7800 },
      { name: 'Week 3', revenue: Math.round(data.totalRevenue * 0.4) || 5500 },
      { name: 'Week 4', revenue: Math.round(data.totalRevenue * 0.6) || 8900 },
   ];

   return (
      <div className="space-y-10 p-1">
         {/* ERP Strategic Light Header */}
         <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-12"
         >
            <div className="flex items-center space-x-6">
               <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-slate-100 ring-1 ring-slate-100 group cursor-pointer hover:rotate-12 transition-transform">
                  <Building2 className="h-8 w-8 text-slate-800" />
               </div>
               <div>
                  <h2 className="text-4xl font-black text-slate-950 tracking-tight">Enterprise ERP Core</h2>
                  <p className="text-slate-500 font-medium flex items-center text-sm shadow-slate-100/50">
                     <Lock className="h-3 w-3 mr-2 text-slate-500" />
                     Federated Resource Layer (FRL) Synthesis Active
                  </p>
               </div>
            </div>
            <div className="flex bg-white items-center p-2 rounded-[22px] shadow-2xl shadow-slate-200/50 border border-slate-100 ring-4 ring-slate-50/50">
               <div className="px-6 py-2 flex items-center space-x-3 border-r border-slate-100">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Q1 - MARCH 2026</span>
               </div>
               <div className="px-6 py-2 flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-slate-500 animate-pulse shadow-md shadow-slate-500/50"></div>
                  <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest leading-none">Healthy Sync</span>
               </div>
            </div>
         </motion.div>

         {/* Tri-module Grid - Pure Light */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Module: Strategic Finance */}
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>
               <Card className="border-none shadow-2xl shadow-slate-300/40 bg-white ring-1 ring-slate-200 overflow-hidden group">
                  <CardHeader className="bg-slate-50/50 pb-2 border-b border-slate-50 mb-4 px-8 pt-8">
                     <CardTitle className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Capital Core (F1)</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-10">
                     <div className="pt-2 pb-6">
                        <div className="text-5xl font-black text-slate-950 tracking-tighter">₹{data.totalRevenue.toLocaleString()}</div>
                        <p className="text-xs font-bold text-slate-400 mt-2 flex items-center italic">
                           <TrendingUp className="h-3 w-3 mr-1 text-slate-500" /> Growth Amplitude: 18.5%
                        </p>
                     </div>
                     <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                        <div className="bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                           <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Liquid Asset Check: Verified</span>
                        </div>
                        <Button variant="ghost" className="h-9 w-9 p-0 rounded-2xl hover:bg-slate-100">
                           <ChevronRight className="h-5 w-5 text-slate-400" />
                        </Button>
                     </div>
                  </CardContent>
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform pointer-events-none">
                     <DollarSign className="h-40 w-40 text-slate-900" />
                  </div>
               </Card>
            </motion.div>

            {/* Module: Human Talent */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
               <Card className="border-none shadow-2xl shadow-slate-100 bg-white ring-1 ring-slate-200 overflow-hidden group h-full">
                  <CardHeader className="bg-slate-50/50 pb-2 border-b border-slate-50 mb-4 px-8 pt-8">
                     <CardTitle className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Talent Pool (H1)</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-10">
                     <div className="pt-2">
                        <div className="text-5xl font-black text-slate-950 tracking-tighter">{data.instructors.length}</div>
                        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Active Academic Instructors</p>
                     </div>
                     <div className="mt-10 flex gap-4">
                        <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex items-center space-x-3 shadow-inner">
                           <Award className="h-4 w-4 text-slate-500" />
                           <span className="text-sm font-black text-slate-900">4.8 / 5.0 Rating</span>
                        </div>
                     </div>
                  </CardContent>
                  <div className="absolute right-0 bottom-0 p-10 opacity-5 group-hover:-rotate-6 transition-transform pointer-events-none">
                     <Briefcase className="h-32 w-32 text-slate-900" />
                  </div>
               </Card>
            </motion.div>

            {/* Module: Operations Pipeline */}
            <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}>
               <Card className="border-none shadow-2xl shadow-slate-300/40 bg-white ring-1 ring-slate-200 overflow-hidden h-full">
                  <CardHeader className="bg-slate-50/50 pb-2 border-b border-slate-50 mb-4 px-8 pt-8">
                     <CardTitle className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Operations Pipeline (O1)</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-10">
                     <div className="pt-2 pb-6">
                        <div className="text-5xl font-black text-slate-950 tracking-tighter">94<span className="text-2xl font-black opacity-20">%</span></div>
                        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Aggregate OEE Score</p>
                     </div>
                     <div className="space-y-4 pt-4 border-t border-slate-50">
                        <div className="flex justify-between items-center h-4">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">System Stability</span>
                           <CheckCircle2 className="h-4 w-4 text-slate-500" />
                        </div>
                        <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 ring-2 ring-slate-100/50">
                           <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '94%' }}
                              className="h-full bg-slate-950 rounded-full"
                           />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">
            {/* REVENUE SYNTHESIS CHART */}
            <Card className="border-none shadow-2xl shadow-slate-300/40 bg-white ring-1 ring-slate-200 overflow-hidden">
               <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-8 px-10">
                  <div className="flex justify-between items-center">
                     <div>
                        <CardTitle className="text-xl font-black text-slate-900 flex items-center uppercase tracking-widest">
                           <TrendingUp className="mr-3 h-6 w-6 text-slate-500" />
                           Capital Synthesis Map
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium">Quarterly fiscal trends mapped from student purchase vectors</CardDescription>
                     </div>
                     <div className="flex bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm">
                        <Button variant="ghost" className="h-8 text-[11px] font-black uppercase tracking-widest px-6 text-slate-600">Weekly</Button>
                        <Button className="h-8 text-[11px] font-black uppercase tracking-widest px-6 bg-slate-950 text-white shadow-xl shadow-slate-300 rounded-xl">Monthly</Button>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="h-[400px] pt-12 px-10 pb-10">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={revenueData} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorRevERP" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: '#94a3b8', fontWeight: 900 }} dy={15} />
                        <YAxis hide />
                        <Tooltip
                           contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorRevERP)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </CardContent>
               <CardFooter className="bg-slate-50/50 py-5 px-10 flex justify-between items-center border-t border-slate-200">
                  <div className="flex items-center space-x-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Primary Channel</p>
                     <p className="text-xs font-black text-slate-800 border-l border-slate-200 pl-6">Digital INR Payments (Settled)</p>
                  </div>
                  <Button variant="link" className="text-slate-900 hover:text-slate-800 p-0 text-[10px] font-black uppercase tracking-widest h-auto">
                     Full Ledger Synthesis <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
               </CardFooter>
            </Card>

            {/* HR & TALENT MANAGEMENT LEDGER */}
            <div className="space-y-10 h-full">
               <Card className="border-none shadow-2xl shadow-slate-300/40 bg-white ring-1 ring-slate-200 h-full overflow-hidden flex flex-col">
                  <CardHeader className="flex flex-row items-center justify-between pb-8 pt-8 px-10 border-b border-slate-50">
                     <div>
                        <CardTitle className="text-xl font-black text-slate-900 flex items-center uppercase tracking-widest">
                           <Zap className="mr-3 h-6 w-6 text-amber-500 fill-amber-500" />
                           Talent Lifecycle Feed
                        </CardTitle>
                        <CardDescription className="text-slate-500 font-medium">Monitoring instructor workload and efficiency metrics</CardDescription>
                     </div>
                     <LayoutGrid className="h-6 w-6 text-slate-100" />
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                     <div className="p-10 space-y-5 max-h-[480px] overflow-y-auto custom-scrollbar">
                        {data.instructors.map((ins, i) => (
                           <motion.div
                              initial={{ opacity: 0, x: 15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              key={i}
                              className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm group transition-all hover:bg-slate-50 hover:border-slate-200 cursor-default"
                           >
                              <div className="flex items-center space-x-5">
                                 <div className="h-14 w-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white text-base font-black shadow-2xl shadow-slate-400/50 group-hover:rotate-6 transition-transform">
                                    {ins.name.charAt(0)}
                                 </div>
                                 <div>
                                    <h5 className="font-black text-slate-900 text-base leading-tight tracking-tight">{ins.name}</h5>
                                    <p className="text-[10px] font-black text-slate-500 uppercase mt-1 tracking-widest italic">INS-ARCH-#{ins.instructorId.slice(-6)}</p>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-8">
                                 <div className="text-right border-r border-slate-100 pr-8">
                                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Workload</p>
                                    <p className="text-sm font-black text-slate-900 leading-tight">{ins.totalWorkloadHours} Hrs/Mo</p>
                                 </div>
                                 <div className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-inner">
                                    <div className="flex flex-col items-center text-slate-500 group-hover:scale-110 transition-transform">
                                       <div className="flex items-center space-x-0.5">
                                          <Star className="h-2.5 w-2.5 fill-slate-500" />
                                          <span className="text-xs font-black">{ins.performanceRating}</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-10 px-10">
                     <div className="w-full bg-slate-950 rounded-3xl p-8 text-white overflow-hidden relative group">
                        <div className="relative z-10 flex items-center justify-between">
                           <div className="max-w-[75%]">
                              <h6 className="font-black text-lg mb-2 tracking-tighter">Strategic Talent Brief</h6>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-bold opacity-80 italic">
                                 "Academy growth is hitting instructor capacity thresholds. System recommends triggering a 'New Supply Acquisition' for React Native experts."
                              </p>
                           </div>
                           <Button size="icon" className="bg-white/10 hover:bg-white/20 text-white rounded-2xl h-12 w-12 shadow-2xl backdrop-blur-md">
                              <Rocket className="h-5 w-5 fill-white" />
                           </Button>
                        </div>
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                           <LayoutGrid className="h-40 w-40" />
                        </div>
                     </div>
                  </CardFooter>
               </Card>
            </div>
         </div>
      </div>
   );
}

export default ERPDashboard;
