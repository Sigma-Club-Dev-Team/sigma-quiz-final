// components/SchoolResultSummary.tsx

import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { Question, QuizStatus } from "@/redux/slices/quiz/quizSlice";
import { MapPosition } from "@/lib/constants";
import { useAppSelector } from "@/redux/hooks";

interface SchoolResultSummaryProps {
  testName: string;
  position: number;
  score: number;
  answeredQuestions: Question[];
  corrects: Question[];
  wrongs: Question[];
}

const SchoolResultSummary: React.FC<SchoolResultSummaryProps> = ({
  testName,
  position,
  score,
  answeredQuestions,
  corrects,
  wrongs,
}) => {
  const { quizDetails } = useAppSelector(state => state.quiz)
  return (
    <Flex direction={{ base: "column", md: "row" }} alignItems="center" mb={8}>
      <Box
        order={{ base: 1, md: 2 }}
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
        filter={quizDetails?.status !== QuizStatus.Completed ? 'blur(5px)' : ''}
      >
        <Text fontSize={{ base: "2xl", md: "3xl" }} color="#2FD790">
          {MapPosition[position] || ""}
        </Text>
      </Box>

      <Flex
        order={{ base: 2, md: 1 }}
        width={{ base: "90%", md: "800px" }}
        height="auto"
        bg="white"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
        borderRadius="10px"
        alignItems="center"
        mb={{ base: 4, md: 0 }}
        mr={{ base: 0, md: 4 }}
        flexDirection={{ base: "column", md: "row" }}
        gap={"80px"}
        p={"30px"}
      >
        <Box
          width={{ base: "200px", md: "200px" }}
          height={{ base: "200px", md: "200px" }}
          borderRadius="50%"
          bg="#ffffff"
          my={{ base: 4, md: 0 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
        >
          <Text fontSize={{ base: "2xl", md: "3xl" }} color="#2FD790">
            {`${corrects.length}/${answeredQuestions.length}`}
          </Text>
        </Box>

        <Flex
          direction="column"
          justify="center"
          px={{ base: 4, md: 0 }}
          flexGrow={1}
        >
          <TextRow title="Test" text={testName} />
          <TextRow
            title="Questions Attempted"
            text={answeredQuestions.length}
          />
          <TextRow title="Correct Answers" text={corrects.length} />
          <TextRow title="Wrong Answers" text={wrongs.length} />
          {quizDetails?.status === QuizStatus.Completed && <TextRow title="Score" text={score.toString()} />}
        </Flex>
      </Flex>
    </Flex>
  );
};

const TextRow: React.FC<{ title: string; text: string | number }> = ({
  title,
  text,
}) => {
  return (
    <Flex justify="space-between" mb={2} gap={4}>
      <Text color="#757575">{title}</Text>
      <Text width="50%" textAlign={{ base: "end", md: "left" }}>
        {text}
      </Text>
    </Flex>
  );
};

export default SchoolResultSummary;
