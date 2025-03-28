import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Login from "../components/Auth/Login";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/get", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser,Login,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; // ✅ Ensure default export