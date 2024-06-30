"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Text, Flex, Button, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { SchoolRegistrationElement, Round, getQuizDetails, SchoolRoundParticipation } from '@/redux/slices/quiz/quizSlice';
import TopNav from '../Topnav';
import SchoolResultSummary from '../../../all-schools/SchoolResutSummary';
import RoundsSelector from '../../round/RoundsSelector';
import AnsweredButtons from '../AnsweredQuestnBtn';

const SchoolDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const schoolregistrationID = pathname.split('/').pop();
  const { quizDetails, quiz } = useAppSelector((state) => state.quiz);
  const [schoolData, setSchoolData] = useState<SchoolRegistrationElement | null>(null);
  const [selectedRound, setSelectedRound] = useState<SchoolRoundParticipation | null>(null);

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

  const handleRoundSelected = (newRound: SchoolRoundParticipation) => {
    setSelectedRound(newRound);
  };

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

  return (
    <Box p={8}>
      <TopNav title={schoolData.school.name} />
      <RoundsSelector
        selectedRound={selectedRound}
        roundsMap={roundsMap}
        roundParticipations={schoolData.rounds}
        onRoundSelected={handleRoundSelected}
      />
      {selectedRound ? (
        <SchoolResultSummary
          testName="General knowledge quiz"
          position={selectedRound.position.toString()}
          score={selectedRound.score}
          answeredQuestions={selectedRound.answered_questions}
        />
      ) : (
        <SchoolResultSummary
          testName="General knowledge quiz"
          position={schoolData.position.toString()}
          score={schoolData.score}
          answeredQuestions={schoolData.rounds.flatMap(round => round.answered_questions)}
        />
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
