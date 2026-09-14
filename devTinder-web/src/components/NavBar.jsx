import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { removeConnections } from "../utils/connectionSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("user in navbar", user);
  const navigate = useNavigate();

  const handleLogout =  async ()=>{
    try{
      const resp = await  axios.post(`${BASE_URL}/logout`,{}, { withCredentials: true });
      if(resp.status === 200){
        dispatch(removeUser());
        dispatch(removeConnections());
        dispatch(removeFeed());
        return navigate("/login");
      }

    }
    catch(err){
      console.log("Error in logout",err);
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" > <Link to="/feed">👩‍💻DevTinder👨‍💻</Link></a>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <input type="text" placeholder="Search" className="input w-24 md:w-auto" />
        <p>Welcome {user.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt={user.firstName || "User profile"}
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/connection-requests" className="justify-between">
                  Connection Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout} className="justify-between">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar