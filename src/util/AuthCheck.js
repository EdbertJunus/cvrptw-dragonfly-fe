import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant";
import { removeAuthToken } from ".";
import instance from "@/api";

const { AppContext } = require("@/context/state");
const { useRouter } = require("next/router");
const { useContext, useEffect } = require("react");

const AuthCheck = ({ children }) => {
  const router = useRouter();
  const { userId, setUserId, setAuthenticated } = useContext(AppContext);

  const checkAuth = () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    const access = localStorage.getItem(ACCESS_TOKEN);
    if (access && refresh) {
      setAuthenticated(true);
    } else {
      if (router.pathname !== "/login" && router.pathname !== "/register") {
        removeAuthToken();
        setAuthenticated(false);
        router.push("login");
      }
    }
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    if (userId == -1) {
      instance
        .get("get_user_id")
        .then((res) => {
          setUserId(res.data.user_id);
        })
        .catch((err) => {
          // console.error(err);
        });
    }
  }, [userId]);

  return children;
};

export default AuthCheck;
