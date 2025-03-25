import { TextField, TextFieldProps } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

type TCustomInput = {
  register: UseFormRegister<any>;
  name: string;
} & TextFieldProps;

const CustomInput = ({ name, register, ...rest }: TCustomInput) => (
  <TextField {...register(name)} {...rest} name={name} />
);

export default CustomInput;
