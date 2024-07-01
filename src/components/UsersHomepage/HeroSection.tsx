"use client";

import React, { useEffect, useState } from "react";
import {
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Heading,
  Image,
  HStack,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import {
  ChakraProvider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getQuizzes, IQuiz, setQuiz } from "@/redux/slices/quiz/quizSlice";
import { useRouter } from "next/navigation";

function HeroSection() {
  const [quizObj, setQuizObj] = useState<IQuiz | null>(null)
  const { superAdminInfo, token } = useAppSelector((state) => state.auth);
  const { quizzes } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();
  const router = useRouter()

  
  const handleSetQuiz = () => {
    dispatch(setQuiz((quizObj)))
    router.push('/all-schools')
  }

  const buttonProps = {
    variant: "ghost",
    width: "7.5rem",
    height: "3rem",
    padding: ".75rem 1rem",
    borderRadius: "2.8125rem",
    fontWeight: "400",
    bgGradient: "linear(to-r, blackAlpha.600, transparent)",
    color: "#fffffF",
    _hover: {
      bgGradient: "linear(to-r, blackAlpha.900, transparent)",
      color: "white",
    },
  };

  useEffect(() => {
    dispatch(getQuizzes());
  }, []);

  return (
    <Flex
      w={"full"}
      h={{ base: "auto", md: "60.3rem" }}
      backgroundImage={"/assets/pngs/GroupPicture.png"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
      fontFamily={"Poppins"}
    >
      <VStack
        w={"full"}
        p={{ base: 4, md: 10 }}
        ml={{ base: 2, md: 4 }}
        align="flex-start"
      >
        <Stack
          direction="row"
          spacing={4}
          align="center"
          justify={"space-between"}
          w={"full"}
        >
          <Link href="/roseline-etuokwu/quiz-competition">
            <Image
              src={"/assets/pngs/SigmaLogo.png"}
              maxWidth={{ base: "150px", md: "200px", lg: "300px" }}
            />
          </Link>

          <Button
            as={Link}
            href="/sign-in"
            fontSize={"16px"}
            width="100px"
            padding="15px 16px"
            borderRadius="10px"
            bgColor={"white"}
            color={"#8F19E7"}
          >
            Log In
          </Button>
        </Stack>
        <Stack maxW={"2xl"} align={"flex-start"}>
          <Heading
            as="h1"
            fontSize={useBreakpointValue({
              md: "40px",
              lg: "3.5rem",
            })}
            color={"#ffffff"}
            fontFamily={"Poppins"}
            fontWeight={"700"}
            textAlign={"left"}
            lineHeight={{ base: "48px", md: "72px", lg: "90px" }}
            py={6}
          >
            Sigma Roseline Etuokwu Quiz Competition
          </Heading>

          <Text
            color={"white"}
            fontWeight={"500"}
            lineHeight={{ base: "1.7rem", md: "2.5rem" }}
            textAlign={"left"}
            fontSize="1.25rem"
            my={4}
          >
            Quiz competition involving secondary schools from all over Nigeria.
            Instilling the spirit of knowledge. Held @ the premier University;
            University of Ibadan
          </Text>
        </Stack>
        <Flex width="100%" direction={{ base: "column", lg: "row" }}>
          <Box flex="60%">
            <Stack
              direction={{ base: "column", md: "row" }}
              gap={"6px"}
              align={"flex-start"}
              fontSize={"20px"}
              lineHeight={"30px"}
              py={8}
            >
              <ChakraProvider>
                <Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      width={{ base: "100%", md: "411px" }} // Adjust width for mobile and larger screens
                      height={{ base: "auto", md: "60px" }}
                      padding={{ base: "16px", md: "16px 64px" }} // Adjust padding for mobile and larger screens
                      borderRadius="2.8125rem"
                      textAlign={"left"}
                      rightIcon={<ChevronDownIcon />}
                      bg="#ffffff"
                      color="#333333"
                    >
                      {quizObj ? quizObj.title : 'Select a quiz to view'}
                    </MenuButton>
                    <MenuList>
                      {quizzes.map((quiz, index) => (
                        <MenuItem onClick={()=>setQuizObj(quiz)} key={index}>{quiz.title}</MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              </ChakraProvider>

              <ChakraProvider>
                <Box position="relative">
                  <Button
                    width={{ base: "100%", md: "9.875rem" }}
                    height={{ base: "auto", md: "60px" }}
                    padding="16px 24px"
                    borderRadius="2.8125rem"
                    bg="#8F19E7"
                    color="white"
                    onClick={handleSetQuiz}
                    _hover={{
                      opacity: 0.8,
                    }}
                  >
                    View Quiz
                  </Button>
                </Box>
              </ChakraProvider>
            </Stack>

            <HStack py={6} fontFamily={"Poppins"}>
              <Button {...buttonProps}>2024 Quiz</Button>
              <Button {...buttonProps}>2023 Quiz</Button>
              <Button {...buttonProps}>2022 Quiz</Button>
            </HStack>
          </Box>

          {/* <Box flex="40%" mt={20}>
            <Box
              width="357px"
              height="auto"
              border={"none"}
              color={"#ffffff"}
              padding="1rem"
              borderRadius="16px"
              bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
            >
              <Flex align="center">
                <Avatar
                  name="John Doe"
                  src={"/assets/pngs/Avatar.png"}
                  size="md"
                />

                <Text ml="4">
                  Watch our documentary on the Quiz Competition
                </Text>
              </Flex>
              <Box pt={4}>
                <Button
                  as={Link}
                  href="/roseline-etuokwu/quiz-documentary"
                  leftIcon={<Icon as={FaPlay} />}
                  bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
                  fontSize={"12px"}
                  width="325px"
                  height="31px"
                  padding="6px 16px"
                  borderRadius="40px"
                >
                  Play Video
                </Button>
              </Box>
            </Box>
          </Box> */}
        </Flex>
      </VStack>
    </Flex>
  );
}

export default HeroSection;
