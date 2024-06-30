import React, { useEffect, useState } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Question } from "@/redux/slices/quiz/quizSlice";

interface AnsweredButtonsProps {
  showNavigation?: boolean;
  questions: Question[];
}

const AnsweredButtons: React.FC<AnsweredButtonsProps> = ({
  showNavigation = true,
  questions,
}) => {
  const totalButtons = 20;
  const initialVisibleButtons = 10;

  const [startIndex, setStartIndex] = useState(0);

  // Calculate end index based on start index and number of buttons to show
  const endIndex = startIndex + initialVisibleButtons;

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (endIndex < totalButtons) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <Flex wrap="wrap" justify="center" align="center" alignItems="center">
      {showNavigation && (
        <IconButton
          aria-label="Backward"
          icon={<ChevronLeftIcon />}
          variant="ghost"
          size="md"
          ml={2}
          onClick={handlePrevClick}
          disabled={startIndex === 0}
        />
      )}
      {questions
        .toSorted((a, b) => a.question_number - b.question_number)
        .map((question) => {
          return (
            <Box
              key={question.id}
              fontFamily="Poppins"
              fontSize="14px"
              fontWeight={500}
              padding="10px"
              mr={2}
              mb={2}
              color="white"
              // size="
              bg={question.answered_correctly ? "#1FAF38" : "#FF0000"}
            >
              {question.question_number}
            </Box>
          );
        })}
      {showNavigation && (
        <IconButton
          aria-label="Forward"
          icon={<ChevronRightIcon />}
          variant="ghost"
          size="md"
          mr={2}
          onClick={handleNextClick}
          disabled={endIndex >= totalButtons}
        />
      )}
    </Flex>
  );
};

export default AnsweredButtons;
