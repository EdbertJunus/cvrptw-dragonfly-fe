import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
  Button,
  FormErrorMessage,
  Text,
  Flex,
  Spinner,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  generateOptions,
  generateRouteDetailData,
  getCurrentDemand,
} from "./util";
import { AppContext } from "@/context/state";
import instance from "@/api";
import { useRouter } from "next/router";
import axios from "axios";
import NumberInput from "../NumberInput";
import { DISTANCE_MATRIX, GOOGLE_DISTANCE_MATRIX } from "@/constant";

const StoreDemand = ({
  number,
  storeData,
  setDemand,
  maxDemand,
  loading,
  setLoading,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errorDemand, setErrorDemand] = useState(false);
  const [errorForm, setErrorForm] = useState();
  const [loadingPhase, setLoadingPhase] = useState(0);
  const { userId } = useContext(AppContext);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    watch,
    clearErrors,
    unregister,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      data: [],
      gasoline_price: "",
    },
  });

  useEffect(() => {
    if (number == 0) {
      setSelectedOptions([]);
    }
    if (number < selectedOptions.length) {
      setSelectedOptions([...selectedOptions.slice(0, number)]);

      const length = watch().data.length;
      const numberDeleted = [];
      for (let i = number; i < length; i++) {
        const temp = `data.${i}`;
        numberDeleted.push(temp);
      }
      unregister(numberDeleted);
    }
  }, [storeData, number]);

  useEffect(() => {
    if (errors.data) {
      const firstError = errors.data[Object.keys(errors.data)[0]];
      setErrorForm(firstError);
    }
  }, [errors]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const sumDemand = getCurrentDemand(value);
      setErrorDemand(false);

      if (sumDemand > maxDemand) {
        setErrorDemand(true);
      } else {
        setDemand(maxDemand - sumDemand);
      }

      clearErrors();
      setErrorForm(false);
    });
    return () => subscription.unsubscribe();
  }, [watch, maxDemand]);

  const tableRows = [];
  const stores = storeData.map((val, key) => {
    return (
      <option key={"option " + key} value={key}>
        {val.name}
      </option>
    );
  });
  const toast = useToast();

  for (let i = 0; i < number; i++) {
    let tempStore = generateOptions(stores, i, selectedOptions);

    tableRows.push(
      <Tr key={"store demand " + i}>
        <Td>
          {i == 0 && (
            <Text fontSize="sm" lineHeight="normal" mb={2} color="blue.400">
              First Row as Starting Stores
            </Text>
          )}
          <Select
            {...register(`data.${i}.name`, {
              required: "Store Name is required",
            })}
            placeholder="Select option"
            isDisabled={loading}
            onChange={(e) => {
              //Set SelectedOptions
              let tempSelectOptions = [...selectedOptions];
              tempSelectOptions[i] = parseInt(e.target.value);

              setSelectedOptions(tempSelectOptions);

              //Remove Focus on Select
              e.target.blur();
            }}
          >
            {tempStore}
          </Select>
        </Td>
        <Td>
          <Input
            type="number"
            min={0}
            isDisabled={loading}
            {...register(`data.${i}.demand`, {
              required: "Store Demand is required",
            })}
          />
        </Td>
      </Tr>
    );
  }

  const onSubmit = async (val) => {
    setLoading(true);

    const numericValue = parseInt(
      val.gasoline_price.replace("Rp ", "").replace(",", "")
    );

    if (numericValue > 50000 || numericValue < 10000) {
      setError("gasoline_price", {
        type: "min",
        message: "Oil must be between provided ranges",
      });

      setLoading(false);
      return;
    } else {
      console.log("gak erro");
      clearErrors("gasoline_price");
    }

    const routeData = {
      gasoline_price: numericValue,
      user_id: userId,
    };

    const routeResponse = await instance
      .post("create/route", routeData)
      .then((res) => res.data.message);

    const routeId = routeResponse.id;
    const routeDetailData = generateRouteDetailData(val, storeData, routeId);

    if (routeDetailData) {
      const successRouteDetail = await instance
        .post("create/route-detail", routeDetailData)
        .then((res) => res.data)
        .catch((err) => console.log(err));

      console.log(successRouteDetail);

      if (successRouteDetail) {
        localStorage.setItem(
          DISTANCE_MATRIX,
          JSON.stringify(successRouteDetail.distance_matrix)
        );
        localStorage.setItem(
          GOOGLE_DISTANCE_MATRIX,
          JSON.stringify(successRouteDetail.google_distance_matrix)
        );

        setLoadingPhase(1);

        axios
          .all([
            instance.post("calculate_route/" + routeId, {
              distance_matrix: successRouteDetail.distance_matrix,
            }),
            instance.post("calculate_pso/" + routeId, {
              distance_matrix: successRouteDetail.distance_matrix,
            }),
            instance.post("calculate_manual/" + routeId, {
              distance_matrix: successRouteDetail.distance_matrix,
            }),
          ])
          .then(
            axios.spread((dragonfly, pso, manual) => {
              localStorage.setItem("ROUTE_ID", routeId);
              localStorage.setItem(
                "ROUTE_DETAIL",
                JSON.stringify(routeDetailData)
              );
              localStorage.setItem(
                "ROUTE_RESULT_DA",
                JSON.stringify(dragonfly.data)
              );
              localStorage.setItem(
                "ROUTE_RESULT_PSO",
                JSON.stringify(pso.data)
              );
              localStorage.setItem(
                "MANUAL_ROUTE_CALCULATION",
                JSON.stringify(manual.data)
              );

              setLoadingPhase(2);

              const timer = setTimeout(() => {
                setLoading(false);
                router.push("/result");
              }, 1000);

              return () => clearTimeout(timer);
            })
          )
          .catch((err) => {
            console.log(err);
            setLoadingPhase(2);
            toast({
              title: "Route Calculation Error",
              description: "There is an error, please try again later.",
              status: "error",
              duration: 1000,
              isClosable: true,
            });
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mt={4} w="45%" isInvalid={errors.gasoline_price}>
        <FormLabel>Gasoline Price</FormLabel>
        <NumberInput
          id={"gasoline_price"}
          name={"gasoline_price"}
          placeholder={"Ex: Rp 15.000"}
          control={control}
          disabled={loading}
          max={50000}
          min={10000}
          prefix={"Rp "}
          money={true}
        />
        <FormHelperText>
          Gasoline price range is from Rp. 10.000 - Rp.50.000
        </FormHelperText>
        <FormErrorMessage>
          {errors.gasoline_price && errors.gasoline_price.message}
        </FormErrorMessage>
      </FormControl>
      <TableContainer mt={8} border="1px" borderColor="gray.200">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Store Name</Th>
              <Th>Store Demand</Th>
            </Tr>
          </Thead>
          <Tbody>{number > 0 && tableRows}</Tbody>
        </Table>
      </TableContainer>
      <Flex direction={"column"}>
        <Text fontSize="sm" color="red.500" lineHeight="normal" mt={2}>
          {errors.data &&
            errorForm &&
            errorForm[Object.keys(errorForm)[0]].message}
        </Text>
        <Text fontSize="sm" color="red.500" lineHeight="normal" mt={2}>
          {errorDemand && "Demand exceed vehicle capacity"}
        </Text>
        <Text fontSize="lg" color="green.500" lineHeight="normal" mt={2}>
          {loadingPhase > 0 && "Successfull adding data"}
        </Text>
        <Text fontSize="lg" color="green.500" lineHeight="normal" mt={2}>
          {loadingPhase > 1 && "Successfull Calculating Route"}
        </Text>
        <Button
          mt={4}
          type="submit"
          isDisabled={number < 3 || errorDemand || errorForm || loading}
        >
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </Flex>
    </form>
  );
};

export default StoreDemand;
