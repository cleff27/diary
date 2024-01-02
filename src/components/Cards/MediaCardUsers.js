import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { URL } from "../../App";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
export default function MediaCardUsers(props) {
  const [load, setload] = React.useState(false);
  const navigate = useNavigate();
  const contextData = React.useContext(userContext);
  const handleSendRequest = (event) => {
    event.preventDefault();
    const senderId = props.senderId;
    setload(true);
    axios
      .post(URL + "/send-request/" + props.data?._id, { senderId })
      .then((response) => {
        console.log(response.data);
        //seterror(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        //seterror(error.response.data.error);
      })
      .finally(() => {
        setload(false);
      });
  };
  const removeRequest = (removeId) => {
    const friendrequests = contextData.user.friendRequests;
    const newfriendreqs = friendrequests.filter(
      (request) => request === removeId
    );
    contextData.setUser((prev) => {
      return {
        ...prev,
        friendRequests: newfriendreqs,
      };
    });
  };
  const handleAcceptRequest = (event) => {
    event.preventDefault();
    const senderId = props.data?._id;
    setload(true);
    axios
      .post(URL + "/accept-request/" + props.userId, { senderId })
      .then((response) => {
        console.log(response.data);
        removeRequest(senderId);
        //seterror(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        //seterror(error.response.data.error);
      })
      .finally(() => {
        setload(false);
        props.setreload(!props.reload);
      });
  };

  const handleViewRequest = (event) => {
    event.preventDefault();
    navigate("/createdblogs/" + props.data._id);
  };
  const HandleButtonType = () => {
    switch (props.actionType) {
      case "Request":
        return (
          <CardActions>
            {load ? (
              "Sending Request"
            ) : (
              <Button size="small" onClick={handleSendRequest}>
                Send Request
              </Button>
            )}
          </CardActions>
        );
      case "Accept":
        return (
          <CardActions>
            {load ? (
              "Accepting"
            ) : (
              <Button size="small" onClick={handleAcceptRequest}>
                Accept
              </Button>
            )}
          </CardActions>
        );
      case "View":
        return (
          <CardActions>
            {load ? (
              "loading"
            ) : (
              <Button size="small" onClick={handleViewRequest}>
                View
              </Button>
            )}
          </CardActions>
        );
      default:
        return (
          <CardActions>
            <Button>Default</Button>
          </CardActions>
        );
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data?.fname + " " + props.data?.lname}
        </Typography>
      </CardContent>
      {/* <CardActions>
        {load ? (
          "Sending Request"
        ) : (
          <Button size="small" onClick={handleSendRequest}>
            Send Request
          </Button>
        )}
      </CardActions> */}
      <HandleButtonType />
    </Card>
  );
}
