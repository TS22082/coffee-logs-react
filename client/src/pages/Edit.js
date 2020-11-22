import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const Edit = (props) => {
  const [log, setLog] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/logs/find/${props.match.params.id}`,
          {
            headers: { "x-auth-token": localStorage.getItem("auth-token") },
          }
        );
        setLog(data[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props]);
  return (
    <div>
      <Form.Group>
        <Form.Label>Supports Markdown</Form.Label>
        <Form.Control
          name="text"
          onChange={onChange}
          value={log.text}
          as="textarea"
          rows={3}
        />
      </Form.Group>
    </div>
  );
};

export default Edit;
