import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface IInputProps extends Omit<TextFieldProps, "variant"> {
  name: string;
  variant: "filled" | "outlined" | "standard";
  control: Control<any, any>;
}

const InputText = (props: IInputProps) => {
  const { name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          variant='outlined'
          size='small'
          fullWidth
          autoComplete='off'
        />
      )}
    />
  );
};

export default InputText;
