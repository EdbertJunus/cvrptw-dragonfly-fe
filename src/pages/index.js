import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import VehicleInfo from "@/components/VehicleInfo";
import StoreList from "@/components/StoreList";

// const inter = Inter({ subsets: ["latin"] });

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dragon App</title>
      </Head>
      <main>
        <Flex py={10} px={12} flexDirection="column">
          <StoreList />
          <VehicleInfo />
        </Flex>
      </main>
    </>
  );
};

export default Dashboard;
