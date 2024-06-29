// components/SchoolResultSummary.tsx

import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

interface SchoolResultSummaryProps {
  testName: string;
  position: string;
  score: number;
  answeredQuestions: any[];
}

const SchoolResultSummary: React.FC<SchoolResultSummaryProps> = ({
  testName,
  position,
  score,
  answeredQuestions,
}) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      mb={8}
    >
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
      >
        <Text fontSize={{ base: "2xl", md: "3xl" }} color="#2FD790">
          {position}
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
            23/50
          </Text>
        </Box>

        <Flex direction="column" justify="center" px={{ base: 4, md: 0 }} flexGrow={1}>
          <TextRow title="Test" text={testName} />
          <TextRow title="Questions Attempted" text={answeredQuestions.length} />
          <TextRow title="Correct Answers" text="2" />
          <TextRow title="Wrong Answers" text="3" />
          <TextRow title="Overall Result" text={score.toString()} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const TextRow: React.FC<{ title: string; text: string | number }> = ({ title, text }) => {
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
