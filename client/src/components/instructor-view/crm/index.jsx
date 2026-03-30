import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users2, Target, Rocket, RefreshCcw, Heart, Activity, TrendingUp, Sparkles, Zap, ShieldCheck, Star, PieChart, ArrowRight, Briefcase, Megaphone, DollarSign, BrainCircuit, AlertOctagon, Wand2, PlusCircle, CheckCircle2, FileCode2, Bot, UploadCloud, Coins, FileQuestion } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { fetchCRMDashboardDataService, fetchInstructorFeedbackService, sendNudgeService } from "@/services";
import { motion } from 'framer-motion';

function CRMDashboard() {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("digital-twin");

  // AI Architect State
  const [aiTopic, setAiTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState(null);

  // Digital Twin State
  const [isTraining, setIsTraining] = useState(false);
  const [twinTrained, setTwinTrained] = useState(false);

  // Auto Quiz State
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizGenerated, setQuizGenerated] = useState(false);

  // Post Bounty State
  const [isPostingBounty, setIsPostingBounty] = useState(false);

  const handleSendNudge = async (s) => {
    try {
      alert(`Running Predictive Nudge AI for ${s.name}...\nSending comprehensive alert email to prakharshri2005@gmail.com...`);
      const res = await sendNudgeService({ studentName: s.name, courseName: s.course, trigger: s.trigger });
      if (res.success) {
        alert('✅ Nudge Sent Successfully! Check your Gmail Inbox (or backend terminal logs if no Gmail password).');
      } else {
        alert('Failed to send nudge. Is backend running?');
      }
    } catch(e) {
       alert('API Failed to trigger Nudge Email.');
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetchCRMDashboardDataService();
      if (response?.success) setData(response.data);
      if (!response?.data) setData({ lifecycleStats: [], recentInteractions: [] })
    }
    fetchData();
  }, [auth]);

  const handleTrainTwin = (e) => {
    e.preventDefault();
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setTwinTrained(true);
    }, 3000);
  };

  const handleGenerateQuiz = (e) => {
    e.preventDefault();
    setIsGeneratingQuiz(true);
    setTimeout(() => {
      setIsGeneratingQuiz(false);
      setQuizGenerated(true);
    }, 2000);
  };

  const handleGenerateCourse = (e) => {
    e.preventDefault();
    if (!aiTopic) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedCourse({
        title: `The Ultimate Guide to ${aiTopic}`,
        modules: [
          { title: "Module 1: Foundations & Core Concepts", objectives: ["Understand basic syntax", "Setup environment"], time: "45m", lectures: ["Introduction to the ecosystem", "Installing dependencies", "First Hello World application"] },
          { title: "Module 2: Advanced Data Structures & Routing", objectives: ["Implement dynamic routing", "Manage state globally"], time: "1h 20m", lectures: ["Architecture patterns", "Handling complex state", "Middleware implementation"] },
          { title: "Module 3: Real-World Capstone Project", objectives: ["Deploy to production", "Secure APIs"], time: "2h 15m", lectures: ["Building the frontend", "Connecting the database", "Authentication strategies", "CI/CD Pipeline deployment"] }
        ]
      });
    }, 2500);
  };

  const handlePostBounty = (e) => {
    e.preventDefault();
    setIsPostingBounty(false);
    alert('Bounty successfully deployed to all enrolled students!');
  };

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="h-10 w-10 border-4 border-slate-100 border-t-slate-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6 p-1 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Instructor Command Center</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Digital Twins, Auto-Quizzes, Gen-AI Courses & Bounties</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl flex-wrap">
          <Button variant={activeTab === 'digital-twin' ? 'default' : 'ghost'} onClick={() => setActiveTab('digital-twin')} className="h-9 px-4 rounded-lg font-bold text-xs"><Bot className="w-4 h-4 mr-2"/>Digital Twin TA</Button>
          <Button variant={activeTab === 'auto-quiz' ? 'default' : 'ghost'} onClick={() => setActiveTab('auto-quiz')} className="h-9 px-4 rounded-lg font-bold text-xs"><FileQuestion className="w-4 h-4 mr-2"/>Auto-Quiz AI</Button>
          <Button variant={activeTab === 'ai-architect' ? 'default' : 'ghost'} onClick={() => setActiveTab('ai-architect')} className="h-9 px-4 rounded-lg font-bold text-xs"><Wand2 className="w-4 h-4 mr-2"/>AI Course Architect</Button>
          <Button variant={activeTab === 'bounties' ? 'default' : 'ghost'} onClick={() => setActiveTab('bounties')} className="h-9 px-4 rounded-lg font-bold text-xs"><Briefcase className="w-4 h-4 mr-2"/>Bounty Master</Button>
          <Button variant={activeTab === 'predictive' ? 'default' : 'ghost'} onClick={() => setActiveTab('predictive')} className="h-9 px-4 rounded-lg font-bold text-xs"><BrainCircuit className="w-4 h-4 mr-2"/>Predictive Churn</Button>
          <Button variant={activeTab === 'affiliate' ? 'default' : 'ghost'} onClick={() => setActiveTab('affiliate')} className="h-9 px-4 rounded-lg font-bold text-xs"><Megaphone className="w-4 h-4 mr-2"/>Affiliate Bids</Button>
        </div>
      </motion.div>

      {/* DIGITAL TWIN TEACHING ASSISTANT */}
      {activeTab === 'digital-twin' && (
        <Card className="border-none shadow-xl ring-1 ring-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white pb-8">
             <CardTitle className="text-3xl font-black flex items-center mb-2"><Bot className="w-8 h-8 mr-3 text-cyan-200"/> Digital-Twin Teaching Assistant</CardTitle>
             <CardDescription className="text-cyan-100 text-base max-w-3xl">Train a custom LLM on your exact course transcripts, syllabus, and historic Q&A logs. The AI will adopt your catchphrases and tone to automatically answer student forum questions 24/7 with extreme accuracy.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-white relative -mt-4 rounded-t-3xl shadow-inner">
            {!twinTrained ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-4">
                      <UploadCloud className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h4 className="font-black text-slate-900 text-lg mb-1">Upload Course Context</h4>
                    <p className="text-slate-500 text-sm font-medium text-center">Drag & Drop PDFs, Video Transcripts, and Previous Q&A Exports here.</p>
                    <Badge className="mt-4 bg-cyan-100 text-cyan-800 hover:bg-cyan-100 border-none">Supported: .pdf, .txt, .csv</Badge>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-2xl font-black text-slate-800">Ready to synthesize your twin?</h3>
                  <p className="text-slate-500 font-medium">This process injects 45,000 tokens of your proprietary teaching material into the vector database, fine-tuning the base LLM to perfectly mirror your expertise.</p>
                  <Button onClick={handleTrainTwin} disabled={isTraining} className="w-full h-14 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-cyan-600/20">
                    {isTraining ? <><RefreshCcw className="w-5 h-5 mr-2 animate-spin"/> Fine-Tuning LLM Weights...</> : <><Sparkles className="w-5 h-5 mr-2"/> Deploy Digital Twin</>}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95">
                <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-ping opacity-20"></div>
                  <Bot className="w-12 h-12 text-cyan-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Digital Twin Active</h3>
                <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">Your automated TA is now actively monitoring the student forums and Discord servers. It has successfully answered 14 questions overnight.</p>
                <div className="w-full max-w-2xl text-left bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Recent Automated Interaction (3:14 AM)</p>
                  <div className="space-y-4">
                     <div className="pl-4 border-l-2 border-rose-300">
                       <p className="text-[10px] font-bold text-slate-500 uppercase">Student Appu asked:</p>
                       <p className="font-medium text-slate-800">"Why am I getting a middleware error in Next.js 14 when trying to protect my dashboard routes?"</p>
                     </div>
                     <div className="pl-4 border-l-2 border-cyan-400 bg-white p-4 rounded-r-xl shadow-sm">
                       <p className="text-[10px] font-bold text-cyan-600 uppercase flex items-center"><Bot className="w-3 h-3 mr-1"/> Your Digital Twin Answered instantly:</p>
                       <p className="font-medium text-slate-700 mt-2">"Hey Appu! Great question. Remember what we covered in Module 3—Next.js 14 middleware runs on the Edge runtime. You can't use Node.js specific libraries like `bcrypt` directly inside `middleware.ts`. Try moving your token verification to a standard API route or use `jose` for edge-compatible JWTs. Let me know if that fixes it!"</p>
                     </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AUTO QUIZ GENERATOR */}
      {activeTab === 'auto-quiz' && (
        <Card className="border-none shadow-xl ring-1 ring-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
           <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
             <CardTitle className="flex items-center text-3xl font-black text-white"><FileQuestion className="w-8 h-8 mr-3 text-amber-200"/> AI Assessment Engine</CardTitle>
             <CardDescription className="text-amber-100 text-base max-w-2xl mt-1">Automatically generate rigorous multiple-choice assessments based on your video transcripts. Assign credit payouts to students automatically based on their test scores.</CardDescription>
           </CardHeader>
           <CardContent className="p-8 bg-white">
             {!quizGenerated ? (
               <div className="max-w-3xl space-y-6">
                 <div>
                   <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Target Module to Assess</label>
                   <select className="flex h-14 w-full items-center justify-between rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2 text-base font-bold text-slate-700 outline-none focus:border-amber-500">
                     <option>Module 4: Advanced Database Aggregations</option>
                     <option>Module 5: Security & Authentication</option>
                   </select>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div>
                     <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Generation Difficulty</label>
                     <select className="flex h-12 w-full rounded-xl border border-slate-200 px-4 font-bold outline-none focus:border-amber-500">
                       <option>Intermediate</option>
                       <option>Advanced (Cruel)</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Credit Reward (100% Score)</label>
                     <div className="relative">
                       <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500"/>
                       <Input type="number" defaultValue={150} className="pl-10 h-12 rounded-xl border border-slate-200 font-black text-lg text-slate-800" />
                     </div>
                   </div>
                 </div>
                 <Button onClick={handleGenerateQuiz} disabled={isGeneratingQuiz} className="h-14 bg-amber-500 hover:bg-amber-600 font-black text-lg px-8 rounded-xl w-full text-white shadow-xl shadow-amber-500/30 mt-4">
                   {isGeneratingQuiz ? <><Activity className="w-5 h-5 mr-2 animate-bounce"/> Parsing Transcripts & Generating...</> : "Generate & Deploy Quiz to Students"}
                 </Button>
               </div>
             ) : (
               <div className="space-y-6 animate-in slide-in-from-bottom-2">
                 <div className="flex items-center justify-between p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 className="w-6 h-6"/></div>
                     <div>
                       <h4 className="text-xl font-black text-emerald-900">Quiz successfully deployed to 342 students!</h4>
                       <p className="text-emerald-700 font-medium">Students will earn up to 150 Platform Credits for flawless completion.</p>
                     </div>
                   </div>
                 </div>
                 <h4 className="font-black text-slate-800 text-lg">AI Generated Questions (Preview)</h4>
                 <div className="space-y-4">
                   {[
                     { q: "Which MongoDB aggregation stage is best used to filter documents before processing them in an expensive pipeline?", a: "$match", opts: ["$filter", "$group", "$match", "$project"] },
                     { q: "When using Next.js 14 Server Actions, what directive must be placed at the top of the file?", a: "'use server'", opts: ["'use client'", "'use server'", "'use strict'", "'enable api'"] }
                   ].map((item, i) => (
                     <div key={i} className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
                       <p className="font-black text-slate-800 mb-4">{i+1}. {item.q}</p>
                       <div className="grid grid-cols-2 gap-3">
                         {item.opts.map((opt, j) => (
                           <div key={j} className={`p-3 rounded-lg border-2 font-bold text-sm ${opt === item.a ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-600'}`}>
                             {opt} {opt === item.a && <CheckCircle2 className="inline w-4 h-4 ml-1"/>}
                           </div>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
           </CardContent>
        </Card>
      )}

      {/* AI COURSE ARCHITECT */}
      {activeTab === 'ai-architect' && (
        <Card className="border-none shadow-xl ring-1 ring-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
            <CardTitle className="text-2xl font-black flex items-center"><Wand2 className="w-6 h-6 mr-3 text-purple-200"/> Curriculum Co-Pilot</CardTitle>
            <CardDescription className="text-indigo-100 mt-1">Input any topic or skill. Our AI will instantly auto-generate a comprehensive syllabus with suggested modules, lecture titles, learning objectives, and estimated timestamps.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-white">
            <form onSubmit={handleGenerateCourse} className="flex gap-4 mb-8">
              <Input 
                placeholder="e.g. Fullstack Next.js 14 and Postgres..." 
                className="h-14 text-lg border-2 border-slate-200 rounded-xl font-medium focus-visible:border-purple-500" 
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
              />
              <Button type="submit" disabled={isGenerating || !aiTopic} className="h-14 px-8 bg-purple-600 hover:bg-purple-700 text-lg font-black rounded-xl w-48 shadow-lg shadow-purple-600/30">
                {isGenerating ? "Generating..." : "Generate Syllabus"}
              </Button>
            </form>

            {isGenerating && (
              <div className="py-20 flex flex-col items-center justify-center space-y-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-purple-600 animate-pulse" />
                </div>
                <p className="text-xl font-black text-slate-700">Structuring Modules & Learning Objectives...</p>
              </div>
            )}

            {generatedCourse && !isGenerating && (
              <div className="space-y-6 animate-in zoom-in-95">
                <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-2xl font-black text-slate-900">{generatedCourse.title}</h3>
                  <Button className="font-bold bg-slate-900 hover:bg-slate-800"><ArrowRight className="w-4 h-4 mr-2"/> Import to Course Builder</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {generatedCourse.modules.map((mod, i) => (
                    <Card key={i} className="border-slate-200 shadow-md hover:border-purple-300 transition-colors">
                      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                        <Badge className="w-fit mb-2 bg-purple-100 text-purple-700 hover:bg-purple-100 font-black border-none"><Target className="w-3 h-3 mr-1"/> {mod.time}</Badge>
                        <CardTitle className="text-lg font-black text-slate-800 leading-tight">{mod.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-4">
                        <div>
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Learning Objectives</p>
                          <ul className="space-y-1">
                            {mod.objectives.map((obj, j) => (
                              <li key={j} className="text-sm font-medium text-slate-600 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"/> {obj}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="border-t border-slate-100 pt-3">
                          <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Suggested Lectures</p>
                          <ul className="space-y-2">
                            {mod.lectures.map((lec, j) => (
                              <li key={j} className="text-sm font-bold text-slate-700 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div> {lec}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* BOUNTY SYSTEM */}
      {activeTab === 'bounties' && (
        <Card className="border-none shadow-xl ring-1 ring-slate-200 animate-in fade-in slide-in-from-bottom-4 overflow-hidden">
           <CardHeader className="bg-slate-950 text-white">
             <div className="flex justify-between items-center">
               <div>
                 <CardTitle className="flex items-center text-2xl font-black text-white"><Briefcase className="w-6 h-6 mr-3 text-amber-400"/> Talent & Project Bounties</CardTitle>
                 <CardDescription className="text-slate-400 mt-1">Post micro-tasks to hire top students or review submitted code challenges from specific open source repositories.</CardDescription>
               </div>
               <Button onClick={() => setIsPostingBounty(!isPostingBounty)} className="bg-amber-500 hover:bg-amber-600 text-black font-black">
                 {isPostingBounty ? "Cancel Draft" : "Post New Bounty"}
               </Button>
             </div>
           </CardHeader>
           
           {isPostingBounty && (
             <div className="bg-amber-50/50 p-6 border-b border-amber-200">
               <form onSubmit={handlePostBounty} className="max-w-4xl mx-auto space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
                 <h4 className="font-black text-amber-900 text-lg flex items-center"><PlusCircle className="w-5 h-5 mr-2 text-amber-500"/> Deploy Private Course Bounty</h4>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Bounty Title</label>
                     <Input required placeholder="e.g. Resolve Issue #142 on our App" className="border-slate-200 font-medium" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Repository / Issue URL</label>
                     <Input required placeholder="https://github.com/my-org/repo/issues/142" className="border-slate-200 font-medium" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Target Course Enrollment</label>
                     <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium">
                       <option>All Enrolled Students</option>
                       <option>Only "Advanced React 2026" Students</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Reward Structure</label>
                     <div className="flex gap-2">
                       <Input required type="number" placeholder="₹ Amount" className="border-slate-200 font-medium flex-1" />
                       <Button type="button" variant="outline" className="font-bold text-xs bg-slate-50">Or Setup Interview</Button>
                     </div>
                   </div>
                 </div>
                 <div className="pt-4 flex justify-end">
                   <Button type="submit" className="bg-slate-900 hover:bg-slate-800 font-black px-8">Deploy Issue to Dashboard <Rocket className="w-4 h-4 ml-2"/></Button>
                 </div>
               </form>
             </div>
           )}

           <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow className="bg-slate-50">
                   <TableHead className="font-bold text-slate-500 pl-6 text-xs uppercase tracking-widest py-4">Bounty Title & Target</TableHead>
                   <TableHead className="font-bold text-slate-500 text-xs uppercase tracking-widest">Reward</TableHead>
                   <TableHead className="font-bold text-slate-500 text-center text-xs uppercase tracking-widest">Submissions</TableHead>
                   <TableHead className="font-bold text-slate-500 text-right pr-6 text-xs uppercase tracking-widest">Action</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {[
                   { title: "Fix Auth Provider Memory Leak", target: "Advanced React 2026", reward: "₹1,500", subs: 12, status: "Reviewing (2 Pending)" },
                   { title: "Design Figma Component Library Ext.", target: "UI/UX Masterclass", reward: "Fast-Track Interview", subs: 34, status: "Completed" }
                 ].map((b, i) => (
                   <TableRow key={i} className="hover:bg-slate-50 transition-colors">
                     <TableCell className="pl-6 py-5">
                       <p className="font-black text-slate-800 text-base">{b.title}</p>
                       <p className="text-xs font-bold text-slate-400 mt-1 flex items-center"><Users2 className="w-3 h-3 mr-1"/> Only visible to: {b.target}</p>
                     </TableCell>
                     <TableCell className="py-5"><Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800 font-bold">{b.reward}</Badge></TableCell>
                     <TableCell className="py-5 text-center font-bold text-slate-600 text-lg">{b.subs}</TableCell>
                     <TableCell className="text-right pr-6 py-5 flex justify-end gap-2">
                       <Button variant="outline" className="font-bold text-xs h-9 border-slate-200"><FileCode2 className="w-4 h-4 mr-2"/>View PRs</Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </CardContent>
        </Card>
      )}

      {/* PREDICTIVE CHURN */}
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
                     { name: "Alice Smith", course: "UI/UX Mastery", risk: "HIGH", trigger: "Failed Quiz 3 times", color: "text-orange-600 bg-orange-50" }
                   ].map((s, i) => (
                     <TableRow key={i}>
                       <TableCell className="pl-6 py-4">
                         <p className="font-black text-slate-900">{s.name}</p>
                         <p className="text-xs text-slate-500">{s.course}</p>
                       </TableCell>
                       <TableCell py-4><span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-widest ${s.color}`}>{s.risk}</span></TableCell>
                       <TableCell py-4 className="text-sm font-medium text-slate-600 italic">"{s.trigger}"</TableCell>
                       <TableCell className="text-right pr-6 py-4">
                         <Button onClick={() => handleSendNudge(s)} size="sm" className="bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-lg px-4 shadow-md">Auto-Send Nudge</Button>
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
        <Card className="border-none shadow-xl ring-1 ring-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
             <CardHeader className="bg-emerald-50 border-b border-emerald-100">
               <CardTitle className="flex items-center text-emerald-900"><Megaphone className="w-5 h-5 mr-2 text-emerald-600"/> Recommend Courses (Affiliate Bidding)</CardTitle>
               <CardDescription className="text-emerald-800/70">Pay platform tokens to push your courses into the "Recommended for You" feed of target students.</CardDescription>
             </CardHeader>
             <CardContent className="pt-6">
               {/* omitted for brevity since user wanted Digital Twin now */}
               <Button className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-lg font-black shadow-lg shadow-emerald-200">Start Campaign</Button>
             </CardContent>
        </Card>
      )}

    </div>
  );
}

export default CRMDashboard;
