import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { setFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      if (feed && feed.length > 0) return;

      const resp = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(setFeed(resp.data));
    } catch (err) {
      console.log("Error in fetching feed", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h2 className="text-xl">No new users found!</h2>
      </div>
    );
  }

  const user = feed[0];

  return (
    <div className="flex justify-center my-10">
    <UserCard user={user}/>
    
    </div>
  );
};

export default Feed