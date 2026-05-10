import { Link, useNavigate} from "react-router-dom";
import "../styles/auth.css";
import { IoArrowBackOutline } from "react-icons/io5";

function Forgotpw() {
    const navigate = useNavigate(); 

    const handleSignup = (e) => {
        e.preventDefault();
        navigate("/");
    };
    
    return (
        <main className="auth-page">
            <section className="auth-card">
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                >
                    <IoArrowBackOutline/>
                </button>
                <h1 className="auth-title">Reset Password</h1>
                
                <div className="auth-logo">Logo</div>

                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="auth-field">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" name="email" required />
                        
                    </div>

                    <button type="submit" className="auth-button reset-button">
                        Send Password Reset Link
                    </button>

                </form>
            </section>
        </main>
    )
}


export default Forgotpw;