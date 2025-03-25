"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schemaModule } from "../../utils/shemas";
import { useNavigate } from "react-router-dom";
import CustomInput from "../CustomInput/CustomInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

type LoginSchema = {
  name: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaModule.signUp),
  });

  async function onSubmit(formData: LoginSchema) {
    setIsLoading(true);
    const { email, password } = formData;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    navigate("/todo-list", { replace: true });
    setTimeout(() => navigate("/login"), 3000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        <Typography variant="h6" color="inherit" component="div">
          Sign up
        </Typography>
        <CustomInput
          register={register}
          name="name"
          label="Name"
          variant="outlined"
          error={!!errors.name?.message}
          helperText={errors.name?.message}
        />
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
          label="Create password"
          variant="outlined"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Stack direction="row" justifyContent="flex-end" gap={0.5}>
          <Typography variant="subtitle2">Already have an account?</Typography>{" "}
          <Typography
            variant="subtitle2"
            className="cursor-pointer"
            onClick={() => navigate("/login")}
            component="a"
          >
            Sign In
          </Typography>
        </Stack>
        <Button variant="contained" type="submit" loading={isLoading}>
          Create account
        </Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
