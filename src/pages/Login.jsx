import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Academic Planning System</h1>

        <div className="auth-logo">Logo</div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required/>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required/>
          </div>

          <div className="auth-links">
            <p>
              New User? <Link to="/signup">Create Account</Link>
            </p>

            <Link to="/forgot-password">Forgot password</Link>
          </div>

          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;