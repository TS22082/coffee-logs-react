import React, { useEffect } from "react";
import axios from "axios";

const ConfirmAccount = (props) => {
  useEffect(() => {
    (async () => {
      console.log(props.match.params);

      try {
        const confirmationRequest = await axios.post("/confirm", {
          token: props.match.params.token,
        });

        console.log(confirmationRequest);
      } catch (err) {}
    })();
  }, []);
  return (
    <div>
      <h1>Congrats you've confirmed your account</h1>
    </div>
  );
};

export default ConfirmAccount;
