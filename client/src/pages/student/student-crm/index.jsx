import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coins, GraduationCap, Users, Bot, Mic, Trophy, CheckCircle2, TrendingUp, Briefcase, Gamepad2, Search, ExternalLink, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchStudentBoughtCoursesService, fetchBountiesService } from "@/services";

import Vapi from "@vapi-ai/web";
// Initialize Vapi with the provided public key from the backend environment
const vapi = new Vapi("f7352ccb-6ae5-47f1-bdc9-c6dd2bf14aa4");

function StudentCRMPage() {
  const { auth } = useContext(AuthContext);
  const [boughtCourses, setBoughtCourses] = useState([]);
  
  const [roleplayActive, setRoleplayActive] = useState(false);
  const [vapiConnecting, setVapiConnecting] = useState(false);
  const [transcript, setTranscript] = useState("The AI is listening. Speak clearly into your microphone.");
  
  const [bountiesList, setBountiesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [chatMessages, setChatMessages] = useState([
    { sender: "System", text: "Welcome to Alpha Guild squad chat!", time: "10:00 AM" },
    { sender: "Alex M.", text: "Anyone starting the React module today?", time: "10:05 AM" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);

  async function fetchBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setBoughtCourses(response?.data);
      // Auto-search jobs based on their first course category
      if (response?.data?.length > 0) {
        fetchBounties(response.data[0].category || "");
      }
    }
  }

  async function fetchBounties(query = "") {
    const response = await fetchBountiesService(query);
    if (response?.success) {
      setBountiesList(response?.data);
    }
  }

  useEffect(() => {
    if (auth?.user?._id) fetchBoughtCourses();
    fetchBounties();

    // Vapi Event Listeners
    const onCallStart = () => {
      setVapiConnecting(false);
      setRoleplayActive(true);
      setTranscript("Call connected. The AI should speak now.");
    };
    const onCallEnd = () => {
      setVapiConnecting(false);
      setRoleplayActive(false);
      setTranscript("Session terminated.");
    };
    const onMessage = (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        if (message.role === 'user') setTranscript(`You: "${message.transcript}"`);
        if (message.role === 'assistant') setTranscript(`AI: "${message.transcript}"`);
      } else if (message.type === 'error') {
        setTranscript(`Error: Check Vapi Dashboard API Keys. ${message.error?.message || ''}`);
      }
    };
    const onError = (e) => {
      console.error(e);
      setTranscript(`Connection Error: ${e.message || e}`);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    
    return () => {
      vapi.removeAllListeners();
    };
  }, [auth]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBounties(searchQuery);
  };

  const startVapiCall = async (persona) => {
    setVapiConnecting(true);
    setRoleplayActive(true);
    try {
      // Starting Vapi assistant
      await vapi.start({
        name: persona,
        firstMessage: `Hello. Let's begin the interview. I am taking the role of the ${persona}. Are you ready?`,
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: `You are playing the role of a ${persona}. Begin by greeting the student, telling them you are ready to evaluate them, and asking the first interview question. Keep responses under 2 sentences.` }]
        },
        voice: {
          provider: "11labs",
          voiceId: "bIHbv24MWmeRgasZH58o",
        },
      });
    } catch (e) {
      console.error("Vapi start failed:", e);
      setVapiConnecting(false);
      setRoleplayActive(false);
      alert("Vapi AI Call Failed.");
    }
  };

  const endVapiCall = () => {
    vapi.stop();
    setRoleplayActive(false);
    setVapiConnecting(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: auth?.user?.userName || "You", text: chatInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setChatInput("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500 max-w-[1600px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900">Student CRM & Career Center</h1>
          <p className="text-gray-500 mt-1">AI Simulators, Web Bounties, and Micro-Communities</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg border-2 border-amber-300">
          <Coins className="w-8 h-8 drop-shadow-md" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Available Credits</p>
            <p className="text-2xl font-black">{auth?.user?.credits || 450}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="bounty" className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-xl mb-4 overflow-x-auto flex w-full justify-start whitespace-nowrap">
              <TabsTrigger value="bounty" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"><Briefcase className="w-4 h-4 mr-2"/>Open Source & Web Jobs</TabsTrigger>
              <TabsTrigger value="ai-roleplay" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"><Bot className="w-4 h-4 mr-2"/>AI Roleplay (Vapi)</TabsTrigger>
              <TabsTrigger value="study-squad" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"><Gamepad2 className="w-4 h-4 mr-2"/>Study Squads Chat</TabsTrigger>
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">Overview</TabsTrigger>
            </TabsList>
            
            {/* EARN AS YOU LEARN (BOUNTIES) WITH SEARCH */}
            <TabsContent value="bounty" className="mt-4">
              <Card className="border-none shadow-xl ring-1 ring-slate-100 bg-white overflow-hidden">
                <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle className="text-2xl font-black text-emerald-800 flex items-center gap-2"><Briefcase className="w-6 h-6"/> Tech Hiring Pipeline</CardTitle>
                      <CardDescription className="max-w-xl text-slate-500 font-medium">Find paid tasks or open-source issues across the web based on your enrolled courses. Contribute code to build a verified public portfolio.</CardDescription>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="Search web jobs (e.g. React)..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-full md:w-64 border-gray-200 bg-white font-bold rounded-xl"
                      />
                    </form>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {bountiesList && bountiesList.length > 0 ? bountiesList.map((job, i) => (
                      <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 border border-gray-200 rounded-2xl hover:border-emerald-300 hover:shadow-lg transition-all bg-white group cursor-default">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${job.type === 'Paid Gig' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                              {job.type}
                            </span>
                            <span className="text-sm font-bold text-gray-500 flex items-center gap-1">🏢 {job.company}</span>
                          </div>
                          <h4 className="text-xl font-black text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors">{job.title}</h4>
                          <div className="flex gap-2 flex-wrap pt-1">
                            {job.tags.map((tag, j) => (
                              <span key={j} className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right flex flex-col md:items-end gap-3 w-full md:w-auto pl-4 border-l border-transparent md:border-gray-100 bg-transparent">
                          <span className="text-xl font-black text-emerald-600">{job.reward}</span>
                          <Button 
                            className="bg-gray-900 hover:bg-emerald-600 text-white font-bold w-full md:w-auto transition-colors shadow-md rounded-xl h-10"
                            onClick={() => window.open(job.url, '_blank')}
                          >
                            Resolve Issue <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
                          </Button>
                        </div>
                      </div>
                    )) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <Search className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-xl font-black text-gray-900 mb-2">No jobs matched</h3>
                        <p className="text-gray-500 max-w-sm">We couldn't find web bounties matching "{searchQuery}". Try searching for other technologies like "Python" or "React".</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI ROLEPLAY SIMULATOR (VAPI) */}
            <TabsContent value="ai-roleplay" className="mt-4 animate-in fade-in zoom-in-95 duration-300">
              <Card className="border border-cyan-200 shadow-xl overflow-hidden bg-white ring-1 ring-cyan-100">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-8 flex items-center gap-5">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-3xl font-black tracking-tight">Vapi AI Interviewer</h2>
                    <p className="text-blue-100 font-medium mt-1 text-sm max-w-xl">Powered by real-time voice intelligence. Practice your soft skills, technical explanations, and negotiation before the real thing drops.</p>
                  </div>
                </div>
                <CardContent className="p-8">
                  {!roleplayActive ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['Strict System Design Architect', 'Angry Freelance Client', 'Y-Combinator Investor'].map((persona, i) => (
                        <div key={i} onClick={() => startVapiCall(persona)} className="border border-slate-200 p-6 rounded-2xl hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center bg-white relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-cyan-400 transition-colors"></div>
                          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full mb-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Mic className="w-8 h-8 text-slate-400 group-hover:text-cyan-600 transition-colors" />
                          </div>
                          <h4 className="font-black text-slate-800 mb-2 leading-tight">{persona}</h4>
                          <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-6">Voice Interactive</p>
                          <Button className="w-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white transition-all font-bold">Initiate Call</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-8 text-center bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="relative">
                        <div className={`w-40 h-40 rounded-full border-4 border-dashed absolute top-0 left-0 ${vapiConnecting ? 'border-amber-400 animate-spin' : 'border-cyan-400 animate-pulse'}`}></div>
                        <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white z-10 relative">
                          <Bot className={`w-16 h-16 ${vapiConnecting ? 'text-amber-500' : 'text-cyan-600'}`} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                          {vapiConnecting ? "Connecting to AI Core..." : "Live Vapi Session"}
                        </h3>
                        <p className={`text-slate-500 font-medium mt-3 text-lg max-w-md mx-auto ${transcript.startsWith('Error') ? 'text-rose-500 font-bold' : ''}`}>
                           {vapiConnecting ? "Establishing WebRTC voice tunnel. Please allow microphone access..." : transcript}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <Button className="bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-500/30 px-8 h-12 rounded-xl text-lg font-black" onClick={endVapiCall}>Terminate Session</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* STUDY SQUADS FEATURE & CHAT UI */}
            <TabsContent value="study-squad" className="mt-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-gradient-to-br from-indigo-700 to-purple-800 p-8 rounded-t-2xl text-white flex justify-between items-center shadow-lg">
                <div>
                  <h2 className="text-3xl font-black mb-1">Alpha Guild: Cohort 42</h2>
                  <p className="text-indigo-200 font-medium">You are in the top 10% of your squad. Keep it up!</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-4xl font-black text-amber-300">Rank #3</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Global Leaderboard</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-x border-b border-gray-200 rounded-b-2xl overflow-hidden bg-white shadow-xl min-h-[500px]">
                {/* Squad Sidebar */}
                <div className="bg-gray-50 border-r border-gray-200 p-6 flex flex-col h-full">
                  <h4 className="flex items-center gap-2 font-black text-gray-900 mb-6 uppercase tracking-tight"><Users className="w-5 h-5 text-indigo-600"/> Squad Roster</h4>
                  <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                    {['Alex M.', 'Sarah K. (You)', 'David O.', 'Nisha T.'].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${i === 1 ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}>{member[0]}</div>
                          <p className="font-bold text-gray-800 text-sm">{member}</p>
                        </div>
                        {i === 1 || i === 0 ? <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> : <div className="text-[10px] font-bold text-gray-400">2h</div>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                      <p className="font-black text-indigo-900 text-sm mb-1">Weekly Guild Quest</p>
                      <div className="w-full bg-indigo-200 rounded-full h-1.5 mb-2"><div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '75%' }}></div></div>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase">75% Complete</p>
                    </div>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="col-span-2 flex flex-col bg-white overflow-hidden relative h-[500px]">
                  {/* Chat Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === (auth?.user?.userName || "You") ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                          msg.sender === "System" ? 'bg-indigo-100/50 text-indigo-900 italic self-center mx-auto text-xs font-medium border border-indigo-100 text-center rounded-full' :
                          msg.sender === (auth?.user?.userName || "You") ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                        }`}>
                          {msg.sender !== "System" && msg.sender !== (auth?.user?.userName || "You") && (
                            <p className="text-[10px] font-black uppercase text-indigo-500 mb-1">{msg.sender}</p>
                          )}
                          <p className={`text-sm ${msg.sender === "System" ? 'text-center' : ''}`}>{msg.text}</p>
                          {msg.sender !== "System" && <p className={`text-[10px] mt-2 font-medium ${msg.sender === (auth?.user?.userName || "You") ? 'text-indigo-200' : 'text-gray-400'}`}>{msg.time}</p>}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  
                  {/* Input Box */}
                  <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] focus-within:bg-indigo-50/20 transition-colors">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <Input 
                        placeholder="Message Alpha Guild..." 
                        value={chatInput} 
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-1 bg-gray-50 border-gray-200 rounded-xl h-12 px-4 focus-visible:ring-indigo-500 font-medium"
                      />
                      <Button type="submit" className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200" disabled={!chatInput.trim()}>
                        <Send className="w-5 h-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* OVERVIEW */}
            <TabsContent value="overview" className="mt-4 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-white border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Credits Earned</CardTitle>
                  </CardHeader>
                  <CardContent><div className="text-2xl font-black">{auth?.user?.credits || 450}</div></CardContent>
                </Card>
                <Card className="bg-white border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Last Activity</CardTitle>
                  </CardHeader>
                  <CardContent><div className="text-lg font-bold">Today</div></CardContent>
                </Card>
              </div>
            </TabsContent>

          </Tabs>
        </div>

        {/* SIDEBAR RIGHT */}
        <div className="space-y-6 hidden lg:block">
          <Card className="bg-gradient-to-br from-gray-900 to-slate-800 text-white border-none shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                Dossier
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-black mb-4 ring-4 ring-indigo-400/30">
                  {auth?.user?.userName?.charAt(0).toUpperCase() || 'S'}
                </div>
                <h3 className="text-xl font-bold">{auth?.user?.userName || 'Student'}</h3>
                <span className="mt-3 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-200">
                  Top 5% Learner
                </span>
              </div>
              <div className="pt-4 border-t border-slate-700 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Level</span>
                  <span className="font-white font-black text-amber-400 drop-shadow-md">PRO SCHOLAR</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 shadow-inner">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-1.5 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]" style={{ width: '85%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/80 shadow-lg ring-1 ring-emerald-200/50">
            <CardHeader className="pb-3 border-b border-emerald-100 border-dashed">
              <CardTitle className="text-emerald-900 text-sm font-black uppercase tracking-widest flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Live Pulse</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-emerald-800 space-y-4 font-medium">
              <p className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-700"/></span> <b>3</b> Bounties Resloved</p>
              <p className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-cyan-200 flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-cyan-700"/></span> <b>92%</b> Vapi Persona Score</p>
              <p className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center"><Trophy className="w-3.5 h-3.5 text-indigo-700"/></span> <b>12</b> Squad Quests Won</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentCRMPage;
