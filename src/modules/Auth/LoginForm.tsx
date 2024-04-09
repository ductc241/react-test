import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { IUserLogin } from "../../interfaces/user";
import { schema } from "./constants";
import authServices from "../../api/auth";
import InputText from "../../components/inputs/InputText";
import toast from "react-hot-toast";

const LoginForm = () => {
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

  const onSubmit = (data: IUserLogin) => {
    authServices
      .signin(data)
      .then((rs) => localStorage.setItem("token", rs.data.token))
      .catch((err) => {
        toast.error("Update Error");
        console.log(err);
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
          sx={{ mb: 3 }}
          error={!!errors.username}
          helperText={errors.password?.message}
        />

        <Button type='submit' variant='contained' fullWidth>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginForm;
