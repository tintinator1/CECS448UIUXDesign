import { Link, useNavigate} from "react-router-dom";
import "../styles/auth.css";

function Signup() {
    const navigate = useNavigate(); 

    const handleSignup = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };
    
    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1 className="auth-title">Create an Account</h1>
                
                <div className="auth-logo">Logo</div>

                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="auth-field">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" name="email" />
                        
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password"/>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="name">Your name</label>
                        <input id="name" type="text" name="name"/>
                    </div>

                    <button type="submit" className="auth-button">
                        Create Account
                    </button>

                    <p className="auth-bottom-text">
                        Already have an Account? <Link to="/">Login</Link>
                    </p>
                </form>
            </section>
        </main>
    )
}


export default Signup;