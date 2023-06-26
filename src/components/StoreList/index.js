import { AppContext } from "@/context/state";
import instance from "@/api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
  Button,
  useDisclosure,
  Box,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import StoreFormModal from "../StoreFormModal";
import { TbMoodEmpty } from "react-icons/tb";

const StoreList = () => {
  const [storeData, setStoreData] = useState([]);
  const { userId, setUserId, location } = useContext(AppContext);
  const [activeStore, setActiveStore] = useState(-1);
  const [unRegister, setUnregister] = useState(false);
  const [modalType, setModalType] = useState("");
  const toast = useToast();
  const {
    isOpen: isAddUpdateOpen,
    onOpen: onAddUpdateOpen,
    onClose: onAddUpdateClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleModalOpen = (type) => {
    setModalType(type);
    onAddUpdateOpen();
  };

  const getStoreData = () => {
    instance
      .get("store")
      .then((response) => {
        setStoreData(response.data);
        setUserId(response.data[0].user_id);
      })
      .catch((error) => {});
  };

  const toastSuccess = {
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top-right",
  };

  const storeOnSubmit = (values) => {
    values["longitude"] = parseFloat(location.longitude.toFixed(6));
    values["latitude"] = parseFloat(location.latitude.toFixed(6));
    values["tw_start"] = parseInt(values["tw_start"]);
    values["tw_end"] = parseInt(values["tw_end"]);
    values["user_id"] = userId;

    if (modalType == "add") {
      instance
        .post("store", values)
        .then((response) => {
          console.info("Insert Store Successful: ", response);
          getStoreData();
          toast({
            ...toastSuccess,
            title: "Add Store Data Successful",
          });
        })
        .catch((err) => {});
    } else {
      const itemId = modalType == "update" && storeData[activeStore].id;

      instance
        .put("store/" + itemId, values)
        .then((response) => {
          console.info("Insert Store Successful: ", response);
          getStoreData();
          toast({
            ...toastSuccess,
            title: "Update Store Data Successful",
          });
        })
        .catch((err) => {});
    }

    setUnregister(true);
    onAddUpdateClose();
  };

  const deleteStore = () => {
    const id = storeData[activeStore].id;

    instance
      .delete("store/" + id)
      .then((response) => {
        console.info("Delete Store Successful: ", response);
        toast({
          ...toastSuccess,
          title: "Delete Data Successful",
        });
        getStoreData();
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (storeData.length == 0) {
      getStoreData();
    }
  }, []);

  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Heading as="h3" size="lg" mb={8}>
          Store List
        </Heading>
        <Button
          colorScheme="gray"
          variant="outline"
          onClick={() => {
            handleModalOpen("add");
            setActiveStore(-1);
          }}
        >
          Add
        </Button>
      </Flex>
      {storeData.length > 0 ? (
        <TableContainer
          border="1px"
          borderColor="gray.200"
          borderRadius={"md"}
          boxShadow="base"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Location</Th>
                <Th isNumeric>Open Time</Th>
                <Th isNumeric>Close Time</Th>
                <Th>Update</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {storeData.map((item, key) => {
                return (
                  <Tr key={key}>
                    <Td>{key + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.location}</Td>
                    <Td isNumeric>{item.tw_start}</Td>
                    <Td isNumeric>{item.tw_end}</Td>
                    <Td>
                      <Button
                        colorScheme="green"
                        variant="solid"
                        onClick={() => {
                          handleModalOpen("update");
                          setActiveStore(key);
                        }}
                      >
                        Update
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        variant="solid"
                        onClick={() => {
                          onDeleteOpen();
                          setActiveStore(key);
                        }}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Flex
          boxShadow="base"
          p={2}
          rounded="md"
          w="100%"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={TbMoodEmpty} w={20} h={20} />
          <Heading lineHeight="tall" as="h3" size="lg">
            There is no stores added currently
          </Heading>
        </Flex>
      )}
      <StoreFormModal
        isOpen={isAddUpdateOpen}
        onClose={onAddUpdateClose}
        onClick={onAddUpdateClose}
        onSubmit={storeOnSubmit}
        unRegister={unRegister}
        setUnregister={setUnregister}
        type={modalType}
        initialValues={storeData[activeStore]}
      />
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onClick={onDeleteClose}
        action={deleteStore}
        title={"Delete Confirmation"}
        description={`Are you sure you want to delete "${storeData[activeStore]?.name}"  store ?`}
      />
    </>
  );
};

export default StoreList;
