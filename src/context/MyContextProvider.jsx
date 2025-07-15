import { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
// import { useNavigate } from "react-router";

const MyContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ isAuthenticated: false });
  const [appLoading, setAppLoading] = useState(false);
  // const navigate = useNavigate();

  const getUser = async () => {
    try {
      setAppLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      const { isSuccess, data } = result;
      if (isSuccess) {
        setUser({
          isAuthenticated: true,
          ...data.user,
        });
      } else {
        alert("please login again");
        window.open("/login");
      }
    } catch (err) {
      alert(err.message);
      window.open("/login");
    } finally {
      setAppLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const valueObj = { count, setCount, user, setUser, appLoading };

  return <MyContext.Provider value={valueObj}>{children}</MyContext.Provider>;
};
export { MyContextProvider };
