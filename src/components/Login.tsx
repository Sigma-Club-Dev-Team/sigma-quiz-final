"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  Text,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import myAxios from "@/lib/myAxios";
import { SERVER_URL } from "@/lib/constants";
import { login } from "@/redux/slices/auth/authSlice";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [adminDetails, setAdminDetails] = useState({
    email: "",
    password: "",
  });
  const [warningState, setWarningState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { redirect } = useAppSelector((state) => state.auth);

  const handleUserDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAdminDetails({
      ...adminDetails,
      [e.target.name]: e.target.value,
    });
  };

  const loginAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!adminDetails.email || !adminDetails.password) {
      toast.message("All fields with * are required");
      setWarningState(true);
      setLoading(false);
      return 0;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(adminDetails.email)
    ) {
      toast.message("Invalid Email");
      setWarningState(true);
      setLoading(false);
      return 0;
    }

    const admin = {
      ...adminDetails,
      email: adminDetails.email.toLocaleLowerCase(),
    };
    myAxios
      .post(`${SERVER_URL}/api/auth/login`, admin)
      .then((response) => {
        toast.success("Login successful");
        dispatch(login(response.data));
        setLoading(false);
        router.push("/select-quiz");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
        setLoading(false);
        setErrorState(true);
      });

    // dispactch(logOut())
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg="white"
      fontFamily="Poppins"
      p={{ base: ".5rem", md: "1rem", lg: "2rem" }}
    >
      <Box
        width={{ base: "90%", md: "60%", lg: "849px" }}
        justifyContent="center"
        alignItems="center"
        height="auto"
        padding="2rem"
        borderRadius="1.875rem"
        boxShadow="lg"
        bg="#EDEDED"
        my={6}
      >
        <Box py={4}>
          <Link href="/roseline-etuokwu/quiz-competition">
            <Image
              src={"/assets/pngs/SigmaLogo.png"}
              maxWidth={{ base: "150px", md: "200px", lg: "300px" }}
              width="100%"
              objectFit="contain"
              alt="Sigma Logo"
            />
          </Link>
        </Box>
        <VStack align="stretch">
          <Box py={4}>
            <Heading fontSize={"24px"} textAlign="left" color="#8F19E7">
              Log in
            </Heading>
            <Text color={"#333333"} fontSize={"1rem"}>
              Provide your information in 10 minutes
            </Text>
          </Box>

          <Box py={6} mb={6}>
            <FormControl data-aos="fade-up" data-aos-duration="2000">
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  borderColor="#808080"
                  borderRadius="12px"
                  fontSize={"16px"}
                  placeholder="Type here"
                  fontFamily="Poppins"
                  name="email"
                  onChange={handleUserDetailsChange}
                  value={adminDetails.email}
                />
              </InputGroup>
            </FormControl>

            <FormControl mt={4} mb="3">
              <FormLabel display="flex" alignItems="center">
                Password <FaLock style={{ marginLeft: "8px" }} />
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  borderColor="#808080"
                  fontSize={"16px"}
                  placeholder="Type here"
                  borderRadius="12px"
                  name="password"
                  onChange={handleUserDetailsChange}
                  value={adminDetails.password}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleTogglePassword}
                    _hover={{ bg: "inherit" }}
                    _active={{ bg: "inherit" }}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
          <Button
            width={{ base: "80%", md: "60%", lg: "35rem" }}
            height="3.75rem"
            left="50%"
            transform="translateX(-50%)"
            borderRadius=".625rem"
            opacity={0.8}
            bg="#8F19E7"
            color="white"
            _hover={{ opacity: 1 }}
            zIndex={100}
            isLoading={loading}
            onClick={loginAction}
          >
            Log In
          </Button>
        </VStack>

        {/* <Box
          display={"flex"}
          mx={"auto"}
          justifyContent={"center"}
          mt={10}
          gap={4}
        >
          <Text>Don't have an account ?</Text>

          <Link href="/roseline-etuokwu/sign-up">
            <Text color="#8F19E7" textDecoration={"underline"}> Sign up</Text>
          </Link>
        </Box> */}
      </Box>
    </Flex>
  );
};

export default LoginPage;
