import { Paper } from "@mui/material";
import LoginForm from "../../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Paper
        sx={{ m: 3, p: 3, maxWidth: "40vw", minWidth: "350px", width: "100%" }}
      >
        <LoginForm />
      </Paper>
    </div>
  );
};

export default LoginPage;
