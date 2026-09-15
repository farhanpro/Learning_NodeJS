import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [toggleSingup, setToggleSingup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setShowErrorPopup(false);
    try {
      const resp = await axios.post(
        `${BASE_URL}/login`,
        { emailId: email, password: password },
        { withCredentials: true }
      );
      dispatch(addUser(resp.data.user));
      return navigate("/feed");
    } catch (err) {
      setError("Invalid login ID and password");
      setShowErrorPopup(true);
    }
  };

  const handleSingup = async (e)=>{
    e.preventDefault();
    try{
        const resp = await axios.post(`${BASE_URL}/signup`,
          {
            firstName:firstName,
            lastName:lastName,
            emailId:email,
            password:password
          },{withCredentials:true})
          console.log("Response",resp);
          dispatch(addUser(resp.data.user));
          return navigate("/profile")

    }
    catch(err){
      console.log("Error While Handling the Singup",err)
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend">Login options</legend>
            <label className="label">
              <input
                type="checkbox"
                defaultChecked
                className="toggle"
                onClick={() => setToggleSingup(!toggleSingup)}
              />
              Singup/Login
            </label>
          </fieldset>
          <h2 className="card-title justify-center">
            {toggleSingup ? `Singup` : `Login`}
          </h2>

          <form onSubmit={toggleSingup ?handleSingup: handleLogin}>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">Enter valid email address</p>
            </fieldset>

            {toggleSingup && (
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend"> First Name</legend>
                <label className="input validator w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="text"
                    placeholder="First Name"
                    required={toggleSingup}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <legend className="fieldset-legend"> Last Name</legend>
                <label className="input validator w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="text"
                    placeholder="Last Name"
                    required={toggleSingup}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </fieldset>
            )}

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </fieldset>

            <div className="card-actions justify-center m-2">
              <button type="submit" className="btn btn-primary">
                {toggleSingup ? "Signup" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showErrorPopup && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold text-error">Login failed</h3>
            <p className="py-4">{error || "Invalid login ID and password"}</p>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowErrorPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type="button" onClick={() => setShowErrorPopup(false)}>
              close
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Login;
