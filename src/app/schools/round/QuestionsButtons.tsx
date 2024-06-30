import React from "react";
import {  Button, Flex, } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Question } from "@/redux/slices/quiz/quizSlice";

const QuestionsBTN = ({questions, selectedQuestion, onQuestionSelected}: {questions: Question[], 
  selectedQuestion: Question | null
  onQuestionSelected: (question: Question)=> void, }) => {

  // Define common button props
  const buttonProps = {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
    padding: "10px",
    mr: 2,
  };

  return (
    <Flex flexWrap="wrap" justify="center" align="center" alignItems="center">
      <Button
        {...buttonProps}
        size="sm"
        bg={"#f2f2f2"}
        leftIcon={<ChevronLeftIcon />}
        aria-label="Backward"
        mr={2}
      />
      {questions.toSorted((a, b) => a.question_number - b.question_number).map((question, index) => {
        const isSelected = selectedQuestion?.id === question.id;
        console.log("Question:: ", question.question_number, "Is selected:: ", isSelected);
        return (
          <Button
            key={index}
            {...buttonProps}
            size="sm"
            bg={ isSelected ? '#8F19E7' : !!question.answered_by ? "#FF000033" : "transparent"}
            _focus={{
              bg: '#8F19E7',
            }}
            onClick={() => onQuestionSelected(question)}
          >
            {question.question_number}
          </Button>
        )
      })}
      <Button
        {...buttonProps}
        size="sm"
        rightIcon={<ChevronRightIcon />}
        aria-label="Forward"
        bg={"#f2f2f2"}
        ml={2}
      />
    </Flex>
  );
};

export default QuestionsBTN;
