"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Sidebar from "../../../components/sidebar";
import TopNav from "./Topnav";
import RoundsSelector from "./RoundsSelector";
import AnsweredButtons from "./AnsweredQuestnBtn";
import ScoreBoard from "./ScoreBoard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getQuizDetails,
  Round,
  SchoolRoundParticipation,
} from "@/redux/slices/quiz/quizSlice";
import QuestionInfoSection from "./QuestionInfoSection";
import Preloader from "@/components/UI/Preloader";

const RoundPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { quizDetails, quizzesLoading, quiz, schoolRegistration } =
    useAppSelector((state) => state.quiz);
  const { superAdminInfo, token, isLoggedIn } = useAppSelector((state) => state.auth);
  const [selectedRound, setSelectedRound] =
    useState<SchoolRoundParticipation | null>(null);

  useEffect(() => {
    if (quiz) {
      dispatch(getQuizDetails(quiz.id));
    }
  }, []);

  const roundsMap = useMemo(() => {
    return new Map(
      (quizDetails?.rounds ?? [])?.map((round) => [round.id, round])
    );
  }, [quizDetails]);

  const roundParticipations = useMemo(() => {
    selectedRound?.score;
    if (roundsMap.size > 0) {
      return (schoolRegistration?.rounds ?? []).toSorted((a, b) => {
        const bRound = roundsMap.get(b.roundId)!;
        const aRound = roundsMap.get(a.roundId)!;
        return aRound.round_number - bRound.round_number;
      });
    } else {
      return [];
    }
  }, [schoolRegistration, roundsMap, quizDetails]);

  useEffect(() => {
    if (roundParticipations.length > 0) {
      setSelectedRound(roundParticipations[0]);
    }
  }, [roundParticipations, quizDetails]);

  useEffect(() => {
    if (schoolRegistration) {
     const updatedRound = schoolRegistration.rounds.find(round => round.id === selectedRound?.id);
     if (updatedRound) {
      setSelectedRound(updatedRound);
     }
    }
  }, [schoolRegistration])

  if (quizzesLoading) return <Preloader />;

  return (
    <Flex>
      <Sidebar />
      <Box
        minW={{ base: "100%", md: "80%" }}
        px={0}
        marginLeft={{ base: "0%", md: "20%" }}
      >
        <TopNav title={quizDetails?.title} />
        <RoundsSelector
          roundsMap={roundsMap}
          roundParticipations={roundParticipations}
          selectedRound={selectedRound}
          onRoundSelected={(round) => setSelectedRound(round)}
        />

        <Box px={8} fontFamily={"Poppins"}>
          <QuestionInfoSection
            selectedRound={selectedRound}
            roundsMap={roundsMap}
          />

          {selectedRound && (
            <Box mt={6}>
              <Text fontWeight={"500"} color={"#333333"}>
                Answered Questions
              </Text>
              <Flex
                mt={4}
                justify={"space-between"}
                direction={{ base: "column", md: "row" }}
              >
                <AnsweredButtons questions={selectedRound.answered_questions} />
                <Link href={`/schools/round/${schoolRegistration?.id}`}>
                  <Button rightIcon={<ChevronRightIcon />}>View Details</Button>
                </Link>
              </Flex>
            </Box>
          )}
        </Box>
        {schoolRegistration && selectedRound && (
          <ScoreBoard
            quizScore={schoolRegistration?.score}
            roundScore={selectedRound?.score}
            answeredQuestions={selectedRound?.answered_questions}
            quizRounds={schoolRegistration?.rounds}
            position={schoolRegistration?.position}
          />
        )}
      </Box>
    </Flex>
  );
};

export default RoundPage;
