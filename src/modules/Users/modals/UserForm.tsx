import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { UserContext } from "../context";
import InputText from "../../../components/inputs/InputText";
import { IUserAction } from "../../../interfaces/user";
import { schema } from "../constants";

const UserFormModal = () => {
  const { openModal, handleModal } = useContext<any>(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    handleModal("modal");
  };

  const onSubmit = (data: IUserAction) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(openModal.modal);
  }, [openModal]);

  return (
    <Dialog
      open={openModal.modal}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <InputText
            control={control}
            name='username'
            label='Username'
            variant='standard'
            sx={{ mb: 3 }}
            error={!!errors.firstName}
            helperText={errors.firstName?.message as string}
          />
          <InputText
            control={control}
            name='firstName'
            label='FirstName'
            variant='standard'
            sx={{ mb: 3 }}
            error
            helperText=''
          />
          <InputText
            control={control}
            name='lastName'
            label='LastName'
            variant='standard'
            sx={{ mb: 3 }}
            error
            helperText=''
          />
          <InputText
            control={control}
            name='email'
            label='Email'
            variant='standard'
            type='email'
            error
            helperText=''
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit'>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormModal;
