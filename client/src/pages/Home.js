import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import GroupAdd from "../components/GroupAdd";
import UserContext from "../Context/UserContext";

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <div>
      <GroupAdd />
    </div>
  );
};

export default Home;
