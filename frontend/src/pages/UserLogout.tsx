import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging you out...</div>;
};

export default UserLogout;
