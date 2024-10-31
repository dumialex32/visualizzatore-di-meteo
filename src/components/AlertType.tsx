import { Alert } from "@mui/material";

type Alert = "success" | "info" | "warning" | "error";

const AlertType: React.FC<{ type?: Alert; message: string }> = ({
  type = "success",
  message,
}) => {
  return <Alert severity={type}>{message}</Alert>;
};

export default AlertType;
