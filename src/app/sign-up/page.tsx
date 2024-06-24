"use client"
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ChakraProvider,
} from "@chakra-ui/react";
import { FaChevronDown, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";


const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [selectedOption, setSelectedOption] = useState('Select');
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <ChakraProvider>
      <Flex
       
        alignItems="center"
        justifyContent="center"
        bg="white"
        fontFamily="Poppins"
        p={{ base: '.5rem', md: '1rem', lg: '2rem' }}
      >
        <Box
          width={{ base: '90%', md: '60%', lg: '849px' }}
          justifyContent="center"
          alignItems="center"
          height="auto"
          padding="2rem"
          borderRadius="1.875rem"
          boxShadow="lg"
          bg="#EDEDED"
          my={{base: '4', md:'0'}}
        >
          <Box py={4} display={{ base: 'block', md: "flex" }} gap={0} justifyContent={"space-between"}>
            <Box py={4}>
            <Link href="/roseline-etuokwu/quiz-competition">
              <Image src={'/assets/pngs/SigmaLogo.png'}  
                maxWidth={{ base: "150px", md: "200px", lg: "300px" }}
                width="100%"
                objectFit="contain"
                alt="Sigma Logo"
              />
              </Link>
            </Box>

            <Box>
              <Heading fontSize={{ base: '18px', md: "24px" }} textAlign="left" color="#8F19E7">
                Get Started
              </Heading>
              <Text color={"#333333"} fontSize={"1rem"}>
                Provide your information in 10 minutes
              </Text>
            </Box>
          </Box>
          <VStack align="stretch">
            <Box py={2}>
              <FormControl>
                <Box py={4} display={{ base: 'block', md: "flex" }} gap={4}>
                  <Box width={{ base: '100%', md: "50%" }}>
                    <FormLabel>First name</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        borderColor="#808080"
                        borderRadius="10px"
                        color="black"
                        fontSize={"16px"}
                        placeholder="Type here"
                        fontFamily="Poppins"
                      />
                    </InputGroup>
                  </Box>

                  <Box width={{ base: '100%', md: "50%" }}>
                    <FormLabel>Last Name</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        borderColor="#808080"
                        borderRadius="10px"
                        color="black"
                        fontSize={"16px"}
                        placeholder="Type here"
                        fontFamily="Poppins"
                      />
                    </InputGroup>
                  </Box>
                </Box>
              </FormControl>
              <FormControl data-aos="fade-up" data-aos-duration="2000">
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    borderColor="#808080"
                    borderRadius="10px"
                    color="black"
                    fontSize={"16px"}
                    placeholder="Type here"
                    fontFamily="Poppins"
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4} mb="3">
                <FormLabel display="flex" alignItems="center">
                  Password <FaLock style={{ marginLeft: '8px' }} />
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    borderColor="#808080"
                    fontSize={"16px"}
                    placeholder="Type here"
                    borderRadius="10px"
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
              <FormControl id="input-dropdown" py={2}>
                <FormLabel>
                  Role
                </FormLabel>
                <InputGroup>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<FaChevronDown />}
                      variant="outline"
                      borderColor="#808080"
                      width="100%"
                      textAlign="left"
                      _hover={{ bg: "gray.100" }}
                    >
                      {selectedOption}
                    </MenuButton>
                    <MenuList zIndex={3}>
                      <MenuItem onClick={() => handleSelectOption('Admin')}>
                        Admin
                      </MenuItem>
                      <MenuItem onClick={() => handleSelectOption('Schools')}>
                        Schools
                      </MenuItem>
                      <MenuItem onClick={() => handleSelectOption('Regular')}>
                        Regular
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </InputGroup>
              </FormControl>
            </Box>
            <Button
              width={{ base: '80%', md: '60%', lg: '35rem' }}
              height="3.75rem"
              left="50%"
              transform="translateX(-50%)"
              borderRadius=".625rem"
              opacity={0.8}
              bg="#8F19E7"
              color="white"
              _hover={{ opacity: 1 }}
              zIndex={1}
            >
              Sign Up
            </Button>
          </VStack>
          <Box
            display={"flex"}
            mx={"auto"}
            justifyContent={"center"}
            mt={10}
            gap={4}
          >
            <Text>Already have an account?</Text>
            <Link href="/roseline-etuokwu/login">
              <Text color="#8F19E7" textDecoration={"underline"}> Log In</Text>
            </Link>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default SignUp;
