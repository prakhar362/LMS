import { UsersRound,MonitorPlay,AlarmClockCheck,Percent} from "lucide-react";
function body()
{
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

        
        </>
    )
}

export default body;