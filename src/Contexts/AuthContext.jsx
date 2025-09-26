import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { api } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setisAdmin] = useState(false);

    const checkAuth = async () => {
        try {
            const res = await axios.get(api.CheckAuth, { withCredentials: true });
            setUser(res.data.user);
            setisAdmin(res.data.user.is_staff ? true : false);
            console.log("User authenticated:", res.data.user);
        } catch (err) {
            setUser(null);
            console.error("Authentication check failed:", err);
        }
    };

    const login = async () => {
        await checkAuth(); // After successful login (normal or Google), re-check cookie.
    };

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const logout = async () => {
        const csrftoken = getCookie("csrftoken")
        try {
            await axios.post(api.Logout, {}, {
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                withCredentials: true
            });
            setUser(null);
            setisAdmin(false);
        } catch (err) {
            console.error("Logout failed:", err);
        }
        setUser(null);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
