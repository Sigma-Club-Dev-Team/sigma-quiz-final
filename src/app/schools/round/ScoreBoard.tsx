import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Question,
  SchoolRoundParticipation,
} from "@/redux/slices/quiz/quizSlice";

interface CircleBoxProps {
  text: number;
  bgColor?: string;
}

const CircleBox: React.FC<CircleBoxProps> = ({ text, bgColor = "#ffffff" }) => {
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
    >
      <Text
        fontSize={{ base: "20px", md: "30px" }}
        fontWeight="bold"
        color="#02C309"
      >
        {text}
      </Text>
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

const MapPosition: { [key: number]: string } = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
  5: "5th",
  6: "6th",
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  quizScore,
  roundScore,
  answeredQuestions,
  quizRounds,
  position,
}) => {
  return (
    <Flex justify="space-around" px={8} py={10} flexWrap="wrap">
      <Box>
        <Text fontWeight="bold" textAlign="center">
          Scores
        </Text>
        <CircleBox text="30/60" />
        <CircleBox text={quizScore} />
      </Box>

      <Box>
        <Text fontWeight="bold" textAlign="center">
          Total
        </Text>
        <CircleBox text="45/90" />
        <CircleBox text="45/90" />
      </Box>

      <Box>
        <Text fontWeight="bold" textAlign="center">
          Position
        </Text>
        <CircleBox text={MapPosition[position]} bgColor="#8F19E7" />
      </Box>
    </Flex>
  );
};

export default ScoreBoard;
