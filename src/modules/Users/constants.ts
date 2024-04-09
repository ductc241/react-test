import * as yup from "yup";
import { IColumn } from "../../interfaces/column";

export const userColumns: IColumn[] = [
  { id: "username", label: "Username", minWidth: 170 },
  { id: "firstName", label: "Firstname", minWidth: 170 },
  { id: "lastName", label: "Lastname", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
];

export const schema = yup
  .object({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().max(32, "email too long").email().required(),
  })
  .required();
