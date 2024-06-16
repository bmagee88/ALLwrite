import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";

export interface FormFieldProps {
  id: string;
  fullwidth?: boolean;
  size?: "small" | "medium" | undefined;
  variant?: "outlined" | undefined;
  label: string;
  icon: string;
  inputAdornmentPosition: "end" | "start";
  linkTo: string;
}

const FormField = ({
  id,
  fullwidth,
  size,
  variant,
  label,
  icon,
  inputAdornmentPosition,
  linkTo,
}: FormFieldProps) => {
  return (
    <div>
      <TextField
        id={id}
        fullWidth={fullwidth}
        size={size}
        variant={variant}
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position={inputAdornmentPosition}>
              <Link to={linkTo}>{icon}</Link>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default FormField;
