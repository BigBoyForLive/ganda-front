import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { MdOutlineError } from "react-icons/md";
import { FcApproval } from "react-icons/fc";

export default function ParamsExample() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:id" children={<Child />} />
        </Switch>
      </div>
    </Router>
  );
}

function Child2() {
  return <h1>hello world</h1>;
}

function Child() {
  const [response, setResponse] = useState();
  const [err, setErr] = useState();

  const { id } = useParams();
  const getAllReservation = async () => {
    try {
      let result = await axios.post("http://localhost:3000/user/activation", {
        activation_token: id,
      });
      console.log(result.response.data.msg);
      setResponse(result.response.data.msg);
    } catch (error) {
      console.error(error.response.data.msg);
      setErr(error.response.data.msg);
    }
  };

  useEffect(() => {
    getAllReservation();
  }, []);

  return (
    <>
      {err && (
        <div className="error">
          <div className="box">
            <MdOutlineError className="icon" />
            <h2>{err}</h2>
          </div>
        </div>
      )}
      {!err && (
        <div className="response">
          <div className="box">
            <FcApproval className="icon" />
            <h2>votre compte a été activé avec succès</h2>
          </div>
        </div>
      )}
    </>
  );
}
