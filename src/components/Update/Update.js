import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Alert, Backdrop, Button, CircularProgress } from "@mui/material";
import userContext from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../App";
import "../Create/create.css";
export default function Update() {
  const contextData = useContext(userContext);
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [details, setDetails] = useState({
    title: "",
    content: "",
    userid: contextData.user?._id,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!contextData.isLoggedIn) {
      navigate("/login");
    } else {
      setloading(true);
      window.scrollTo(0, 0);
      axios
        .get(URL + "/blog/" + id)
        .then((response) => {
          setDetails(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [contextData.isLoggedIn, id]);

  const [load, setload] = useState(false);
  const [error, seterror] = useState("");

  const handleDetailChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setload(true);
    axios
      .put(URL + "/update/" + id, details)
      .then((response) => {
        //console.log(response.data);
        // seterror(response.data.message);
        navigate("/viewblog/" + id);
      })
      .catch((error) => {
        console.error(error);
        // seterror(error.response.data.error);
      })
      .finally(() => {
        setload(false);
      });
  };
  return loading ? (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={load}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="create-div">
      <div>
        <TextField
          fullWidth
          label="Title"
          name="title"
          onChange={handleDetailChange}
          value={details.title}
        />
      </div>
      <div className="content-div">
        <TextField
          fullWidth
          multiline
          rows={8}
          variant="filled"
          name="content"
          onChange={handleDetailChange}
          value={details.content}
        />
      </div>
      {error?.length > 0 ? <Alert severity="error">{error}</Alert> : null}
      {load ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={load}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Button onClick={handleSubmit}>Update</Button>
      )}
    </div>
  );
}
