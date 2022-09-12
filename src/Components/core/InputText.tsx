import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, FC } from "react";

import styles from "./InputText.module.css";
import { styled } from "@mui/material/styles";
interface InputTextProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: string;
}
const SearchTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
    fontSize: "Larger",
  },

  "& .MuiFilledInput-root": {
    border: "0px",
    backgroundColor: "white",

    "&:hover ": {
      backgroundColor: "white",
    },

    "&.Mui-focused ": {
      border: "0px",
      backgroundColor: "white",
      boxShadow: "  5px 5px 20px black",
    },
  },
});
export const InputText: FC<InputTextProps> = ({ onChange, inputValue }) => {
  return (
    <Box className={styles.container} sx={{ width: 600 }}>
      <SearchTextField
        label="Search For"
        className={styles.searchBar}
        fullWidth
        value={inputValue}
        onChange={onChange}
        variant="filled"
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Box>
  );
};
