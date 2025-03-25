import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox, CheckboxProps } from "@mui/material";

const CheckboxRound = (props: CheckboxProps) => {
  return (
    <Checkbox
      {...props}
      icon={<RadioButtonUnchecked />}
      checkedIcon={<CheckCircleOutline />}
    />
  );
};

export default CheckboxRound;
