import { UsersRound,MonitorPlay,AlarmClockCheck,Percent,MessageSquareQuote} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


function body()
{
    const categories = [
        {
          img: "https://bestwpware.com/themes-wp/edumel/wp-content/uploads/2023/09/icon5.png",
          title: "3D & Animation",
          bgColor: "bg-pink-600",
        },
        {
          img: "https://bestwpware.com/themes-wp/edumel/wp-content/uploads/2023/09/icon4.png",
          title: "Business",
          bgColor: "bg-blue-400",
        },
        {
          img: "https://bestwpware.com/themes-wp/edumel/wp-content/uploads/2023/09/icon3.png",
          title: "Development",
          bgColor: "bg-blue-600",
        },
        {
          img: "https://bestwpware.com/themes-wp/edumel/wp-content/uploads/2023/09/icon1.png",
          title: "DSLR",
          bgColor: "bg-purple-600",
        },
        {
          img: "https://www.shutterstock.com/image-vector/angled-paint-brush-vector-outline-600nw-1393937054.jpg",
          title: "Graphic Design",
          bgColor: "bg-red-600",
        },
      ];
      // Data for Popular Courses
const popularCourses = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPicyF-MqXaGIENqsyHFoM__y7XUAmCLRPlg&s", // Replace with actual course image URLs
    title: "Web Development Bootcamp",
    description: "Learn to build modern websites with HTML, CSS, and JavaScript.",
  },
  {
    img: "https://img-c.udemycdn.com/course/750x422/1318112_faa8_5.jpg",
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning.",
  },
  {
    img: "https://i.ytimg.com/vi/BU_afT-aIn0/maxresdefault.jpg",
    title: "UI/UX Design Fundamentals",
    description: "Understand the principles of user-centric design.",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd6HN9RS6IIyGsmSDYh2lshRmN4braOgrDfQ&s",
    title: "100xDevs Cohort 3.0",
    description: "Become a MERN stack developer with hands-on projects along with indepth knowlege in DevOps",
  },
];

// Data for Top Rated Instructors
const instructors = [
  {
    img: "https://pbs.twimg.com/profile_images/1523987597751726081/XuQeo7gC_400x400.jpg", // Replace with actual instructor profile images
    name: " Dr.Angela Yu",
    title: "Senior Web Developer Instructor",
  },
  {
    img: "https://images.ctfassets.net/aq13lwl6616q/3jyqzyDMgKDqWLua869Q0Z/d185d9d4cf2aaff0266601aca7e4a074/Instructor_Profiles__7_.jpg?w=300&h=300&fl=progressive&q=50&fm=jpg&bg=transparent",
    name: "Andrei Neogie",
    title: "Data Scientist Python Developer",
  },
  {
    img: "https://pbs.twimg.com/profile_images/1854982337412444160/lozow_bh_400x400.jpg",
    name: "Harsh Sharma",
    title: "UI/UX Designer",
  },
  {
    img: "https://yt3.googleusercontent.com/MeY_fGNrjVLV0PVOBN7dRWzMBS0y41YGm55LOaJ02cXV82a7Np9pYxxhHFqdYdncEy1I2cYR=s900-c-k-c0x00ffffff-no-rj",
    name: "Harkirat Singh",
    title: "Software Engineer",
  },
];

