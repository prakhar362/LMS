import { UsersRound,MonitorPlay,AlarmClockCheck,Percent} from "lucide-react";
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


    return (
        <>
         <div className="grid grid-cols-2 gap-1 mt-10 sm:grid-cols-4 sm:w-full sm:gap-2  sm:-mt-20">
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
    <h3 className="ml-6 sm:ml-4 sm:mt-2">100% Satisfaction</h3>
  </div>
</div>

<section className="course-category-3 section-padding">
  <div className="container">
    {/* Section Heading */}
    <div className="row mb-10 justify-center">
      <div className="col-xl-8">
        <div className="section-heading text-center">
          <h2 className="font-lg">Categories you want to learn</h2>
          <p>Aenean eu leo quam. Pellentesque ornare sem lacinia quam</p>
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




        
        </>
    )
}

export default body;