import { AppBar, Toolbar, Stack, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [userEmail] = useState(() => {
    const userData = localStorage.getItem("userEmail");

    return userData;
  });

  const onClickLogout = () => {
    try {
      signOut(auth);

      navigate("/login");
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ width: "100%" }} variant="dense">
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Typography>Welcome {userEmail}</Typography>
          <IconButton onClick={onClickLogout} color="inherit" aria-label="menu">
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
