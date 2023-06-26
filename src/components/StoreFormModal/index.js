import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import StoreForm from "../StoreForm";
import { useEffect } from "react";

const StoreFormModal = ({
  isOpen,
  onClose,
  onClick,
  onSubmit,
  unRegister,
  setUnregister,
  type,
  initialValues,
}) => {
  const methods = useForm({
    defaultValues: {
      name: initialValues?.name ? initialValues.name : "",
      googleMap: initialValues?.googleMap ? initialValues.googleMap : "",
      location: initialValues?.location ? initialValues.location : "",
      tw_start: initialValues?.tw_start ? initialValues.tw_start : "",
      tw_end: initialValues?.tw_end ? initialValues.tw_end : "",
    },
    shouldUnregister: true,
  });

  useEffect(() => {
    if (initialValues) {
      if (type == "add") {
        methods.reset();
      } else {
        // methods.reset(initialValues);
        methods.setValue("name", initialValues.name);
        methods.setValue("googleMap", initialValues.googleMap);
        methods.setValue("location", initialValues.location);
      }
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (unRegister) {
      methods.unregister([
        "name",
        "googleMap",
        "location",
        "tw_start",
        "tw_end",
      ]);
      setUnregister(false);
    }
  }, [unRegister]);

  const modalTitle = type == "add" ? "Add new" : "Update";

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        methods.unregister();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle} store</ModalHeader>
        <ModalCloseButton />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <StoreForm initialValues={type == "add" ? [] : initialValues} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
              <Button
                isLoading={methods.formState.isSubmitting}
                onClick={onClick}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default StoreFormModal;
