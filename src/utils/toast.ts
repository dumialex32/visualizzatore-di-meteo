import { Bounce, toast } from "react-toastify";

type Type = "warn" | "success" | "error" | "info";
type Position =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

interface Toast {
  type?: Type;
  message: string;
  position?: Position;
  autoClose?: number;
}

export const createToast = ({
  type,
  message,
  position = "top-center",
  autoClose = 2000,
}: Toast) => {
  if (type) {
    return toast[type](message, {
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } else {
    return toast(message, {
      position: "top-right",
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
};

export default Toast;
