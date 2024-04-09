import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";

import InputText from "../../../components/inputs/InputText";
import { schema } from "../constants";
import { IUserAction, IUserUpdateError } from "../../../interfaces/user";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_USER, PATH_USER_NOTFOUND } from "../../../routes/routes.path";
import { useEffect, useState } from "react";
import userServices from "../../../api/user";
import { AxiosError } from "axios";

const FormHeader = styled(CardHeader)(() => ({
  paddingTop: "10px",
  paddingBottom: "10px",
  backgroundColor: "#f8f8f8",
  "& .MuiCardHeader-title": {
    fontSize: "1.2rem",
  },
}));

const FormFooter = styled(CardActions)(() => ({
  display: "flex",
  justifyContent: "end",
  padding: "10px 16px",
  boxShadow: "rgb(213 215 217 / 35%) 1px -2px 24px 0px",
}));

interface IProps {
  mode: "create" | "update";
}

const UserForm = ({ mode }: IProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IUserAction>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const [isDisableForm, setIsDisableForm] = useState<boolean>(false);

  const handleClose = () => {
    navigate(PATH_USER);
  };

  const handleCreateUser = () => {};

  const handleUpdateUser = (data: IUserAction) => {
    if (!params.id) return;

    userServices
      .update(params.id, data)
      .then((rs) => {
        toast.success("Update Success");
        navigate(PATH_USER);
      })
      .catch((err: AxiosError<IUserUpdateError, any>) => {
        if (err.response?.status === 400) {
          const fieldErrors = err.response.data.errors;

          for (const [key, value] of Object.entries(fieldErrors)) {
            console.log(`${key}: ${value}`);
            setError(value.path as keyof IUserAction, {
              type: "validate",
              message: value.msg,
            });
          }
        }
      });
  };

  const onSubmit = (data: IUserAction) => {
    if (mode === "create") handleCreateUser();
    if (mode === "update") handleUpdateUser(data);
  };

  useEffect(() => {
    if (mode !== "update") return;

    if (params.id) {
      userServices
        .getById(params.id)
        .then((rs) => {
          const { username, firstName, lastName, email } = rs.data;
          reset({ username, firstName, lastName, email });
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 404) navigate(PATH_USER_NOTFOUND);
        });
    }
  }, [params]);

  return (
    <Box display='flex' justifyContent='center'>
      <Card
        sx={{ maxWidth: "900px" }}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormHeader
          title={mode === "create" ? "Add user" : "Update"}
          avatar={mode === "create" ? <AddIcon /> : <CreateIcon />}
        />

        <CardContent sx={{ py: 3 }}>
          <InputText
            control={control}
            name='username'
            label='Username'
            variant='standard'
            sx={{ mb: 3 }}
            error={!!errors.username}
            helperText={errors.username?.message as string}
          />
          <InputText
            control={control}
            name='firstName'
            label='FirstName'
            variant='standard'
            sx={{ mb: 3 }}
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
          />
          <InputText
            control={control}
            name='lastName'
            label='LastName'
            variant='standard'
            sx={{ mb: 3 }}
            error={!!errors.lastName}
            helperText={errors.lastName?.message as string}
          />
          <InputText
            control={control}
            name='email'
            label='Email'
            variant='standard'
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
        </CardContent>

        <FormFooter>
          <Button onClick={handleClose} variant='text'>
            Back
          </Button>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </FormFooter>
      </Card>
    </Box>
  );
};

export default UserForm;
