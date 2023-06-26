import RouteCalculationForm from "@/components/RouteCalculationForm";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";

const RouteCalculation = () => {
  return (
    <>
      <Head>
        <title>Route Calculation</title>
      </Head>
      <main>
        <Flex py={10} px={12} flexDirection="column">
          <RouteCalculationForm />
        </Flex>
      </main>
    </>
  );
};

export default RouteCalculation;
