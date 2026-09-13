import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=800&auto=format&fit=crop";

function normalizeConnections(payload) {
  if (Array.isArray(payload)) return payload.filter(Boolean);
  if (Array.isArray(payload?.data)) return payload.data.filter(Boolean);
  if (Array.isArray(payload?.Connections)) return payload.Connections.filter(Boolean);
  if (Array.isArray(payload?.connections)) return payload.connections.filter(Boolean);
  return [];
}

function Connections() {
  const dispatch = useDispatch();
  const rawConnections = useSelector((store) => store.connections);
  const connections = normalizeConnections(rawConnections);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(normalizeConnections(resp.data)));
      setError("");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Could not load connections";
      setError(message);
      dispatch(addConnections([]));
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (rawConnections === null && !error) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center my-10">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h2 className="text-xl">No connections found!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="mb-6 text-2xl font-bold">Your Connections</h1>
      <ul className="flex w-full max-w-2xl flex-col gap-4">
        {connections.map((user, index) => {
          const meta = [user.age && `${user.age} yrs`, user.gender]
            .filter(Boolean)
            .join(" · ");

          return (
            <li
              key={user._id || index}
              className="flex items-center gap-4 rounded-lg bg-base-300 p-4"
            >
              <img
                src={user.photoUrl || FALLBACK_PHOTO}
                alt={user.firstName}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1 text-left">
                <h2 className="font-semibold capitalize">
                  {user.firstName} {user.lastName}
                </h2>
                {meta && (
                  <p className="text-sm capitalize text-base-content/60">{meta}</p>
                )}
                {user.about && (
                  <p className="mt-1 truncate text-sm text-base-content/70">
                    {user.about}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Connections;
