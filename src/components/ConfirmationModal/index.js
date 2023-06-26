const {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Text,
} = require("@chakra-ui/react");

const ConfirmationModal = ({
  isOpen,
  onClose,
  onClick,
  title,
  description,
  action,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            colorScheme="green"
            onClick={() => {
              action();
              onClick();
            }}
          >
            Yes
          </Button>
          <Button colorScheme="red" onClick={onClick}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
