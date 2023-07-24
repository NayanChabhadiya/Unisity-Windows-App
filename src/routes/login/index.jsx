import "./login.css";
// import { ReactComponent as Finger } from "../../assets/images/finger.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logIn, setUser } from "../../store/ApiSlice/authSlice";
import { useDispatch } from "react-redux";
import { useKey } from "../../helpers/enterLogin";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  const roles = ["Admin", "Organization", "Encharge", "Faculty", "Student"];

  const loginChangeData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const logInUser = () => {
    dispatch(logIn(loginData)).then((res) => {
      if (res.payload.data.success === true) {
        toast.success("Welcome to Dashboard");
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
    });
    // const data = { ...loginData };.payload.data.success
    // dispatch(setUser(data));
  };
  useKey("Enter", logInUser);

  return (
    <div>
      <Toaster />
      <div className="login_box">
        {/* <Finger style={{ fill: "#67b2fe", width: "60px", marginTop: "40px" }} /> */}
        <div className="login_text">
          Login with your organization email and password.
        </div>
        <div className="form_box">
          <div className="input_box">
            <input
              placeholder="E-mail Address"
              type="email"
              name="email"
              value={loginData.email}
              onChange={(e) => {
                loginChangeData(e);
              }}
            />
            <input
              placeholder="Password"
              value={loginData.password}
              type="password"
              name="password"
              onChange={(e) => {
                loginChangeData(e);
              }}
            />
          </div>
          <button
            className="btn_login"
            onClick={() => {
              logInUser();
            }}
          >
            Log In
          </button>
          <div className="for_signup">
            Don't have an account ?{" "}
            <span
              className="span_login"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </span>
          </div>
          <div className="for_signup">
            <span
              className="span_login"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Forgot Password ?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
