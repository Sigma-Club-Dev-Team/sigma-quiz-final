"use client";

import React, { useState } from "react";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { contentData } from "../schools/round/content";
import SideBar from "../../components/sidebar";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import TopNav from "../schools/round/Topnav";
import RoundsBtn from "../schools/round/RoundsSelector";
import Link from "next/link";
import SchoolResultSummary from "./SchoolResutSummary";
import { Round } from "@/redux/slices/quiz/quizSlice";
import { useAppSelector } from "@/redux/hooks";
import AllSchoolsRoundsSelector from "./RoundsSelector";

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const { quizDetails } =
    useAppSelector((state) => state.quiz);
  const [selectedRound, setSelectedRound] =
    useState<Round | null>(null);

  // Function to handle navigation back
  const goBack = () => {
    router.back();
  };

  return (
    <Flex>
      <SideBar />
      <Box
        minW={{ base: "100%", md: "80%" }}
        marginLeft={{ base: "0%", md: "20%" }}
        px={{ base: "4", md: "10" }}
      >
        <Box fontFamily={"Poppins"}>
          <TopNav title="" />
          <AllSchoolsRoundsSelector selectedRound={selectedRound} rounds={quizDetails?.rounds ?? []} onRoundSelected={(round) => setSelectedRound(round)}/>

          {contentData.map((content) => (
            <Box key={content.id}>
              <Flex
                justifyContent={"space-between"}
                width={{ base: "100%", md: "800px" }}
                mt={2}
                px={{ base: "6", md: "0" }}
              >
                <Box>
                  <Text fontSize="xl">{content.title}</Text>
                </Box>
                <Box>
                  <Link href={`/schools/${content.id}/test-details`}>
                    <Flex
                      alignItems="center"
                      color="blue.500"
                      _hover={{ textDecoration: "underline" }}
                    >
                      <Text>See more</Text>
                      <ChevronRightIcon />
                    </Flex>
                  </Link>
                </Box>
              </Flex>
              <SchoolResultSummary
                testName="General knowledge quiz"
                position="3"
                score={5}
                answeredQuestions={[]}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

const TextRow = ({ title, text }: { title: string; text: string | number }) => {
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
