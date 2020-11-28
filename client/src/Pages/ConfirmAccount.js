import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const ConfirmAccount = (props) => {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const confirmationRequest = await axios.post("/confirm", {
          token: props.match.params.token,
        });
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div>
      <h1>Congrats you've confirmed your account</h1>
    </div>
  );
};

export default ConfirmAccount;
