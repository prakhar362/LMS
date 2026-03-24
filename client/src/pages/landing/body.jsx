import { UsersRound, MonitorPlay, AlarmClockCheck, Percent, MessageSquareQuote, Star, ArrowRight, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, CheckCircle2, Code2, Briefcase, Layers, Camera, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Body() {
  const categories = [
    {
      icon: Code2,
      title: "Development",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
      hoverShadow: "hover:shadow-red-500/10",
      hoverBorder: "hover:border-red-200"
    },
    {
      icon: Briefcase,
      title: "Business",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      hoverShadow: "hover:shadow-blue-500/10",
      hoverBorder: "hover:border-blue-200"
    },
    {
      icon: Layers,
      title: "3D & Animation",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      hoverShadow: "hover:shadow-green-500/10",
      hoverBorder: "hover:border-green-200"
    },
    {
      icon: Camera,
      title: "Photography",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-100",
      hoverShadow: "hover:shadow-yellow-500/10",
      hoverBorder: "hover:border-yellow-200"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      hoverShadow: "hover:shadow-indigo-500/10",
      hoverBorder: "hover:border-indigo-200"
    },
  ];

  const popularCourses = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPicyF-MqXaGIENqsyHFoM__y7XUAmCLRPlg&s",
      title: "Full Stack Development",
      instructor: "Dr. Angela Yu",
      rating: 4.9,
      students: "12k+",
      badge: "Bestseller",
      price: "₹499",
    },
    {
      img: "https://img-c.udemycdn.com/course/750x422/1318112_faa8_5.jpg",
      title: "Mastering Data Science",
      instructor: "Andrei Neogie",
      rating: 4.8,
      students: "8k+",
      badge: "Trending",
      price: "₹599",
    },
    {
      img: "https://i.ytimg.com/vi/BU_afT-aIn0/maxresdefault.jpg",
      title: "UX/UI Masterclass 2024",
      instructor: "Harsh Sharma",
      rating: 4.7,
      students: "15k+",
      badge: "Popular",
      price: "₹449",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd6HN9RS6IIyGsmSDYh2lshRmN4braOgrDfQ&s",
      title: "The Ultimate DevOps Guide",
      instructor: "Harkirat Singh",
      rating: 4.9,
      students: "10k+",
      badge: "Bestseller",
      price: "₹699",
    },
  ];

  const instructors = [
    {
      img: "https://pbs.twimg.com/profile_images/1523987597751726081/XuQeo7gC_400x400.jpg",
      name: "Dr. Angela Yu",
      title: "Senior Web Developer",
      count: "25+ Courses",
    },
    {
      img: "https://images.ctfassets.net/aq13lwl6616q/3jyqzyDMgKDqWLua869Q0Z/d185d9d4cf2aaff0266601aca7e4a074/Instructor_Profiles__7_.jpg?w=300&h=300&fl=progressive&q=50&fm=jpg&bg=transparent",
      name: "Andrei Neogie",
      title: "Data Science Lead",
      count: "18+ Courses",
    },
    {
      img: "https://media.gettyimages.com/id/1483989790/photo/adult-indian-male-yoga-instructor-smiling-at-the-camera-and-holding-a-yoga-mat-under-his-arm.jpg?s=612x612&w=gi&k=20&c=IRIxj_RS_e7Zy2cbidjg3L5oXYm7n79tNArHmyOHdjM=",
      name: "Harsh Sharma",
      title: "UI/UX Specialist",
      count: "12+ Courses",
    },
    {
      img: "https://media.istockphoto.com/id/2160473960/photo/happy-satisfied-math-teacher-in-elementary-class.jpg?s=612x612&w=0&k=20&c=zaosJRQ0l2dBIjy-DLc5wAFdONtg-_78Q-FIzxjjIoo=",
      name: "Harkirat Singh",
      title: "DevOps Engineer",
      count: "20+ Courses",
    },
  ];

  const testimonials = [
    {
      feedback: "This platform has transformed the way I learn. The courses are easy to follow, and instructors are top-notch!",
      name: "Sarah Connor",
      position: "Full Stack Student",
    },
    {
      feedback: "The real-world projects helped me gain the confidence I needed to land my first job at a top tech firm.",
      name: "Mark Robinson",
      position: "Junior Developer",
    },
    {
      feedback: "Best educational investment I've made. The 1:1 mentorship and credit system make it truly unique.",
      name: "Laura Smith",
      position: "Product Designer",
    },
  ];

  return (
    <div className="bg-white">
      {/* Stats Section */}
      <div className="container mx-auto px-4 mt-[-4rem] relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: UsersRound, label: "150,000+ Students", color: "text-amber-500", bg: "bg-amber-50" },
            { icon: MonitorPlay, label: "2,500+ Courses", color: "text-rose-500", bg: "bg-rose-50" },
            { icon: AlarmClockCheck, label: "Lifetime Access", color: "text-emerald-500", bg: "bg-emerald-50" },
            { icon: CheckCircle2, label: "Expert Support", color: "text-indigo-500", bg: "bg-indigo-50" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} p-6 rounded-2xl flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4 shadow-sm border border-white hover:shadow-md transition-all duration-300`}>
              <stat.icon className={`${stat.color} w-10 h-10`} />
              <h3 className="font-bold text-gray-800 text-lg leading-tight">{stat.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-24" id="categories">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Categories You Want to Learn</h2>
            <p className="text-slate-500 text-lg">
              Explore a wide range of topics tailored to your interests. Start your learning journey with expert-guided courses.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className={`group bg-white border ${cat.borderColor} p-8 rounded-[2.5rem] text-center ${cat.hoverBorder} hover:shadow-2xl ${cat.hoverShadow} transition-all duration-500 cursor-pointer`}
              >
                <div className={`${cat.bgColor} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white/50`}>
                  <cat.icon className={`${cat.color} w-10 h-10`} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-slate-800 group-hover:text-slate-900 transition-colors uppercase tracking-[0.15em] text-xs leading-relaxed">{cat.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-24 bg-slate-50/50" id="courses">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-indigo-600 font-black uppercase tracking-widest text-xs px-3 py-1 bg-indigo-50 rounded-full mb-4 inline-block">Popular Choice</span>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Explore Popular Courses</h2>
              <p className="text-slate-500 font-medium">Curation of our most sought-after modules designed for market-ready skills.</p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="rounded-full px-8 py-6 border-slate-200 hover:bg-white hover:text-indigo-600 font-bold transition-all">View All Courses</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCourses.map((course, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group">
                <div className="relative overflow-hidden h-48">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-indigo-600 shadow-sm">{course.badge}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-black text-slate-900">{course.rating}</span>
                    <span className="text-xs text-slate-400 font-bold">({course.students})</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                  <p className="text-xs font-bold text-slate-400 mb-4">By {course.instructor}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xl font-black text-indigo-600">{course.price}</span>
                    <Link to="/auth">
                      <Button size="sm" className="bg-slate-900 hover:bg-indigo-600 rounded-full text-xs font-black">Join Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-24" id="instructors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Top Rated Instructors</h2>
            <p className="text-slate-500 font-medium">Learn from the experts who have real-world industry experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((ins, i) => (
              <div key={i} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <img src={ins.img} alt={ins.name} className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{ins.name}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 mb-2">{ins.title}</p>
                <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-3 py-1 rounded-full">{ins.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50/50" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Student Testimonials</h2>
            <p className="text-slate-500 font-medium italic">"Real stories from our global learning community"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative hover:shadow-xl transition-all duration-300">
                <MessageSquareQuote className="absolute top-8 right-8 text-indigo-50 w-12 h-12" />
                <div className="flex gap-1 mb-6 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-slate-600 font-medium mb-8 leading-relaxed italic">"{t.feedback}"</p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xs uppercase">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-sm leading-none">{t.name}</h5>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{t.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="container mx-auto px-4 relative z-20 mt-[-2rem]">
        <div className="bg-indigo-600 rounded-[3rem] p-12 overflow-hidden relative shadow-2xl shadow-indigo-500/20">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <MonitorPlay size={200} className="text-white" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
            <div>
              <span className="text-indigo-200 font-black uppercase tracking-widest text-xs mb-4 block">New Courses Added</span>
              <h3 className="text-4xl font-black text-white leading-tight mb-6">Want to know special offers & updates?</h3>
              <p className="text-indigo-100 text-lg font-medium">Join 50,000+ learners who receive our weekly curated learning insights.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-2 rounded-[2rem] backdrop-blur-md border border-white/20">
              <input type="email" placeholder="Your Email Address" className="flex-1 bg-transparent px-6 py-4 text-white placeholder-indigo-200 font-bold outline-none" />
              <Link to="/auth">
                <Button className="bg-white text-indigo-600 hover:bg-slate-50 rounded-2xl px-10 py-7 font-black text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / About Section */}
      <footer className="bg-[#fafbff] text-slate-900 pt-32 pb-12" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src="https://cdn-icons-png.flaticon.com/512/8521/8521795.png" alt="Logo" className="w-10 h-10" />
                <span className="text-2xl font-black tracking-tighter text-slate-900">CourseConvo</span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                Empowering learners worldwide through accessible, premium education. Our platform bridges the gap between ambition and high-tier industry achievement.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-black text-slate-900 text-lg mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {["Explore Courses", "Expert Instructors", "Mentorship", "Special Offers", "Community"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-500 font-bold hover:text-indigo-600 transition-colors flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all font-black" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-900 text-lg mb-8">Support Center</h4>
              <ul className="space-y-4">
                {["Help Documentation", "Privacy Policy", "Terms of Service", "Student Support", "Partner Program"].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-500 font-bold hover:text-indigo-600 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-900 text-lg mb-8">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-slate-500 font-medium text-sm">123 Fifth Floor, West-Point,<br />Mumbai, Maharashtra, IN</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-slate-500 font-bold text-sm">+91-555-0123-4567</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-slate-500 font-bold text-sm">support@courseconvo.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-12 text-center">
            <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">
              © 2024 CourseConvo Education Platform. All Digital Assets Protected.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Body;