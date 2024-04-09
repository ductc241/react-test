import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
} from "@mui/material";
import InputText from "../../../components/inputs/InputText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../constants";
import { IUserAction } from "../../../interfaces/user";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";

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
  const {
    control,
    handleSubmit,
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

  const handleClose = () => {
    toast.success("Here is your toast.");
  };

  const onSubmit = (data: IUserAction) => {
    console.log(data);
  };

  return (
    <Box display='flex' justifyContent='center'>
      <Card
        sx={{ maxWidth: "900px" }}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormHeader title='Thêm người dùng' avatar={<AddIcon />} />

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
            Cancel
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
