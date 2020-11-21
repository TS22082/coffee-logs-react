import React, { useEffect } from "react";

const Edit = (props) => {
  useEffect(() => {
    console.log(props.match.params.id);
  }, []);
  return <div></div>;
};

export default Edit;
