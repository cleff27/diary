import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { URL } from "../../App";

export default function MediaCard(props) {
  const { user } = React.useContext(userContext);
  const handleBlogDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the Blog titled ${props.data.title}?\nOnce deleted it cannot be recovered, We suggest you to Update the course instead`
      )
    ) {
      axios
        .delete(URL + `/delete/${props.data._id}`)
        .then((res) => {
          props.onDelete();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const CheckUser = () => {
    if (props.data.userid === user._id) {
      return (
        <div>
          <Link to={"/update/" + props.data._id}>
            <Button>
              <EditIcon />
            </Button>
          </Link>
          <Button onClick={handleBlogDelete} color="error">
            <DeleteForeverIcon />
          </Button>
        </div>
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
          {props.data?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.data?.content.substr(0, 100)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"/viewblog/" + props.data._id}>
          {" "}
          <Button size="small">View</Button>
        </Link>
        <CheckUser />
      </CardActions>
    </Card>
  );
}
