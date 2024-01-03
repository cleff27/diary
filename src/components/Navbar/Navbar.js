import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./Navbar.css";
import userContext from "../../context/userContext";
import { Badge, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
import Searchbar from "../Searchbar/Searchbar";
export default function Navbar() {
  const navigate = useNavigate();
  const contextData = React.useContext(userContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlelogout = () => {
    setAnchorEl(null);
    axios
      .post(URL + "/logout")
      .then(() => {
        sessionStorage.removeItem("user");
        console.log("logged out");
        contextData.setIsLoggedIn(false);
        contextData.setUser({});
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-body-tertiary maindiv">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/">
                  <Button>
                    <Typography sx={{ minWidth: 100 }}>Home</Typography>
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create">
                  <Button>
                    <Typography sx={{ minWidth: 100 }}>Create</Typography>
                  </Button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/friends">
                  <Button>
                    <Typography sx={{ minWidth: 100 }}>Friends</Typography>
                  </Button>
                </Link>
              </li>
              {contextData.user?.isAdmin === 1 ? (
                <li className="nav-item">
                  <Link to="/allUsers">
                    <Button>
                      <Typography sx={{ minWidth: 100 }}>
                        {"All Users (beta)"}
                      </Typography>
                    </Button>
                  </Link>
                </li>
              ) : null}
              <li>
                <Searchbar />
              </li>
            </ul>
          </div>

          <div className="navbar-brand">
            {contextData.isLoggedIn ? (
              <div className="avatar-div">
                <Link to="/friendrequests">
                  <Badge
                    badgeContent={contextData.user.friendRequests.length}
                    color="primary"
                  >
                    <button type="button" className="btn btn-light">
                      <PersonAddIcon />
                    </button>
                  </Badge>
                </Link>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {contextData.user.fname.substr(0, 1).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div className="avatar-div">
                <Link to="/login">
                  <Button>Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/profile">
          <MenuItem name="profile" onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
        </Link>
        <Link to={"/myblogs"}>
          <MenuItem name="createdBlogs" onClick={handleClose}>
            <Avatar /> My Diary
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handlelogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
