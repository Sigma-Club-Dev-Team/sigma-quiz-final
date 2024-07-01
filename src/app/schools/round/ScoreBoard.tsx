import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Question,
  QuizStatus,
  SchoolRoundParticipation,
} from "@/redux/slices/quiz/quizSlice";
import { MapPosition } from "@/lib/constants";
import { useAppSelector } from "@/redux/hooks";

interface CircleBoxProps {
  text: string;
  bgColor?: string;
  blur?: boolean, 
}

const CircleBox: React.FC<CircleBoxProps> = ({ text, bgColor = "#ffffff", blur }) => {
  // Check if the text contains " / "
  
  const hasSeparator = text.includes(" / ");
  let content;

  if (hasSeparator) {
    const [part1, part2] = text.split(" / ");
    content = (
      <Text
        fontSize={{ base: "20px", md: "30px" }}
        fontWeight="bold"
        color="#02C309"
      >
        {part1}{" "}
        <Text as="span" color="gray.500">
          / {part2}
        </Text>
      </Text>
    );
  } else {
    content = (
      <Text
        fontSize={{ base: "20px", md: "30px" }}
        fontWeight="bold"
        color="#02C309"
      >
        {text}
      </Text>
    );
  }
  return (
    <Box
      width={{ base: "100px", md: "145px" }}
      height={{ base: "100px", md: "145px" }}
      borderRadius="50%"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      my={6}
      filter={!blur? "" : "blur(5px)"}
    >
      {content}
    </Box>
  );
};

type ScoreBoardProps = {
  quizScore: number;
  roundScore: number;
  position: number;
  answeredQuestions: Question[];
  quizRounds: SchoolRoundParticipation[];
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  roundScore,
  answeredQuestions,
  quizRounds,
  position,
}) => {
  let roundTotalQuestions = 0;
  let roundCorrectlyAnswered = 0;
  let totalQuestions = 0;
  let correctlyAnswered = 0;
  let totalScore = 0;

  const { quizDetails } = useAppSelector(state => state.quiz)
  const { isLoggedIn } = useAppSelector(state => state.auth)

  for (const question of answeredQuestions) {
    roundTotalQuestions++;
    if (question.answered_correctly) {
      roundCorrectlyAnswered++;
    }
  }

  for (const round of quizRounds) {
    for (const question of round.answered_questions) {
      if (question.id) {
        // Checking if the question object is not empty
        totalQuestions++;
        if (question.answered_correctly) {
          correctlyAnswered++;
        }
      }
    }
  }

  for (const round of quizRounds) {
    totalScore += round.score;
  }

  const blurCondition = !isLoggedIn && (quizDetails?.status !== QuizStatus.Completed)

  return (
    <Flex justify="space-around" px={8} py={10} flexWrap="wrap">
      <Flex direction={'column'} alignItems={'center'}>
        <Text fontWeight="bold" textAlign="center">
        Answered Questions in Round
        </Text>
        <CircleBox
          text={`${roundCorrectlyAnswered} / ${roundTotalQuestions}`}
        />
        <Text fontWeight="bold" textAlign="center">
          Score in Round
        </Text>
        <CircleBox blur={blurCondition} text={blurCondition ? '##' : roundScore.toString()} />
      </Flex>

      <Flex direction={'column'} alignItems={'center'}>
        <Text fontWeight="bold" textAlign="center">
          Answered Questions in Quiz
        </Text>
        <CircleBox text={`${correctlyAnswered} / ${totalQuestions}`} />
        <Text fontWeight="bold" textAlign="center">
          Score in Quiz
        </Text>
        <CircleBox blur={blurCondition} text={blurCondition ? '##' : totalScore.toString()} />
      </Flex>

      <Flex direction={'column'} alignItems={'center'}>
        <Text fontWeight="bold" textAlign="center">
          Position
        </Text>
        {<CircleBox blur={blurCondition} text={blurCondition ? '##' : MapPosition[position] || ""} bgColor="#8F19E7" />}
      </Flex>
    </Flex>
  );
};

export default ScoreBoard;
