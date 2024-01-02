import React, { useContext } from "react";
import { Container, Typography, Paper, Avatar, Button } from "@mui/material";
import "./profilepage.css";
import userContext from "../../context/userContext";

const ProfilePage = () => {
  const { user } = useContext(userContext);
  return (
    <Container component="main" maxWidth="xs" className="root">
      <Paper elevation={3} className="paper">
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          className="avatar"
        />
        <Typography variant="h5">{user.fname + " " + user.lname}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {user.email}
        </Typography>
        <Typography variant="body1" align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          fringilla quam ut metus congue, et ullamcorper ex imperdiet.
        </Typography>
        <div className="button-div">
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => alert("Edit Profile clicked")}
          >
            Edit Profile
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
