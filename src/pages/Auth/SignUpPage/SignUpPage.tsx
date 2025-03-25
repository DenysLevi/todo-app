import { Paper } from "@mui/material";
import SignUpForm from "../../../components/SignUpForm/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Paper
        sx={{ m: 3, p: 3, maxWidth: "40vw", minWidth: "350px", width: "100%" }}
      >
        <SignUpForm />
      </Paper>
    </div>
  );
};

export default SignUpPage;
