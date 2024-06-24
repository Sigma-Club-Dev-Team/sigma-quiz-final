import React, { useEffect, useState } from "react";
import {  Button, Flex, } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const QuestionsBTN: React.FC = () => {
  // Define common button props
  const buttonProps = {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
    padding: "10px",
    mr: 2,
  };

  // Array of button labels from 1 to 30
  const buttonLabels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

  // State to store the indices of the buttons to be highlighted
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);

  useEffect(() => {
    const numberOfHighlights = 10; // Number of buttons to highlight
    const indices = new Set<number>();

    while (indices.size < numberOfHighlights) {
      const randomIndex = Math.floor(Math.random() * 30);
      indices.add(randomIndex);
    }

    setHighlightedIndices(Array.from(indices));
  }, []);

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
      {buttonLabels.map((label, index) => (
        <Button
          key={index}
          {...buttonProps}
          size="sm"
          bg={highlightedIndices.includes(index) ? "#FF000033" : "transparent"}
        >
          {label}
        </Button>
      ))}
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
