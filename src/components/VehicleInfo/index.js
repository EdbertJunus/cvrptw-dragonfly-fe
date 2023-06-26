import { AppContext } from "@/context/state";
import instance from "@/api";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import NumberInput from "../NumberInput";
import { useForm } from "react-hook-form";

const VehicleInfo = () => {
  const [disabled, setDisabled] = useState(true);
  const { userId } = useContext(AppContext);
  const [data, setData] = useState([]);
  const toast = useToast();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm({
    shouldUnregister: true,
  });

  const toastSuccess = {
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  };

  useEffect(() => {
    if (userId > 0) {
      instance
        .get("vehicle/" + userId)
        .then((response) => {
          setData(response.data);
          setValue("capacity", response.data.capacity);
          setValue("speed", response.data.speed);
        })
        .catch((error) => {});
    }
  }, [userId]);

  const onCancelClik = () => {
    setValue("capacity", data.capacity);
    setValue("speed", data.speed);
    setDisabled(true);
  };

  const onVehicleSubmit = (values) => {
    values["capacity"] = parseInt(values["capacity"]);
    values["speed"] = parseInt(values["speed"]);

    if (data.length == 0) {
      values["user_id"] = userId;
      // values["quantity"] = 1;

      instance
        .post("vehicle/" + userId, values)
        .then((response) => {
          setData(values);
          setValue("capacity", response.data.capacity);
          setValue("speed", response.data.speed);
          toast({
            ...toastSuccess,
            title: "Add Vehicle Data Successful",
          });
        })
        .catch((error) => {});
    } else {
      instance
        .patch("vehicle/" + userId, values)
        .then((response) => {
          setData(values);
          setValue("capacity", response.data.capacity);
          setValue("speed", response.data.speed);
          toast({
            ...toastSuccess,
            title: "Update Vehicle Data Successful",
          });
        })
        .catch((error) => {});
    }

    setDisabled(true);
  };

  return (
    <Box mt={8}>
      <Flex justifyContent={"space-between"}>
        <Heading as="h3" size="lg" mb={8}>
          Vehicle Info
        </Heading>
        <Button
          colorScheme="gray"
          variant="outline"
          onClick={() => {
            if (!disabled) {
              onCancelClik();
            }
            setDisabled(!disabled);
          }}
        >
          Edit
        </Button>
      </Flex>
      <Box>
        <form onSubmit={handleSubmit(onVehicleSubmit)}>
          <Flex justifyContent={"space-between"}>
            <FormControl w="45%" isInvalid={errors.capacity}>
              <FormLabel>Vehicle Capacity</FormLabel>
              <NumberInput
                id={"capacity"}
                name={"capacity"}
                placeholder={"Ex: 50"}
                control={control}
                initialValue={data && data.capacity}
                disabled={disabled}
                watch={watch}
                type="vehicle"
                max={1000}
                min={1}
              />
              <FormErrorMessage>
                {errors.capacity && errors.capacity.message.length > 0
                  ? errors.capacity.message
                  : (errors.capacity?.type == "min" ||
                      errors.capacity?.type == "max") &&
                    "Input is out of range"}
              </FormErrorMessage>
              <FormHelperText>
                Capacity range is from 1-1000 (per/item)
              </FormHelperText>
            </FormControl>
            <FormControl w="45%" isInvalid={errors.speed}>
              <FormLabel>Vehicle Speed</FormLabel>
              <NumberInput
                id={"speed"}
                name={"speed"}
                placeholder={"Ex: 50"}
                control={control}
                initialValue={data && data.speed}
                disabled={disabled}
                watch={watch}
                type="vehicle"
                max={100}
                min={10}
              />
              <FormErrorMessage>
                {errors.speed && errors.speed.message.length > 0
                  ? errors.speed.message
                  : (errors.speed?.type == "min" ||
                      errors.speed?.type == "max") &&
                    "Input is out of range"}
              </FormErrorMessage>
              <FormHelperText>
                Speed range is from 10-100 (km/hour)
              </FormHelperText>
            </FormControl>
          </Flex>
          {!disabled && (
            <Flex mt={4} justifyContent={"flex-end"}>
              <Button mr={2} colorScheme="green" variant="solid" type="submit">
                Save
              </Button>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  clearErrors();
                  onCancelClik();
                }}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default VehicleInfo;
