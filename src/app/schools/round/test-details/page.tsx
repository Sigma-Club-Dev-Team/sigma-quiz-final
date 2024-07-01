"use client";

import React, { useMemo, useState } from "react";
import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { contentData } from "../content";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import TopNav from "../Topnav";
import AnsweredButtons from "../AnsweredQuestnBtn";
import RoundsSelector from "../RoundsSelector";
import { useAppSelector } from "@/redux/hooks";
import { SchoolRoundParticipation } from "@/redux/slices/quiz/quizSlice";

const DetailsPage: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { quizDetails, schoolRegistration } = useAppSelector(
    (state) => state.quiz
  );
  const [selectedRound, setSelectedRound] =
    useState<SchoolRoundParticipation | null>(null);

  const roundsMap = useMemo(() => {
    return new Map(
      (quizDetails?.rounds ?? [])?.map((round) => [round.id, round])
    );
  }, [quizDetails]);

  const roundParticipations = useMemo(() => {
    selectedRound?.score;
    if (roundsMap) {
      return (schoolRegistration?.rounds ?? []).toSorted((a, b) => {
        const bRound = roundsMap.get(b.roundId)!;
        const aRound = roundsMap.get(a.roundId)!;
        return aRound.round_number - bRound.round_number;
      });
    } else {
      return [];
    }
  }, [schoolRegistration, roundsMap]);

  const parts = pathname.split("/");
  const pageId = parts[2];

  const pageContent = contentData.find((content) => content.id === pageId);

  // if (!pageContent) {
  //   return <div>No data found</div>;
  // }

  const goBack = () => {
    router.back();
  };

  return (
    <Box px={{ base: 4, md: 10 }} fontFamily={"Poppins"}>
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
      {/* <TopNav title={pageContent.title} /> */}
      <RoundsSelector
        roundsMap={roundsMap}
        roundParticipations={roundParticipations}
        selectedRound={selectedRound}
        onRoundSelected={(round) => setSelectedRound(round)}
      />

      <Flex direction={{ base: "column", md: "row" }} alignItems={"center"}>
        <Box
          width={{ base: "90%", md: "700px" }}
          height="auto"
          bg="white"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
          borderRadius="10px"
          display="flex"
          alignItems="center"
          mb={{ base: 4, md: 0 }}
          mr={{ base: 0, md: 4 }}
          flexDirection={{ base: "column", md: "row" }}
          p={10}
        >
          <Box
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
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="#2FD790"
            >
              23/50
            </Text>
          </Box>

          <Flex direction="column" justify="center" px={{ base: 4, md: 0 }}>
            <Box
              mb={4}
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Text>Test</Text>
              <Text>Round 1</Text>
            </Box>
            <Flex direction="column">
              <Flex justify="space-between" mb={2} gap={4}>
                <Text color={"#757575"}>Questions Attempted</Text>
                <Text fontWeight="bold"> 1</Text>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text color={"#757575"}>Correct Answers</Text>
                <Text fontWeight="bold"> 2</Text>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text color={"#757575"}>Wrong Answers</Text>
                <Text fontWeight="bold"> 3</Text>
              </Flex>
              <Flex justify="space-between" mb={2}>
                <Text color={"#757575"}>Bonus Answers</Text>
                <Text fontWeight={"700"}> 4</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color={"#757575"}>Overall Result</Text>
                <Text fontWeight={"bold"}> 5</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Box>
          <AnsweredButtons questions={[]} />
        </Box>
      </Flex>
    </Box>
  );
};

export default DetailsPage;
