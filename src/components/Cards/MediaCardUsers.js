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
  const [contextData, setContextData] = React.useState(
    React.useContext(userContext)
  );

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
        props.setreload(!props.reload);
      });
  };

  const removeRequest = (removeId) => {
    const user = contextData.user;
    const newfriendrequests = user.friendRequests.filter(
      (request) => request !== removeId
    );
    user.friendRequests = newfriendrequests;
    // console.log(removeId);
    // console.log(newfriendrequests);
    // console.log(user);
    setContextData((prev) => {
      return {
        ...prev,
        user: user,
      };
    });
    contextData.updateUser(user);
  };
  const addFriend = (addId) => {
    const user = contextData.user;
    const newuser = user.friends.push(addId);

    setContextData((prev) => {
      return {
        ...prev,
        user: newuser,
      };
    });
    contextData.updateUser(newuser);
  };

  const CheckRelation = () => {
    const currfriends = contextData.user.friends;
    if (currfriends.includes(props.data._id)) {
      return <Button onClick={handleViewRequest}>View</Button>;
    } else if (props.data.friendRequests.includes(contextData.user._id)) {
      return <Button>Request Sent</Button>;
    } else
      return (
        <Button size="small" onClick={handleSendRequest}>
          Send Request
        </Button>
      );
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
        addFriend(senderId);
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
            {load ? "Sending Request" : <CheckRelation />}
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
      <HandleButtonType />
    </Card>
  );
}
