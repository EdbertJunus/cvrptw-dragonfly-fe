import HelpItem from "@/components/HelpItem";
import { comparison_res_data, home_data, route_calc_data } from "@/data/help";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import { IoArrowUpCircleOutline } from "react-icons/io5";
const Help = () => {
  const [page, setPage] = useState({ data: home_data, type: "home" });
  const isBrowser = () => typeof window !== "undefined";
  const [position, setPosition] = useState();

  const updatePosition = () => {
    setPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Help</title>
      </Head>
      <main>
        <Box p={8}>
          <Heading as="h3" size="lg" mb={8}>
            Help
          </Heading>
          <Breadcrumb separator="-">
            <BreadcrumbItem isCurrentPage={page.type == "home"}>
              <BreadcrumbLink
                onClick={() => setPage({ data: home_data, type: "home" })}
                fontSize="2xl"
                color={
                  page.type == "home" ? "blue.500" : "chakra-body-bg._light"
                }
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage={page.type == "route_calc"}>
              <BreadcrumbLink
                onClick={() =>
                  setPage({ data: route_calc_data, type: "route_calc" })
                }
                fontSize="2xl"
                color={
                  page.type == "route_calc"
                    ? "blue.500"
                    : "chakra-body-bg._light"
                }
              >
                Route Calculation
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage={page.type == "comparison"}>
              <BreadcrumbLink
                fontSize="2xl"
                onClick={() =>
                  setPage({ data: comparison_res_data, type: "comparison" })
                }
                color={
                  page.type == "comparison"
                    ? "blue.500"
                    : "chakra-body-bg._light"
                }
              >
                Comparison Result
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex mt={5}>
            <HelpItem data={page.data} />
          </Flex>
        </Box>
        {position >= 0 && (
          <Box
            position={"fixed"}
            bottom={"20px"}
            right={"5%"}
            _hover={{ cursor: "pointer" }}
            onClick={scrollToTop}
          >
            <Icon as={IoArrowUpCircleOutline} boxSize={14} />
          </Box>
        )}
      </main>
    </>
  );
};

export default Help;