// Data for Testimonials
const testimonials = [
  {
    feedback:
      "This platform has transformed the way I learn. The courses are easy to follow, and the instructors are amazing!",
    name: "Sarah Connor",
    position: "Student",
  },
  {
    feedback:
      "The resources provided here helped me land my first job as a web developer. Highly recommend!",
    name: "Mark Robinson",
    position: "Junior Developer",
  },
  {
    feedback:
      "I loved the variety of courses available and the real-world projects that helped me gain confidence.",
    name: "Laura Smith",
    position: "UI/UX Designer",
  },
];


    return (
        <>
         <div className="grid grid-cols-2 gap-1 mt-10 sm:grid-cols-4 sm:w-full sm:gap-2  sm:-mt-18" id='features'>
  {/* Card 1 */}
  <div className="bg-slate-100 flex items-center justify-center p-5 text-2xl font-medium w-full min-h-24 rounded-md md:flex-row sm:flex-col">
    <UsersRound color="#e5d843" size={64} />
    <h3 className="ml-6 sm:ml-4 sm:mt-2">150+ students</h3>
  </div>

  {/* Card 2 */}
  <div className="bg-slate-100 flex items-center justify-center p-5 text-2xl font-medium w-full min-h-24  rounded-md md:flex-row sm:flex-col">
    <MonitorPlay color="#e94007" size={64} />
    <h3 className="ml-6 sm:ml-4 sm:mt-1">20+ courses</h3>
  </div>

  {/* Card 3 */}
  <div className="bg-slate-100 flex items-center justify-center p-5 text-2xl font-medium w-full min-h-24 rounded-md md:flex-row sm:flex-col">
    <AlarmClockCheck color="#51b0bd" size={64} />
    <h3 className="ml-6 sm:ml-4 sm:mt-2">10 mins time</h3>
  </div>

  {/* Card 4 */}
  <div className="bg-slate-100 flex items-center justify-center p-5 text-2xl font-medium w-full min-h-24  rounded-md md:flex-row sm:flex-col">
    <Percent color="#cf7dc4" size={64} />
    <h3 className="ml-6 sm:ml-4 sm:mt-2">100% Support</h3>
  </div>
</div>

<section className="course-category-3 section-padding" id='Products'>
  <div className="container">

    {/* Section Heading */}
    <div className="row mb-10 justify-center mt-4">
    <div className="flex justify-center items-center mt-44 px-4 sm:px-6 lg:px-10 sm:ml-20">
  <div className="section-heading text-center max-w-2xl ml-3">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl  font-bold mb-4 sm:ml-36">
      Categories You Want to Learn
    </h2>
    <p className="text-base sm:text-lg lg:text-xl text-gray-600 sm:ml-28">
      Explore a wide range of topics tailored to your interests. Start your learning journey with expert-guided courses designed to help you grow and excel.
    </p>
  </div>
</div>
    </div>

    {/* Course Categories */}
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-5 sm:ml-40 ">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`${category.bgColor} group hover:bg-white shadow-md rounded-lg p-4 text-center flex flex-col items-center transition duration-300 ease-in-out h-60 `}
        >
          <div className="bg-slate-50 mt-7 p-3 rounded-full transition hover:bg-slate-300 w-20 h-20">
            <img
              src={category.img}
              alt={category.title}
              className="w-18 h-18 p-2"
            />
          </div>
          <h4 className="font-medium text-lg mt-3 text-white group-hover:text-black">{category.title}</h4>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-gray-200 mt-8">
  {/* Popular Courses Section */}
  <div className="container mx-auto mb-16 px-4 rounded-sm ">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Popular Courses</h2>
      <p className="text-black text-lg">
        Explore our most sought-after courses curated to enhance your skills and knowledge.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {popularCourses.map((course, index) => (
        <div
          key={index}
          className="bg-white shadow-sm rounded-sm p-4 hover:shadow-2xl transition w-full"
        >
          <img
            src={course.img}
            alt={course.title}
            className="w-full h-36 object-cover mb-4 rounded"
          />
          <h4 className="text-xl font-semibold">{course.title}</h4>
          <p className="text-gray-700 text-sm mt-2">{course.description}</p>
        </div>
      ))}
    </div>
  </div>
  </section>


<section>
  {/* Top Rated Instructors Section */}
  <div className="container mx-auto mb-16 px-4 mt-8" id='instructors'>
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Top Rated Instructors</h2>
      <p className="text-gray-600 text-lg">
        Learn from industry experts who are passionate about teaching.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {instructors.map((instructor, index) => (
        <div
          key={index}
          className="bg-white shadow-sm rounded-lg p-6 text-center hover:shadow-2xl transition"
        >
          <img
            src={instructor.img}
            alt={instructor.name}
            className="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h4 className="text-xl font-semibold">{instructor.name}</h4>
          <p className="text-gray-500 text-sm mt-2">{instructor.title}</p>
        </div>
      ))}
    </div>
  </div>
  </section>
  <section className="relative">
  {/* Testimonials Section */}
  <div className="container min-w-full px-4 pb-20 bg-gray-200 relative" id='Testimonials'>
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 py-4 text-slate-800">Testimonials</h2>
      <p className="text-gray-600 text-lg">
        Hear what our learners have to say about their experiences.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
        >
          <MessageSquareQuote size={48} color="#59075f" />
          <p className="text-gray-700 text-sm mb-4">"{testimonial.feedback}"</p>
          <h4 className="text-xl font-semibold">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.position}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Purple Divider */}
  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-10 w-3/4 bg-white rounded-lg z-10 text-black text-center flex flex-col items-center justify-center p-4 sm:p-2 sm:w-[90%] sm:text-sm lg:text-lg lg:w-2/4">
  <img 
    src="https://bestwpware.com/themes-wp/edumel/wp-content/uploads/2023/09/img_9.png" 
    alt="Not Sure Where to Start"  
    className="h-28 sm:h-14 lg:h-22 mb-2"
  />
  <p className="text-red-500">Not Sure Where to Start in Your Career</p>
  <h3 className="text-3xl font-semibold text-blue-800">Want to know Special Offers & Updates of new courses?</h3>
  <Link to='/auth'>
  <Button className="flex items-center text-sm font-bold bg-red-500 text-white hover:text-blue-950 hover:bg-blue-300 transition duration-300 mt-3">Check Now</Button>
  </Link>
  
