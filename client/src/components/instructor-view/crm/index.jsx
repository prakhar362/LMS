import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users2, Target, Rocket, RefreshCcw, Heart, Activity, TrendingUp, Sparkles, Zap, ShieldCheck, Star, PieChart, ArrowRight, Briefcase, Megaphone, DollarSign, BrainCircuit, AlertOctagon } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { fetchCRMDashboardDataService, fetchInstructorFeedbackService } from "@/services";
import { motion } from 'framer-motion';

function CRMDashboard() {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("predictive");

  useEffect(() => {
    async function fetchData() {
      const response = await fetchCRMDashboardDataService();
      if (response?.success) setData(response.data);
      // Fallback mock data if empty
      if (!response?.data) setData({
        lifecycleStats: [], recentInteractions: []
      })
    }
    fetchData();
  }, [auth]);

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="h-10 w-10 border-4 border-slate-100 border-t-slate-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-400 font-black uppercase text-[10px] tracking-widest animate-pulse">Syncing Instructor Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-6 p-1 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Instructor Command Center</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Predictive AI, Affiliate Marketing & Talent Bounties</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <Button variant={activeTab === 'predictive' ? 'default' : 'ghost'} onClick={() => setActiveTab('predictive')} className="h-9 px-4 rounded-lg font-bold text-xs"><BrainCircuit className="w-4 h-4 mr-2"/>Predictive Success</Button>
          <Button variant={activeTab === 'affiliate' ? 'default' : 'ghost'} onClick={() => setActiveTab('affiliate')} className="h-9 px-4 rounded-lg font-bold text-xs"><Megaphone className="w-4 h-4 mr-2"/>Affiliate Bids</Button>
          <Button variant={activeTab === 'bounties' ? 'default' : 'ghost'} onClick={() => setActiveTab('bounties')} className="h-9 px-4 rounded-lg font-bold text-xs"><Briefcase className="w-4 h-4 mr-2"/>Bounty Master</Button>
        </div>
      </motion.div>

      {/* PREDICTIVE STUDENT SUCCESS (Modernized Churn UI) */}
      {activeTab === 'predictive' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <Card className="lg:col-span-2 border-none shadow-xl bg-white overflow-hidden ring-1 ring-slate-200">
             <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-black flex items-center text-slate-800"><AlertOctagon className="w-5 h-5 mr-2 text-rose-500"/> At-Risk Students (AI Predicted Churn)</CardTitle>
                <CardDescription>Our AI detects behavior patterns (pauses, quiz fails) indicating a student is about to abandon the course.</CardDescription>
             </CardHeader>
             <CardContent className="p-0">
               <Table>
                 <TableHeader>
                   <TableRow className="bg-slate-50/50">
                     <TableHead className="font-bold text-slate-500 pl-6 text-xs uppercase tracking-widest">Student</TableHead>
                     <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-widest">Risk Level</TableHead>
                     <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-widest">Trigger Factor</TableHead>
                     <TableHead className="font-bold text-slate-500 text-right pr-6 text-xs uppercase tracking-widest">Action</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {[
                     { name: "John Doe", course: "Advanced React", risk: "CRITICAL", trigger: "Stalled on Auth Module for 14 days", color: "text-rose-600 bg-rose-50" },
                     { name: "Alice Smith", course: "UI/UX Mastery", risk: "HIGH", trigger: "Failed Quiz 3 times", color: "text-orange-600 bg-orange-50" },
                     { name: "Bob Martin", course: "Node.js Backend", risk: "MEDIUM", trigger: "Skipped 4 consecutive lectures", color: "text-amber-600 bg-amber-50" }
                   ].map((s, i) => (
                     <TableRow key={i}>
                       <TableCell className="pl-6 py-4">
                         <p className="font-black text-slate-900">{s.name}</p>
                         <p className="text-xs text-slate-500">{s.course}</p>
                       </TableCell>
                       <TableCell py-4><span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-widest ${s.color}`}>{s.risk}</span></TableCell>
                       <TableCell py-4 className="text-sm font-medium text-slate-600 italic">"{s.trigger}"</TableCell>
                       <TableCell className="text-right pr-6 py-4">
                         <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-lg px-4 shadow-md">Auto-Send Help/Nudge</Button>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
          </Card>
          
          <Card className="border-none shadow-xl shadow-indigo-100 bg-gradient-to-br from-indigo-600 to-indigo-900 text-white p-6 relative overflow-hidden">
             <BrainCircuit className="absolute -bottom-10 -right-10 w-48 h-48 text-indigo-500/20" />
             <h3 className="text-xl font-black mb-2">Automated Retention</h3>
             <p className="text-sm text-indigo-200 mb-8 font-medium">Auto-pilot is ON. When a student hits 'HIGH' risk, an automated personalized WhatsApp message with a hint is sent.</p>
             <div className="bg-indigo-950/40 p-4 rounded-xl backdrop-blur-sm border border-indigo-500/30">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Saved Revenue</span>
                 <span className="text-lg font-black text-emerald-400">₹45,200</span>
               </div>
               <p className="text-[10px] text-indigo-300">By re-engaging 32 at-risk students this month.</p>
             </div>
          </Card>
        </div>
      )}

      {/* AFFILIATE MARKETING */}
      {activeTab === 'affiliate' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <Card className="border-none shadow-xl ring-1 ring-slate-200 overflow-hidden">
             <CardHeader className="bg-emerald-50 border-b border-emerald-100">
               <CardTitle className="flex items-center text-emerald-900"><Megaphone className="w-5 h-5 mr-2 text-emerald-600"/> Recommend Courses (Affiliate Bidding)</CardTitle>
               <CardDescription className="text-emerald-800/70">Pay platform tokens to push your courses into the "Recommended for You" feed of target students.</CardDescription>
             </CardHeader>
             <CardContent className="pt-6 space-y-6">
               <div className="space-y-4">
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Select Course to Boost</label>
                   <select className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm font-bold">
                     <option>Ultimate Web Development 2026</option>
                     <option>Advanced Node.js Architecture</option>
                   </select>
                 </div>
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Max Bid per Click (₹)</label>
                   <Input type="number" defaultValue={15} className="h-12 rounded-xl border-slate-200 font-bold" />
                 </div>
                 <Button className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-lg font-black shadow-lg shadow-emerald-200">Start Campaign</Button>
               </div>
             </CardContent>
          </Card>

          <Card className="border-none shadow-xl ring-1 ring-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-black text-slate-800">Active Campaigns Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-4">
                {[
                  { name: "React Bootcamp", impressions: "45.2k", clicks: "1.2k", conversions: "84", spent: "₹18,000", roi: "+340%" }
                ].map((camp, i) => (
                  <div key={i} className="p-5 border border-slate-100 rounded-2xl bg-slate-50">
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-black text-lg text-slate-900">{camp.name}</p>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-black">{camp.roi} ROI</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center border-t border-slate-200 pt-4">
                      <div><p className="text-[10px] font-bold text-slate-400 uppercase">Impressions</p><p className="font-black mt-1">{camp.impressions}</p></div>
                      <div><p className="text-[10px] font-bold text-slate-400 uppercase">Clicks</p><p className="font-black mt-1">{camp.clicks}</p></div>
                      <div><p className="text-[10px] font-bold text-emerald-500 uppercase">Sales</p><p className="font-black mt-1 text-emerald-600">{camp.conversions}</p></div>
                      <div><p className="text-[10px] font-bold text-rose-500 uppercase">Spent</p><p className="font-black mt-1 text-rose-600">{camp.spent}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* BOUNTY SYSTEM */}
      {activeTab === 'bounties' && (
        <Card className="border-none shadow-xl ring-1 ring-slate-200 animate-in fade-in slide-in-from-bottom-4 overflow-hidden">
           <CardHeader className="bg-slate-950 text-white">
             <div className="flex justify-between items-center">
               <div>
                 <CardTitle className="flex items-center text-2xl font-black text-white"><Briefcase className="w-6 h-6 mr-3 text-amber-400"/> Talent Pipeline (Manage Bounties)</CardTitle>
                 <CardDescription className="text-slate-400 mt-1">Post micro-tasks to hire top students or review submitted code challenges.</CardDescription>
               </div>
               <Button className="bg-amber-500 hover:bg-amber-600 text-black font-black">Post New Bounty</Button>
             </div>
           </CardHeader>
           <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow className="bg-slate-50">
                   <TableHead className="font-bold text-slate-500 pl-6 text-xs uppercase tracking-widest py-4">Bounty Title</TableHead>
                   <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-widest">Reward</TableHead>
                   <TableHead className="font-bold text-slate-500 text-center text-xs uppercase tracking-widest">Submissions</TableHead>
                   <TableHead className="font-bold text-slate-500 text-right pr-6 text-xs uppercase tracking-widest">Status</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {[
                   { title: "Fix Layout Bug in Edumate", reward: "₹500", subs: 12, status: "Reviewing (2 Pending)" },
                   { title: "Implement MongoDB Aggregation", reward: "Fast-Track Interview", subs: 34, status: "Completed" }
                 ].map((b, i) => (
                   <TableRow key={i} className="hover:bg-slate-50 transition-colors">
                     <TableCell className="pl-6 py-5 font-black text-slate-800 text-base">{b.title}</TableCell>
                     <TableCell className="py-5"><Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800 font-bold">{b.reward}</Badge></TableCell>
                     <TableCell className="py-5 text-center font-bold text-slate-600">{b.subs}</TableCell>
                     <TableCell className="text-right pr-6 py-5">
                       <Button variant="outline" className="font-bold text-xs h-8">View {b.subs} Repos</Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </CardContent>
        </Card>
      )}

    </div>
  );
}

export default CRMDashboard;
