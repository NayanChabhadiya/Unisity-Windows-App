import NoAuthRoutes from "../routes/NoAuthRoutes";
import "../styles/NoAuthTheme.css";
import LoginImage from "../assets/images/login.gif";

const NoAuthTheme = () => {
  return (
    <div className="no_auth_theme">
      <div className="auth_sections">
        <div className="section left_section">
          <div className="login_header">UNISITY</div>
          <img alt="Login" className="login_image" src={LoginImage} />
        </div>
        <div className="section right_section">
          <NoAuthRoutes />{" "}
        </div>
      </div>
    </div>
  );
};

export default NoAuthTheme;
