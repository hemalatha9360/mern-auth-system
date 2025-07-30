import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Welcomepage = () => {
  const location = useLocation();
  const name = location.state?.name || "";
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Sending token:", token);
        if (!token) {
          setError("Token not found. Please log in");
          setLoading(false);
          return;
        }
        const res = await axios.get(
          "http://localhost:5000/api/auth/userprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      } catch (error) {
        setError("failed to fech userprofile");
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-700 to-rose-300 flex  justify-center items-center">
      <div className="flex pb-96 pl-48">
        <h1 className="flex justify-center text-2xl font-sans font-bold">
          Welcome User {name}
        </h1>
      </div>
      <div>
        <form className="bg-slate-400 h-[300px] w-[200px] ">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 pt-24 ">
            User Profile
          </h1>

          <div className="text-gray-700 space-y-4">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Welcomepage;
