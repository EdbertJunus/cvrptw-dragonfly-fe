import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Input,
  Button,
  Text,
  Link,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import instance from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant";
import { useContext, useState } from "react";
import { AppContext } from "@/context/state";
import { useRouter } from "next/router";

const Login = () => {
  const { setUserId, setAuthenticated } = useContext(AppContext);
  const router = useRouter();
  const toast = useToast();
  const [errForm, setErrForm] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    unregister,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);

    instance
      .post("login", data)
      .then((response) => {
        localStorage.removeItem("ROUTE_ID");
        localStorage.removeItem("ROUTE_DETAIL");
        localStorage.removeItem("ROUTE_RESULT_DA");
        localStorage.removeItem("ROUTE_RESULT_PSO");

        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

        instance
          .get("get_user_id")
          .then((res) => {
            setUserId(res.data.user_id);
            setErrForm("");
            toast({
              title: "Login Success",
              description: "You will be directed to home soon.",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            const timer = setTimeout(() => {
              setAuthenticated(true);
              router.push("/");
              setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setErrForm(error.response.data.detail);
        setLoading(false);
      });

    unregister(["email", "password"]);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <Box w="100%" p={4}>
          <Flex
            w="100%"
            h="100%"
            flexDirection={"column"}
            alignItems={"center"}
            mt={28}
          >
            <Heading mb={8}>Login</Heading>
            <Flex boxShadow="base" p="6" rounded="md" bg="white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email} mb={3}>
                  <FormLabel htmlFor="email" mb={0}>
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password} mb={3}>
                  <FormLabel htmlFor="password" mb={0}>
                    Password
                  </FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Text mt={2}>
                  Don't have an account ?
                  <Link pl={2} as={NextLink} color={"red.500"} href="/register">
                    Register now
                  </Link>
                </Text>

                <Button mt={4} isLoading={isSubmitting} type="submit">
                  {loading ? <Spinner /> : "Login"}
                </Button>
                <Text
                  color={"red.500"}
                  fontSize={"sm"}
                  mt={2}
                  lineHeight={"normal"}
                >
                  {errForm}
                </Text>
              </form>
            </Flex>
          </Flex>
        </Box>
      </main>
    </>
  );
};

export default Login;
