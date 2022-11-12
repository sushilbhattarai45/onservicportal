import { toast } from "react-toastify";

//import icons from mui-icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon />;
    case "info":
      return <InfoIcon />;
    case "error":
      return <ErrorIcon />;
    case "warning":
      return <WarningIcon />;
    default:
      return <InfoIcon />;
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>
  );

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
