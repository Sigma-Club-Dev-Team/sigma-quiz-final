"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Text, Flex, Button, VStack } from '@chakra-ui/react';
import { useParams, usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { SchoolRegistrationElement, Round, getQuizDetails, SchoolRoundParticipation } from '@/redux/slices/quiz/quizSlice';
import TopNav from '../Topnav';
import SchoolResultSummary from '../../../all-schools/SchoolResutSummary';
import RoundsSelector from '../../round/RoundsSelector';
import AnsweredButtons from '../AnsweredQuestnBtn';
import AllSchoolsRoundsSelector from '@/app/all-schools/RoundsSelector';
import { getAllAnsweredQuestions, getAllRightAnsweredQuestions, getAllWrongAnsweredQuestions } from '@/lib/utilityFunctions';

const SchoolDetailsPage = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const params = useParams()
  const { id } = params
  const schoolregistrationID = pathname.split('/').pop();
  const { quizDetails, quiz } = useAppSelector((state) => state.quiz);
  const [schoolData, setSchoolData] = useState<SchoolRegistrationElement | null>(null);
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
    quizDetails?.rounds.forEach(round => {
      map.set(round.id, round);
    });
    return map;
  }, [quizDetails]);

  if (!schoolData) {
    return <Box>Loading...</Box>;
  }

  const roundSummary = selectedRound || schoolData.rounds;

  const schoolRoundParticipation = selectedRound?.schoolParticipations.filter((participation) => participation.schoolRegistrationId === id)[0]

  const registration = quizDetails?.schoolRegistrations.filter(reg => reg.id === id)[0]
  console.log({registration, schoolRoundParticipation, id})

  return (
    <Box p={8}>
      <TopNav title={schoolData.school.name} />
      {quizDetails && <AllSchoolsRoundsSelector
        selectedRound={selectedRound}
        rounds={quizDetails?.rounds}
        onRoundSelected={(round) => setSelectedRound(round)}
      />}
      {selectedRound ? (
        <SchoolResultSummary
          testName={selectedRound.name}
          position={`${schoolRoundParticipation?.position}`}
          score={schoolRoundParticipation?.score! ?? 0}
          corrects={schoolRoundParticipation?.answered_questions.filter((answeredQuestions) => answeredQuestions.answered_correctly)! ?? []}
          wrongs={schoolRoundParticipation?.answered_questions.filter((answeredQuestions) => !answeredQuestions.answered_correctly)! ?? []}
          answeredQuestions={schoolRoundParticipation?.answered_questions! ?? []}
        />
      ) : (
        registration ? <SchoolResultSummary
          testName={"Overall"}
          position={`${registration?.position}`}
          score={registration?.score}
          corrects={getAllRightAnsweredQuestions(registration?.rounds)}
          wrongs={getAllWrongAnsweredQuestions(registration?.rounds)}
          answeredQuestions={
            getAllAnsweredQuestions(registration?.rounds)
          }
        /> : 'School Registration not found'
      )}

     <VStack gap={2}>
     <Flex>
     <AnsweredButtons questions={[]}/>
     <Button>Round 1</Button>
     </Flex>
     <Flex>
     <AnsweredButtons questions={[]}/>
     <Button>Round 2</Button>
     </Flex>
     <Flex>
     <AnsweredButtons questions={[]}/>
     <Button>Round 3</Button>
     </Flex>
     <Flex>
     <AnsweredButtons questions={[]}/>
     <Button>Round 4</Button>
     </Flex>
     </VStack>
    </Box>
  );
};

export default SchoolDetailsPage;
