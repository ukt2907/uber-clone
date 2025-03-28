import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem("token");
        console.log(token);
      if (!token) {
        navigate("/captain-login");
        return;
      }

      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token");
        navigate("/captain-login");
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging you out...</div>;
};

export default CaptainLogout;
