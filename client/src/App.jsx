import { useState } from 'react'
import { useContext } from "react";
import './App.css'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth'
import RouteGuard from './components/route-gaurd'
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home/index";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from './pages/instructor/add-new-course';



function App() {
  const [count, setCount] = useState(0)
  const {auth} =useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<AuthPage />} />
        <Route path="home" element={<StudentHomePage />} />
        

        
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      
    </Routes>
  )
}

export default App
