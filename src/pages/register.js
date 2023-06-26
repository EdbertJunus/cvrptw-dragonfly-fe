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
} from "@chakra-ui/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import instance from "../api";
import { useRouter } from "next/router";
import { useState } from "react";
import { capitalizeFirstChar } from "@/util";

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  const [errForm, setErrForm] = useState("");
  const {
    handleSubmit,
    register,
    unregister,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = (values) => {
    delete values.confirm_password;
    instance
      .post("register", values)
      .then((response) => {
        setErrForm("");
        toast({
          title: "Register Success",
          description: "You will be directed to login soon.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        const timer = setTimeout(() => {
          router.push("/login");
        }, 1000);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        if (error.response.status == 400) {
          let err_message = error.response.data.email[0];
          err_message = capitalizeFirstChar(err_message);

          setErrForm(err_message);
        }
      });
    unregister();
  };
  return (
    <>
      <Head>
        <title>Register</title>
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
            <Heading mb={8}>Register</Heading>
            <Flex boxShadow="base" p="6" rounded="md" bg="white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={3} isInvalid={errors.name}>
                  <FormLabel htmlFor="name" mb={0}>
                    Name
                  </FormLabel>
                  <Input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl mb={3} isInvalid={errors.email}>
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
                <FormControl mb={3} isInvalid={errors.password}>
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
                <FormControl mb={3} isInvalid={errors.confirm_password}>
                  <FormLabel htmlFor="confirm_password" mb={0}>
                    Confirm Password
                  </FormLabel>
                  <Input
                    id="confirm_password"
                    type="password"
                    {...register("confirm_password", {
                      required: "Confirm Password is required",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Your password do not match";
                        }
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.confirm_password && errors.confirm_password.message}
                  </FormErrorMessage>
                </FormControl>
                <Text mt={2}>
                  Already have an account ?
                  <Link pl={2} as={NextLink} color={"teal.500"} href="/login">
                    Login now
                  </Link>
                </Text>

                <Button mt={4} isLoading={isSubmitting} type="submit">
                  Register
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

export default Register;
