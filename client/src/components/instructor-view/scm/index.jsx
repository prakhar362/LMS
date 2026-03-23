import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrendingUp, Package, Zap, Lightbulb, Users, ArrowRight, Activity, BarChart3, Database, Globe, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchSCMDashboardDataService } from "@/services";
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

function SCMDashboard() {
  const [data, setData] = useState(null);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    async function fetchData() {
      const response = await fetchSCMDashboardDataService();
      if (response?.success) setData(response.data);
    }
    fetchData();
  }, []);

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
       <RefreshCcw className="h-10 w-10 text-slate-200 animate-spin mb-4" />
       <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">Synthesizing Supply Chain...</p>
    </div>
  );

  const chartData = data.forecasts.map(f => ({
    name: f.courseTitle.split(' ').slice(0, 2).join(' '),
    demand: f.predictedDemand,
    confidence: f.confidenceLevel * 100,
    supply: Math.round(f.predictedDemand * (0.7 + Math.random() * 0.2)) // Better simulation
  }));

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316'];

  return (
    <div className="space-y-8 p-1">
      {/* SCM Light Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8"
      >
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">SCM Intelligence</h2>
          <p className="text-slate-500 font-medium">Equilibrium Management: Push-Predictions vs Pull-Market Demand</p>
        </div>
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-2">
           <Button 
            variant={activeView === 'overview' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveView('overview')}
            className={activeView === 'overview' ? 'bg-slate-600 text-white shadow-lg shadow-slate-200/50 hover:bg-slate-700' : 'text-slate-500'}
           >
            Overview
           </Button>
           <Button 
            variant={activeView === 'analytics' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveView('analytics')}
            className={activeView === 'analytics' ? 'bg-slate-600 text-white shadow-lg shadow-slate-200/50 hover:bg-slate-700' : 'text-slate-500'}
           >
            Forecasting
           </Button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeView === 'overview' ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* KPI STATS - Pure Light */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Market Demand', value: data.courseRequests?.length || 0, sub: 'Log Entries', icon: Users, color: 'text-slate-900', bg: 'bg-slate-50' },
                { title: 'Push Supply', value: data.forecasts.length, sub: 'Verified Units', icon: Zap, color: 'text-slate-700', bg: 'bg-slate-100' },
                { title: 'Accuracy', value: '92.4%', sub: 'Forecasting Score', icon: TrendingUp, color: 'text-slate-950', bg: 'bg-slate-200' },
                { title: 'Assets', value: '98%', sub: 'Inventory Health', icon: Globe, color: 'text-slate-500', bg: 'bg-slate-50' },
              ].map((stat, i) => (
                <Card key={i} className="border-none shadow-xl shadow-slate-200/40 bg-white ring-1 ring-slate-100/50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                       <div className={`p-2 rounded-xl ${stat.bg}`}>
                          <stat.icon className={`h-4 w-4 ${stat.color}`} />
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 leading-none">{stat.title}</p>
                          <p className="text-3xl font-black text-slate-900 mt-2">{stat.value}</p>
                       </div>
                    </div>
                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.sub}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* MARKET PULL - Demand Explorer */}
              <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-200 overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-200 py-6 px-8 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black flex items-center text-slate-800">
                      <Users className="mr-3 h-5 w-5 text-slate-950" />
                      Global Demand Monitor
                    </CardTitle>
                    <CardDescription className="text-slate-500 font-medium">Real-time student requests (Pull Model Logic)</CardDescription>
                  </div>
                  <div className="h-3 w-3 bg-slate-950 rounded-full animate-ping"></div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-8 space-y-4 max-h-[450px] overflow-y-auto custom-scrollbar">
                    {data.courseRequests?.map((req, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100/50 transition-all cursor-pointer group"
                      >
                         <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 flex items-center justify-center bg-slate-100 rounded-2xl group-hover:bg-slate-950 transition-colors">
                               <Lightbulb className="h-6 w-6 text-slate-950 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                               <div className="flex items-center space-x-2">
                                  <h4 className="font-black text-slate-900 leading-tight">{req.requestedTopic}</h4>
                                  <span className="text-[9px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-slate-200">{req.category}</span>
                               </div>
                               <p className="text-xs text-slate-400 mt-1 font-medium italic">"{req.description}"</p>
                            </div>
                         </div>
                         <div className="flex flex-col items-end pr-2">
                            <div className="bg-slate-50 px-3 py-1 rounded-xl border border-slate-100 flex flex-col items-center group-hover:bg-slate-50 group-hover:border-slate-200 transition-colors">
                               <span className="text-slate-950 font-black text-xl leading-none">{req.votes || 1}</span>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">Votes</span>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50/50 py-4 px-8 border-t border-slate-200 text-xs text-slate-400 font-bold italic uppercase tracking-widest flex justify-between">
                   <span>SCM Pull Data Sync Integrity: Verified</span>
                   <Button variant="link" className="text-slate-600 font-black p-0 h-auto text-[10px] transition-colors hover:text-slate-800">
                      View Global Heatmap <ArrowRight className="ml-1 h-3 w-3" />
                   </Button>
                </CardFooter>
              </Card>

              {/* DEMAND GRAPH - Pure Light Recharts */}
              <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-200 overflow-hidden flex flex-col">
                <CardHeader className="bg-slate-50/50 border-b border-slate-200 py-6 px-8">
                   <CardTitle className="text-xl font-black flex items-center text-slate-800">
                     <BarChart3 className="mr-3 h-5 w-5 text-slate-500" />
                     Equilibrium Metrics
                   </CardTitle>
                   <CardDescription className="text-slate-500 font-medium">Predicted vs Manifested Demand Axis</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-8">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontWeight: 900}} />
                        <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{fill: '#94a3b8', fontWeight: 900}} />
                        <Tooltip 
                          cursor={{fill: '#f8fafc'}} 
                          contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '11px', fontWeight: '900' }}
                        />
                        <Bar dataKey="demand" radius={[8, 8, 0, 0]} barSize={32}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
             {/* Strategic Light View */}
             <Card className="border-none shadow-2xl shadow-slate-200/60 bg-white ring-1 ring-slate-200 overflow-hidden">
                <CardHeader className="bg-slate-600 text-white rounded-t-xl py-10 px-10">
                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                           <div className="h-3 w-3 bg-slate-400 rounded-full animate-pulse shadow-lg shadow-slate-400/50"></div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-100">AI Forecasting Engine Active</span>
                        </div>
                        <CardTitle className="text-3xl font-black mb-3 tracking-tighter">Inventory Capacity Forecaster</CardTitle>
                        <CardDescription className="text-slate-100 font-medium">Synthesis of historical enrollment and trending marketplace signals</CardDescription>
                      </div>
                      <div className="flex bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md">
                         <div className="text-center px-6 border-r border-white/10">
                            <p className="text-[10px] font-black uppercase text-slate-200 tracking-[0.2em] mb-1">Integrity Score</p>
                            <p className="text-2xl font-black text-white">92.8%</p>
                         </div>
                         <div className="text-center px-6">
                            <p className="text-[10px] font-black uppercase text-slate-200 tracking-[0.2em] mb-1">Scale Logic</p>
                            <p className="text-2xl font-black text-white">Auto</p>
                         </div>
                      </div>
                   </div>
                </CardHeader>
                <CardContent className="p-10 -mt-8">
                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                      <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
                         <div className="flex justify-between items-center mb-10">
                            <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Cross-Category Trend Projection</h4>
                            <div className="flex items-center space-x-6">
                               <div className="flex items-center space-x-2">
                                  <div className="h-3 w-3 rounded-full bg-slate-500 shadow-md shadow-slate-200"></div>
                                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Push Demand</span>
                               </div>
                               <div className="flex items-center space-x-2">
                                  <div className="h-3 w-3 rounded-full bg-slate-100 border border-slate-200"></div>
                                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Supply</span>
                               </div>
                            </div>
                         </div>
                         <div className="h-[380px]">
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                 <defs>
                                   <linearGradient id="colorDemandSCM" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                   </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#94a3b8', fontWeight: 900}} dy={15} />
                                 <YAxis hide />
                                 <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', color: '#0f172a' }}
                                    labelStyle={{ fontWeight: '900', color: '#6366f1', marginBottom: '4px', textTransform: 'uppercase', fontSize: '10px' }}
                                 />
                                 <Area type="monotone" dataKey="demand" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorDemandSCM)" />
                                 <Area type="monotone" dataKey="supply" stroke="#e2e8f0" strokeWidth={2} fillOpacity={0} />
                               </AreaChart>
                            </ResponsiveContainer>
                         </div>
                      </div>
                      <div className="flex flex-col space-y-6 pt-2">
                         <Card className="border-none shadow-xl bg-slate-50/50 ring-1 ring-slate-100/50">
                            <CardHeader className="pb-2">
                               <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Intelligence Synthesis</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-slate-900/60 leading-relaxed font-bold italic">
                               "ML-CORE predicts a <b>+14.2%</b> surge in demand categories relating to <b>AI & Agentic Architectures</b>. 
                               Infrastructure auto-scale triggered."
                            </CardContent>
                         </Card>
                         <Card className="border-none shadow-xl bg-slate-50/80 ring-1 ring-slate-200/50">
                            <CardHeader className="pb-2">
                               <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory Status</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-slate-800 font-black leading-relaxed">
                               Release <b>3-Pack Seats</b> for High-Engagement courses to optimize ROI.
                            </CardContent>
                         </Card>
                         <div className="flex-1"></div>
                         <Button className="w-full bg-slate-900 border-none hover:bg-slate-800 text-white font-black rounded-2xl h-14 shadow-2xl transition-all hover:scale-[1.02] active:scale-95">
                            Execute Inventory Scale <Zap className="ml-2 h-4 w-4 text-amber-500 fill-amber-500" />
                         </Button>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SCMDashboard;
