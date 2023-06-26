import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import NumberInput from "../NumberInput";
import { useState } from "react";
import LocationPicker from "../LocationPicker";

const StoreForm = ({ initialValues }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const [nameInput, setNameInput] = useState(
    initialValues && initialValues.name
  );

  return (
    <>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          type="text"
          {...register("name", {
            required: "Store name is required",
          })}
          placeholder="Store Name"
          value={nameInput || ""}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={errors.googleMap}>
        <FormLabel htmlFor="googleMap">Store Location</FormLabel>
        <Flex mt={4}>
          <LocationPicker initialValue={initialValues && initialValues} />
        </Flex>
        <FormErrorMessage>
          {errors.googleMap && errors.googleMap.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={errors.tw_start}>
        <FormLabel>Open Time</FormLabel>
        <Text fontSize="xs" color={"gray.500"}>
          Example: <Text as="kbd">08:00</Text>
        </Text>
        <Flex alignItems="center">
          <NumberInput
            id="time_windows_start"
            placeholder={"Insert store open hour"}
            name="tw_start"
            initialValue={initialValues && initialValues.tw_start}
            control={control}
          />
          <Text ml={2}>:00</Text>
        </Flex>
        <FormErrorMessage>
          {errors.tw_start && errors.tw_start.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={errors.tw_end}>
        <FormLabel>Close Time</FormLabel>
        <Text fontSize="xs" color={"gray.500"}>
          Example: <Text as="kbd">20:00</Text>
        </Text>
        <Flex alignItems="center">
          <NumberInput
            id="time_windows_end"
            placeholder={"Insert store close hour"}
            name="tw_end"
            initialValue={initialValues && initialValues.tw_end}
            control={control}
          />
          <Text ml={2}>:00</Text>
        </Flex>
        <FormErrorMessage>
          {errors.tw_end && errors.tw_end.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default StoreForm;
