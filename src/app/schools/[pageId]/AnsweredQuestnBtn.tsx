import React, { useState } from "react";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface AnsweredButtonsProps {
  showNavigation?: boolean; // Prop to control whether to show navigation icons
}

const AnsweredButtons: React.FC<AnsweredButtonsProps> = ({
  showNavigation = true,
}) => {
  const totalButtons = 20; // Total number of buttons available
  const initialVisibleButtons = 10; // Number of buttons to initially display

  const [startIndex, setStartIndex] = useState(0); // Start index of visible buttons

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
      {Array.from({ length: totalButtons }, (_, index) => {
        if (index >= startIndex && index < endIndex) {
          return (
            <Button
              key={index}
              fontFamily="Poppins"
              fontSize="14px"
              fontWeight={500}
              padding="10px"
              mr={2}
              mb={2}
              color="white"
              size="md"
              bg={index % 2 === 0 ? "#FF0000" : "#1FAF38"}
            >
              {index + 1}
            </Button>
          );
        }
        return null;
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
