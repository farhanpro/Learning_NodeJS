import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {removeFeed} from "../utils/feedSlice";
import {useDispatch} from "react-redux";
import { useState } from "react";

const FALLBACK_PHOTO ="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=800&auto=format&fit=crop";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  const [showErr,setShowErr] = useState(false);
  const [err,setErr] = useState("");
  const handleRequest = async (status,userId)=>{
    try{
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{}, { withCredentials: true });
      dispatch(removeFeed(userId));
    }
    catch(err){
      console.log("Error in sending request",err);
      setShowErr(true);
      setErr(err);
    }
  }
  if (!user) return null;

  const meta = [user.age && `${user.age} yrs`, user.gender].filter(Boolean).join(" · ");

  return (
    <div className="card mx-auto w-full max-w-96 overflow-hidden bg-base-100 shadow-xl">
      <figure className="h-72 bg-base-300 sm:h-80">
        <img
          src={user.photoUrl || FALLBACK_PHOTO}
          alt={user.firstName || "User"}
          className="h-full w-full object-cover object-top"
        />
      </figure>
      {showErr &&  


      <div className="modal" id="my-modal-2" popover="auto">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Error </h3>
          <p className="py-4">{err}</p>
        </div>
        <div className="modal-backdrop">
          <button popoverTarget="my-modal-2" popoverTargetAction="hide" onClick={setShowErr(!showErr)}>Okay</button>
        </div>
      </div>

      }
      <div className="card-body">
        <h2 className="card-title capitalize">
          {user.firstName} {user.lastName}
        </h2>
        {meta && (
          <p className="text-sm capitalize text-base-content/60">{meta}</p>
        )}
        <p className="text-sm leading-relaxed">{user.about}</p>
        {user.skills?.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span key={skill} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        )}
        {showActions && (
          <div className="card-actions mt-4 justify-evenly">
            <button type="button" className="btn btn-primary" onClick={()=>handleRequest("ignored",user._id)}>
              Not Intrested
            </button>
            <button type="button" className="btn btn-secondary" onClick={()=>handleRequest("interested",user._id)}>
              Intrested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
