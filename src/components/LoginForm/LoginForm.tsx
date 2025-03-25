import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";
import CustomInput from "../CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaModule } from "../../utils/shemas";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../firebase";

interface LoginSchema {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaModule.login),
  });

  async function onSubmit(formData: LoginSchema) {
    setIsLoading(true);
    const { email, password } = formData;

    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/todo-list", { replace: true });
    } catch (error: any) {
      console.error(error?.message);
      setLoginError(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  const onClearError = () => setLoginError("");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        <Typography variant="h6" color="inherit" component="div">
          Sign in
        </Typography>
        <CustomInput
          register={register}
          name="email"
          label="Email"
          variant="outlined"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
        <CustomInput
          register={register}
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Stack direction="row" justifyContent="flex-end" gap={0.5}>
          <Typography variant="subtitle2">Don't have an account?</Typography>{" "}
          <Typography
            variant="subtitle2"
            className="cursor-pointer"
            onClick={() => navigate("/sign-up")}
            component="a"
          >
            Sign Up
          </Typography>
        </Stack>
        <Button variant="contained" loading={isLoading} type="submit">
          Sign in
        </Button>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!loginError}
        autoHideDuration={6000}
        onClose={onClearError}
      >
        <Alert
          onClose={onClearError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {loginError}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default LoginForm;
