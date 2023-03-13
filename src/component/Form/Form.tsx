import { FormControl, FormGroup, FormLabel, InputLabel, TextField } from '@mui/material';
import { color } from '../../styles/color';

const labelStyle = {
  marginBottom: "0.7rem",
  color: color.black,
};

const BasicForm = ({
  id,
  label,
  type,
  placeholder,
  sx,
  value,
  finalData,
  setFinalData,
}: {
  id: string;
  label: string;
  type: string;
  placeholder:string;
  sx?:any;
  value?:any;
  finalData:any;
  setFinalData:any
}) => {

    const handleInputChange=(e:any)=>{
     setFinalData((prev:any)=>{return {...prev,[e.target.id]:e.target.value}})
    };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <TextField
        autoFocus
        margin="dense"
        id={id}
        label={placeholder}
        type={type}
        variant="outlined"
        fullWidth
        hiddenLabel
        size={"small"}
        sx={{ ...labelStyle }}
        inputProps={{
          style: {
            ...sx,
          },
        }}
        value={value}
        onChange={handleInputChange}
        required
        error={value === "" ? true : false}
        helperText="required"
      />
    </FormControl>
  );
};

export default BasicForm
