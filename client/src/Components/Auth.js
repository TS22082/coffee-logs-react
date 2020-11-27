import React, { useEffect, useContext } from "react";
import UserContext from "../Context/UserContext";
import { useHistory } from "react-router-dom";

const Auth = (props) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.user) history.push("/home");
  }, [userData.user, history]);

  return <>{props.children}</>;
};

export default Auth;