</div>


<section className="container min-w-full px-4 pt-20 mt-0 py-15 bg-blue-950 text-white relative" id='About'>
      <div className="text-center mt-10">
        <h2 className="text-3xl sm:text-4xl font-bold mt-7 py-20">Know More About Us</h2>
        <p className="text-gray-300 text-lg">
          Learn more about our mission, vision, and the values that drive us to provide the best educational experience.
        </p>
      </div>

      {/* About Us Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg  text-white bg-blue-950">
          <h3 className="text-2xl font-bold text-white mb-4">About Us</h3>
          <p className="text-lg">
            At our platform, we believe in empowering learners worldwide by providing access to top-notch courses and guidance from experienced instructors. Our goal is to bridge the gap between ambition and achievement by offering a comprehensive learning ecosystem.
          </p>
        </div>

        {/* Contact Us */}
        <div className="p-6 rounded-lg  text-white bg-blue-950">
          <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-lg">
            <strong>Phone:</strong> +91-327-8534 <br />
            <strong>Email:</strong> support@edumel.com <br />
            <strong>Address:</strong> 123 Fifth Floor west-point,Mumbai.
          </p>
        </div>

        {/* Services & Links */}
        <div className="p-6 rounded-lg text-white bg-blue-950">
          <h3 className="text-2xl font-bold text-white mb-4">Our Services</h3>
          <ul className="list-disc pl-5">
            <li>SEO Business</li>
            <li>Digital Marketing</li>
            <li>Graphic Design</li>
            <li>Social Marketing</li>
          </ul>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-bold text-blue-950 mb-4">Quick Links</h3>
        <div className="flex justify-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white">Explore</a>
          <a href="#" className="text-gray-300 hover:text-white">About Us</a>
          <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
          <a href="#" className="text-gray-300 hover:text-white">Services</a>
          <a href="#" className="text-gray-300 hover:text-white">Support</a>
           <a href="#" className="text-gray-300 hover:text-white">News & Blogs</a>
          <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-white">Return Policy</a>
        </div>
      </div>

      {/* News & Policies Links */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-bold text-blue-950 mb-4">Policies</h3>
        <div className="flex justify-center space-x-8">
         
        </div>
      </div>
    </section>
</section>



        
</>
    )
}

export default body;