import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { URL } from "../../App";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MediaCard from "../Cards/Cards";
import userContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import MediaCardUsers from "../Cards/MediaCardUsers";
import { Grid } from "@mui/material";
import "./friendrequests.css";
function FriendRequests() {
  const contextData = useContext(userContext);
  //const id = contextData.user._id;
  const [dataRequired, setdatareq] = useState([]);
  const [loading, setloading] = useState(false);
  const [reload, setreload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setloading(true);
    window.scrollTo(0, 0);
    if (!contextData.isLoggedIn) {
      navigate("/login");
    } else {
      const id = contextData.user._id;
      axios
        .get(URL + "/friendrequests/" + id)
        .then((response) => {
          setdatareq(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [contextData, reload]);

  return (
    <div className="friend-request-div">
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : dataRequired.length > 0 ? (
        <Grid container spacing={2}>
          {dataRequired.map((data, index) => (
            <Grid item xs={12} md={4} sm={6} className="gridcard" key={index}>
              <MediaCardUsers
                data={data}
                userId={contextData.user._id}
                actionType="Accept"
                setreload={setreload}
                reload={reload}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h1>no result</h1>
      )}
    </div>
  );
}

export default FriendRequests;
