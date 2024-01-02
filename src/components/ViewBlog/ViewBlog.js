import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../App";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import "./ViewBlog.css";
export default function ViewBlog(props) {
  const { id } = useParams();
  const [dataRequired, setdatareq] = useState();
  const [loading, setloading] = useState(false);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    setloading(true);
    window.scrollTo(0, 0);
    axios
      .get(URL + "/blog/" + id)
      .then((response) => {
        setdatareq(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [id, reload]);
  const FormatDate = () => {
    const originalDate = new Date(dataRequired?.createdDate); // Replace this with your actual date
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return originalDate.toLocaleDateString("en-UK", options);
  };
  return (
    <div>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : dataRequired ? (
        <div>
          <div className="blog-post">
            <h1 className="blog-title">{dataRequired.title}</h1>
            <p className="blog-date">
              Published on: <FormatDate />
            </p>
            <div className="blog-content">
              <p>{dataRequired.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>no result</h1>
      )}
    </div>
  );
}
