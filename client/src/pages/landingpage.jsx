// src/pages/LandingPage.js
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to Our Learning Management System</h1>
      <div className="buttons">
        <Link to="/auth">
          <button>Login</button>
        </Link>
        <Link to="/auth">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
