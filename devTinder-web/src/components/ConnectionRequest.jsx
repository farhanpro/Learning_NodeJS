import {useEffect,useState} from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnectionRequest } from '../utils/connectionRequestSlice';


const FALLBACK_PHOTO = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=800&auto=format&fit=crop";


function ConnectionRequest() {
  const dispatch = useDispatch();
  const rawConnectionRequests = useSelector((store) => store.connectionRequest);
  const connectionRequests = Array.isArray(rawConnectionRequests) ? rawConnectionRequests.filter(Boolean) : [];
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  const fetchConnectionRequests = async ()=>{
    try{
      const resp = await axios.get(`${BASE_URL}/user/connection-requests`,{withCredentials:true});
      console.log("Connection Requests",resp.data.requests[0]);
      dispatch(addConnectionRequest(Array.isArray(resp.data.requests) ? resp.data.requests.filter(Boolean) : []));
      setError("");
    } catch (err) {
      setError("Error : " + err.message);
    }
  }

  const handleRequest = async (action,requestId) => {
    try{
      const resp = await axios.post(`${BASE_URL}/request/review/${action}/${requestId}`,{} ,{withCredentials:true});
      console.log(`Connection request ${action}ed successfully`, resp.data);
      // After accepting/rejecting, fetch the updated connection requests
      setRefresh(!refresh);

    }
    catch(err){
      console.log("Error in accepting connection request",err);
    }
  }

  useEffect(() => {
    fetchConnectionRequests();
  }, [refresh]);

  if(rawConnectionRequests === null && !error){
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }
    if(error){
      return (
        <div className="flex flex-col items-center my-10 px-4">
          <h1 className="mb-6 text-2xl font-bold">Your Connections Requests</h1>
          {connectionRequests.length === 0 ? (
            <p className="text-center text-gray-500">No connection requests found.</p>
          ) : (
            <p className="text-center text-gray-500">Connection requests found.</p>
          )}
        </div>
      );
    }

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="mb-6 text-2xl font-bold">Your Connections Requests</h1>
      <ul className="w-full max-w-md space-y-4">
        {connectionRequests.length === 0 ? (
          <p className="text-center text-gray-500">No connection requests found.</p>
        ) : (
          connectionRequests.map((request) => (
            <li key={request.fromUserId._id} className="bg-base-100 p-4 rounded-lg shadow">
              <img
                src={request.fromUserId.photoUrl || FALLBACK_PHOTO}
                alt={request.fromUserId.firstName}
                className="w-16 h-16 rounded-full object-cover mx-auto"
              />
              <h2 className="text-lg font-semibold text-center mt-2">{request.fromUserId.firstName} {request.fromUserId.lastName}</h2>
              <p className="text-center text-gray-500">{request.fromUserId.gender}</p>
              <p className="text-center text-gray-500">{request.fromUserId.age}</p>
              <p className="text-center text-gray-500">{request.fromUserId.skills}</p>
              <div className="flex justify-center mt-4">

                <button className="btn btn-success mx-2" onClick={() => handleRequest('accepted', request._id)}>
                  Accept
                </button>
                <button className="btn btn-error mx-2" onClick={() => handleRequest('rejected', request._id)}>
                  Reject
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default ConnectionRequest