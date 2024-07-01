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

  return (
    <Flex justify="space-around" px={8} py={10} flexWrap="wrap">
      <Box>
        <Text fontWeight="bold" textAlign="center">
          Scores
        </Text>
        <CircleBox
          text={`${roundCorrectlyAnswered} / ${roundTotalQuestions}`}
        />
        <CircleBox blur={quizDetails?.status !== QuizStatus.Completed} text={quizDetails?.status !== QuizStatus.Completed ? '##' : roundScore.toString()} />
      </Box>

      <Box>
        <Text fontWeight="bold" textAlign="center">
          Total
        </Text>
        <CircleBox text={`${correctlyAnswered} / ${totalQuestions}`} />
        <CircleBox blur={quizDetails?.status !== QuizStatus.Completed} text={quizDetails?.status !== QuizStatus.Completed ? '##' : totalScore.toString()} />
      </Box>

      <Box>
        <Text fontWeight="bold" textAlign="center">
          Position
        </Text>
        {<CircleBox blur={quizDetails?.status !== QuizStatus.Completed} text={quizDetails?.status !== QuizStatus.Completed ? '##' : MapPosition[position] || ""} bgColor="#8F19E7" />}
      </Box>
    </Flex>
  );
};

export default ScoreBoard;
