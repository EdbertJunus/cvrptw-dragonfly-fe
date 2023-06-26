import {
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Icon,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import StoreDemand from "../StoreDemand";
import { AppContext } from "@/context/state";
import instance from "@/api";
import { TbMoodEmpty } from "react-icons/tb";

const RouteCalculationForm = () => {
  const [numberStores, setNumberStores] = useState(0);
  const { userId, setUserId } = useContext(AppContext);
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState({});
  const [demand, setDemand] = useState();
  const [maxDemand, setMaxDemand] = useState(0);

  useEffect(() => {
    if (userId > 0 && Object.keys(vehicleData).length == 0) {
      instance
        .get("vehicle/" + userId)
        .then((response) => {
          setVehicleData(response.data);
          setDemand(response.data.capacity);
          setMaxDemand(response.data.capacity);
        })
        .catch((error) => {});
    }
  }, [userId]);

  const getStoreList = () => {
    instance
      .get("store")
      .then((response) => {
        setStoreList(response.data);
        setUserId(response.data[0].user_id);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getStoreList();
  }, []);

  return (
    <>
      <Flex>
        <Heading as="h3" size="lg" mb={8}>
          Route Calculation Form
        </Heading>
      </Flex>
      {storeList.length > 2 ? (
        <Box>
          <Flex justifyContent="space-between">
            <FormControl w="45%">
              <FormLabel>Number of Stores to visit: </FormLabel>
              <NumberInput
                defaultValue={0}
                min={0}
                max={10}
                onChange={(value) => setNumberStores(value)}
                isDisabled={loading}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl w="45%">
              <FormLabel>Vehicle Capacity: </FormLabel>
              <Input
                type="number"
                isReadOnly
                min={0}
                max={100}
                value={demand || 0}
                border={0}
              />
            </FormControl>
          </Flex>
          {numberStores > 0 && (
            <StoreDemand
              number={numberStores}
              storeData={storeList}
              setDemand={setDemand}
              maxDemand={maxDemand}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </Box>
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
            You have to add more stores (minimum 3 stores)
          </Heading>
        </Flex>
      )}
    </>
  );
};

export default RouteCalculationForm;
