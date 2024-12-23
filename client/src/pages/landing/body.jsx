import { UsersRound } from "lucide-react";
function body()
{
    return (
        <>
         <div className="grid grid-cols-3 w-full -mt-20 gap-2 mx-3 sm:w-full sm:mt-10">
            <div className="bg-slate-200 flex-2 text-center p-5 text-2xl font-medium w-full min-h-24 md:flex-1 sm:w-full"> 
            <UsersRound color="#e5d843" className="min-w-24 min-h-24" />
                150+ students</div>
            <div className="bg-slate-200  flex-1 text-center p-4 text-2xl font-medium  w-full min-h-24 md:flex-1 sm:w-full">
                20+ courses</div>
            <div className="bg-slate-200  flex-1 text-center  text-2xl p-4 font-medium w-full min-h-24 md:flex-1 sm:w-full">
                10 mins average time</div>
        </div>
        
        </>
    )
}

export default body;