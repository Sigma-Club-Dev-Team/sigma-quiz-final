"use client"
import React, { useState, useEffect, useMemo } from "react";
import { Box, Text, Flex, Button, VStack, Heading, IconButton } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  SchoolRegistrationElement,
  Round,
  getQuizDetails,
  SchoolRoundParticipation,
} from "@/redux/slices/quiz/quizSlice";
import TopNav from "../Topnav";
import SchoolResultSummary from "../../../all-schools/SchoolResutSummary";
import AllSchoolsRoundsSelector from "@/app/all-schools/RoundsSelector";
import {
  getAllAnsweredQuestions,
  getAllRightAnsweredQuestions,
  getAllWrongAnsweredQuestions,
} from "@/lib/utilityFunctions";
import AnsweredButtons from "../AnsweredQuestnBtn";
import Preloader from "@/components/UI/Preloader";
import SchoolDetailsRoundSelector from "./SchoolDetailsRoundsSelector";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const SchoolDetailsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter(); // Initialize useRouter hook
  const pathname = usePathname();
  const schoolregistrationID = pathname.split("/").pop();
  const { quizDetails, quiz } = useAppSelector((state) => state.quiz);
  const [schoolData, setSchoolData] = useState<SchoolRegistrationElement | null>(
    null
  );
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [viewOverall, setViewOverall] = useState(true);

  useEffect(() => {
    if (quiz && !quizDetails) {
      console.log("Fetching quiz details for quiz ID:", quiz.id);
      dispatch(getQuizDetails(quiz.id));
    }
  }, [dispatch, quiz, quizDetails]);

  useEffect(() => {
    console.log("Checking school registration ID:", schoolregistrationID);
    console.log("Quiz details:", quizDetails);

    if (schoolregistrationID && quizDetails?.schoolRegistrations) {
      const school = quizDetails.schoolRegistrations.find(
        (registration) => registration.id === schoolregistrationID
      );
      console.log("Found school data:", school);
      setSchoolData(school ?? null);
    }
  }, [schoolregistrationID, quizDetails?.schoolRegistrations]);

  const roundsMap = useMemo(() => {
    const map = new Map<string, Round>();
    quizDetails?.rounds.forEach((round) => {
      map.set(round.id, round);
    });
    return map;
  }, [quizDetails]);

  if (!schoolData) {
    return <Preloader />;
  }

  const roundSummary = selectedRound || schoolData.rounds;

  const registration = quizDetails?.schoolRegistrations.find(
    (reg) => reg.id === schoolData.id
  );

  const schoolRoundParticipation = registration?.rounds.find(
    (participation) => participation.roundId === selectedRound?.id
  );

  console.log({ registration, schoolRoundParticipation, id: schoolData.id });

  console.log("Rounds Participation:: ", selectedRound);

  return (
    <Box p={8}>
      <TopNav title="" />
      <Flex alignItems="center" mt={8} >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} cursor={"pointer"} onClick={() => router.back()}>
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon   />}
          variant="ghost"
          colorScheme="gray"
         
        />
      </Box>
        <Heading ml={2}>
          {schoolData.school.name}
        </Heading>
      </Flex>
      {quizDetails && registration && (
        <SchoolDetailsRoundSelector
          selectedRound={selectedRound}
          rounds={registration.rounds.map((rds) => roundsMap.get(rds.roundId)!)}
          onRoundSelected={(round) => setSelectedRound(round)}
        />
      )}
      {selectedRound ? (
        schoolRoundParticipation && (
          <SchoolResultSummary
            testName={selectedRound.name}
            position={schoolRoundParticipation?.position}
            score={schoolRoundParticipation?.score! ?? 0}
            corrects={
              schoolRoundParticipation?.answered_questions?.filter(
                (answeredQuestions) => answeredQuestions.answered_correctly
              )! ?? []
            }
            wrongs={
              schoolRoundParticipation?.answered_questions?.filter(
                (answeredQuestions) => !answeredQuestions.answered_correctly
              )! ?? []
            }
            answeredQuestions={
              schoolRoundParticipation?.answered_questions! ?? []
            }
          />
        )
      ) : registration ? (
        <SchoolResultSummary
          testName={"Overall"}
          position={registration?.position}
          score={registration?.score}
          corrects={getAllRightAnsweredQuestions(registration?.rounds)}
          wrongs={getAllWrongAnsweredQuestions(registration?.rounds)}
          answeredQuestions={getAllAnsweredQuestions(registration?.rounds)}
        />
      ) : (
        "School Registration not found"
      )}

      <VStack gap={2} alignItems={"flex-start"}>
        {schoolData?.rounds.map((round, index) => (
          <Flex key={round.id} width={{ base: "100%", md: "65%" }}>
            <Flex flex={1}>
              {round.answered_questions.length < 1 ? (
                <Text color={"red"}>No Questions Answered Yet</Text>
              ) : (
                <AnsweredButtons questions={round.answered_questions} />
              )}
            </Flex>
            <Button ml={4}>{roundsMap.get(round.roundId)?.name}</Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default SchoolDetailsPage;
