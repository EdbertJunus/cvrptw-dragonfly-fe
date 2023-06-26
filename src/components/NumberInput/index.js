import { Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const NumberInput = ({
  id,
  placeholder,
  name,
  initialValue,
  control,
  decimal,
  disabled,
  watch,
  type,
  max,
  min,
  prefix,
  money,
}) => {
  const capitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const requiredMessage = capitalized(
    id.includes("_") ? id.replaceAll("_", " ") : id
  );

  const decimalProps = decimal && {
    decimalSeparator: ".",
    allowNegative: true,
  };

  return (
    <Controller
      control={control}
      name={name || id}
      rules={{
        required: { value: true, message: requiredMessage + " is required" },
        max: max,
        min: min,
      }}
      render={({
        field: { onChange, name, value },
        formState: { isDirty, isValidating },
      }) => {
        // let initVal = initialValue
        //   ? initialValue
        //   : value === undefined
        //   ? ""
        //   : value;
        const initVal = initialValue ? initialValue : "";
        const val = {
          value: type !== "vehicle" ? null : watch ? watch(name) : null,
        };

        return (
          <Input
            width={"200px"}
            as={NumericFormat}
            id={id}
            defaultValue={initVal}
            disabled={disabled}
            placeholder={placeholder}
            isAllowed={(values) => {
              const { formattedValue, floatValue } = values;
              const maxVal = max ? max : 100;
              return formattedValue === "" || floatValue <= maxVal;
            }}
            onChange={onChange}
            prefix={prefix ? prefix : undefined}
            thousandsGroupStyle={money ? "thousand" : "none"}
            thousandSeparator={money ? "," : null}
            {...decimalProps}
            {...val}
          />
        );
      }}
    />
  );
};
export default NumberInput;
