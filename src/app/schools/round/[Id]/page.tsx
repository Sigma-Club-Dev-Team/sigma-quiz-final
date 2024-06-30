"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Box, Text, Flex, Button, VStack, Heading } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
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

const SchoolDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const schoolregistrationID = pathname.split("/").pop();
  const { quizDetails, quiz } = useAppSelector((state) => state.quiz);
  const [schoolData, setSchoolData] =
    useState<SchoolRegistrationElement | null>(null);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);

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
    return <Box>Loading...</Box>;
  }

  const roundSummary = selectedRound || schoolData.rounds;

  const schoolRoundParticipation = selectedRound?.schoolParticipations.filter(
    (participation) => participation.schoolRegistrationId === schoolData.id
  )[0];

  const registration = quizDetails?.schoolRegistrations.filter(
    (reg) => reg.id === schoolData.id
  )[0];
  console.log({ registration, schoolRoundParticipation, id: schoolData.id });

  console.log("Quiz Details:: ", quizDetails);

  return (
    <Box p={8}>
      <TopNav title='' />
      <Heading mt={8}>
      {schoolData.school.name}
      </Heading>
      {quizDetails && (
        <AllSchoolsRoundsSelector
          selectedRound={selectedRound}
          rounds={quizDetails?.rounds}
          onRoundSelected={(round) => setSelectedRound(round)}
        />
      )}
      {selectedRound ? (
        <SchoolResultSummary
          testName={selectedRound.name}
          position={`${schoolRoundParticipation?.position}`}
          score={schoolRoundParticipation?.score! ?? 0}
          corrects={
            schoolRoundParticipation?.answered_questions.filter(
              (answeredQuestions) => answeredQuestions.answered_correctly
            )! ?? []
          }
          wrongs={
            schoolRoundParticipation?.answered_questions.filter(
              (answeredQuestions) => !answeredQuestions.answered_correctly
            )! ?? []
          }
          answeredQuestions={
            schoolRoundParticipation?.answered_questions! ?? []
          }
        />
      ) : registration ? (
        <SchoolResultSummary
          testName={"Overall"}
          position={`${registration?.position}`}
          score={registration?.score}
          corrects={getAllRightAnsweredQuestions(registration?.rounds)}
          wrongs={getAllWrongAnsweredQuestions(registration?.rounds)}
          answeredQuestions={getAllAnsweredQuestions(registration?.rounds)}
        />
      ) : (
        "School Registration not found"
      )}

      <VStack gap={2} alignItems={'flex-start'}>
        {schoolData?.rounds.map((round, index) => (
          <Flex key={round.id} width={{base: '100%', md: '65%'}}>
            <Flex flex={1}>
              {round.answered_questions.length < 1 ? (
                <Text color={"red"}>No Questions Answered Yet</Text>
              ) : (
                <AnsweredButtons questions={round.answered_questions} />
              )}
            </Flex>
            <Button ml={4}>Round {index + 1}</Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default SchoolDetailsPage;
