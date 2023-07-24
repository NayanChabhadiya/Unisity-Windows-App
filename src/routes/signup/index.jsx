import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { createOrg } from "../../store/ApiSlice/orgSlice";
import { useDispatch } from "react-redux";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  const handleSignup = () => {
    console.log("logs", inputs);
    if (!inputs?.name?.trim()) {
      toast.error("Please enter organization name");
    } else if (!inputs?.ownerName?.trim()) {
      toast.error("Please enter owner name");
    } else if (!inputs?.email?.trim()) {
      toast.error("Please enter email");
    } else if (!inputs?.addressLine?.trim()) {
      toast.error("Please enter address");
    } else if (!inputs?.city?.trim()) {
      toast.error("Please enter city");
    } else if (!inputs?.contact?.trim()) {
      toast.error("Please enter contact");
    } else if (!inputs?.state?.trim()) {
      toast.error("Please enter state");
    } else if (!inputs?.country?.trim()) {
      toast.error("Please enter country");
    } else if (!inputs?.passwordHash?.trim()) {
      toast.error("Please enter password");
    } else if (!inputs?.confirmPassword?.trim()) {
      toast.error("Please enter confirm password");
    } else if (inputs.passwordHash !== inputs.confirmPassword) {
      toast.error("Password and confirm password does not match");
    } else {
      const data = { ...inputs, roleId: "648f4f078d6406402a675665" };
      dispatch(createOrg(data)).then((res) => {
        setTimeout(() => {
          toast.success("Organization Registration Successful");
        }, 1000);
        navigate("/login");
      });
    }
  };
  return (
    <div>
      <Toaster />
      <div className="login_box">
        {/* <Org style={{ fill: "#67b2fe", height: "60px", marginTop: "40px" }} /> */}
        <div className="login_text">
          Welcome to Unisity. Please signup to continue.
        </div>
        <div className="form_box">
          <div className="input_box">
            <input
              placeholder="Organization Name"
              value={inputs.name}
              name="name"
              type="text"
              onChange={(e) => {
                setInputs({ ...inputs, name: e.target.value });
              }}
            />
            <input
              placeholder="Owner Name"
              name="ownerName"
              value={inputs.ownerName}
              type="text"
              onChange={(e) => {
                setInputs({ ...inputs, ownerName: e.target.value });
              }}
            />
            <input
              placeholder="E-mail Address"
              type="email"
              name="email"
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value });
              }}
            />
            <input
              placeholder="Address "
              name="addressLine"
              value={inputs.addressLine}
              type="text"
              onChange={(e) => {
                setInputs({ ...inputs, addressLine: e.target.value });
              }}
            />
            <input
              placeholder="City"
              name="city"
              value={inputs.city}
              type="text"
              onChange={(e) => {
                setInputs({ ...inputs, city: e.target.value });
              }}
            />
            <input
              placeholder="Pin-Code"
              value={inputs.contact}
              name="contact"
              type="number"
              onChange={(e) => {
                setInputs({ ...inputs, contact: e.target.value });
              }}
            />
            <input
              placeholder="State"
              name="state"
              type="text"
              value={inputs.state}
              onChange={(e) => {
                setInputs({ ...inputs, state: e.target.value });
              }}
            />
            <input
              placeholder="Country"
              name="country"
              type="text"
              value={inputs.country}
              onChange={(e) => {
                setInputs({ ...inputs, country: e.target.value });
              }}
            />
            <input
              placeholder="Password"
              name="passwordHash"
              value={inputs.passwordHash}
              type="password"
              onChange={(e) => {
                setInputs({ ...inputs, passwordHash: e.target.value });
              }}
            />
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              type="password"
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
            />
          </div>
          <button
            className="btn_login"
            onClick={() => {
              handleSignup();
            }}
          >
            Register
          </button>
          <div className="for_signup">
            Already have an account ?{" "}
            <span
              className="span_login"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
