import userContext from "./userContext";
import { useEffect, useState } from "react";
const UserState = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  //  const updateUser=(data)=>{
  //     setState(data);
  //  }
  //const updateLogin
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
    if (loggedInUser) {
      const foundUser = loggedInUser;
      console.log(foundUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <userContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, setUser }}>
      {props.children}
    </userContext.Provider>
  );
};
export default UserState;
