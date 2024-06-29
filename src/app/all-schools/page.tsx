"use client";

import React from "react";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { contentData } from "../schools/[pageId]/content";
import SideBar from "../../components/sidebar";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import TopNav from "../schools/[pageId]/Topnav";
import RoundsBtn from "../schools/[pageId]/RoundsBtn";
import Link from "next/link";

const DetailsPage: React.FC = () => {
  const router = useRouter();

  // Function to handle navigation back
  const goBack = () => {
    router.back();
  };

  return (
    <Flex>
      <SideBar />
      <Box minW={{ base: "100%", md: "80%" }} marginLeft={{ base: "0%", md: "20%" }} px={{ base: "4", md: "10" }}>
        <Box fontFamily={"Poppins"}>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Back"
            boxSize={8}
            size={"lg"}
            position="absolute"
            top="20px"
            left="20px"
            bg="transparent"
            onClick={goBack}
          />
          <TopNav title="" />
          <RoundsBtn />

          {contentData.map((content) => (
            <Box key={content.id}>
              <Flex justifyContent={"space-between"} width={{ base: "100%", md: "800px" }} mt={2} px={{ base: "6", md: "0" }}>
                <Box>
                  <Text fontSize="xl">{content.title}</Text>
                </Box>
                <Box>
                  <Link href={`/schools/${content.id}`}>
                    <Flex alignItems="center" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                      <Text>See more</Text>
                      <ChevronRightIcon />
                    </Flex>
                  </Link>
                </Box>
              </Flex>
              <Flex direction={{ base: "column", md: "row" }} alignItems={"center"} mb={8}>
                <Box
                  order={{ base: 1, md: 2 }}
                  width={{ base: "150px", md: "200px" }}
                  height={{ base: "150px", md: "200px" }}
                  borderRadius="50%"
                  bg="#ffffff"
                  my={{ base: 4, md: 0 }}
                  mx={{ base: "auto", md: 10 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
                >
                  <Text fontSize={{ base: "2xl", md: "3xl" }} color="#2FD790">
                    2nd
                  </Text>
                </Box>

                <Flex
                  order={{ base: 2, md: 1 }}
                  width={{ base: "90%", md: "800px" }}
                  height="auto"
                  bg="white"
                  boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
                  borderRadius="10px"
                  alignItems="center"
                  mb={{ base: 4, md: 0 }}
                  mr={{ base: 0, md: 4 }}
                  flexDirection={{ base: "column", md: "row" }}
                  gap={"80px"}
                  p={"30px"}
                >
                  <Box
                    width={{ base: "200px", md: "200px" }}
                    height={{ base: "200px", md: "200px" }}
                    borderRadius="50%"
                    bg="#ffffff"
                    my={{ base: 4, md: 0 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
                  >
                    <Text fontSize={{ base: "2xl", md: "3xl" }} color="#2FD790">
                      23/50
                    </Text>
                  </Box>

                  <Flex direction="column" justify="center" px={{ base: 4, md: 0 }} flexGrow={1}>
                    <TextRow title="Test" text="General Knowledge Quiz" />
                    <TextRow title="Questions Attempted" text="25" />
                    <TextRow title="Correct Answers" text="2" />
                    <TextRow title="Wrong Answers" text="3" />
                    <TextRow title="Overall Result" text="5" />
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

const TextRow = ({ title, text }: { title: string; text: string }) => {
  return (
    <Flex justify="space-between" mb={2} gap={4}>
      <Text color={"#757575"}>{title}</Text>
      <Text width={"50%"} textAlign={{ base: "end", md: "left" }}>
        {text}
      </Text>
    </Flex>
  );
};

export default DetailsPage;
