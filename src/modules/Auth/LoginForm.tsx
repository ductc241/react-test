import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  ILoginError,
  ILoginValidateError,
  IUserLogin,
} from "../../interfaces/user";
import { schema } from "./constants";
import authServices from "../../api/auth";
import InputText from "../../components/inputs/InputText";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PATH_USER } from "../../routes/routes.path";
import { AxiosError, isAxiosError } from "axios";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IUserLogin>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [errorLogin, setErrorLogin] = useState<string>("");

  const onSubmit = (data: IUserLogin) => {
    authServices
      .signin(data)
      .then((rs) => {
        localStorage.setItem("token", rs.data.token);
        toast.success("Login success");
        navigate(PATH_USER);
      })
      .catch((err) => {
        if (!isAxiosError(err)) {
          toast.error("Error");
          return;
        }

        if (err.response?.status === 401) {
          const { response }: AxiosError<ILoginError, any> = err;
          setErrorLogin(response?.data.error ?? "");
          return;
        }

        if (err.response?.status === 400) {
          const { response }: AxiosError<ILoginValidateError, any> = err;

          for (const [key, value] of Object.entries(response.data.errors)) {
            setError(value.path as keyof IUserLogin, {
              type: "validate",
              message: value.msg,
            });
          }
          return;
        }

        toast.error("Error");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        component='form'
        sx={{ maxWidth: "600px", py: 5, px: 3 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant='h5' gutterBottom marginBottom={2}>
          Login
        </Typography>

        <InputText
          control={control}
          name='username'
          label='Username'
          variant='standard'
          sx={{ mb: 3 }}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <InputText
          control={control}
          name='password'
          label='Password'
          type='password'
          variant='standard'
          sx={{ mb: 2 }}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {errorLogin && (
          <Typography variant='body2' color='red' gutterBottom marginBottom={2}>
            {errorLogin}
          </Typography>
        )}

        <Button type='submit' variant='contained' fullWidth>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginForm;
