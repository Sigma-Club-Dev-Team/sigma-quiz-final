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
  const buttonLabels = Array.from({ length: 20 }, (_, i) => (i + 1).toString());

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
    <Flex flexWrap="wrap"   gap={2} py={6}>
     
      {buttonLabels.map((label, index) => (
        <Button
          key={index}
          {...buttonProps}
          size="sm"
          bg={highlightedIndices.includes(index) ? "#FF0000" : "#1FAF38"}
          mx={2}
        >
          {label}
        </Button>
      ))}
    
    </Flex>
  );
};

export default QuestionsBTN;
