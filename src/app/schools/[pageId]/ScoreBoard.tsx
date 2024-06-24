import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface CircleBoxProps {
    text: string;
    bgColor?: string;
  }

const CircleBox: React.FC<CircleBoxProps> = ({ text, bgColor = "#ffffff" }) => {
  return (
    <Box
      width="145px"
      height="145px"
      borderRadius="50%"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      
      my={6}
     
    >
      <Text fontSize="30px" fontWeight="bold" color='#02C309'>
        {text}
      </Text>
    </Box>
  );
};

const ScoreBoard: React.FC = () => {
  return (
    <Flex justify="space-around"  px={8} py={10} flexWrap={'wrap'}>
      <Box >
        <Text  fontWeight="bold">
          Scores
        </Text>
        <CircleBox text="30/60" />
        <CircleBox text="30/60" />
      </Box>

      <Box >
        <Text  fontWeight="bold">
          Total
        </Text>
        <CircleBox text="45/90" />
        <CircleBox text="45/90" />
      </Box>

      <Box>
        <Text fontWeight="bold">
          Position
        </Text>
        <CircleBox text="2ND"  bgColor="#8F19E7" />
      </Box>
    </Flex>
  );
};

export default ScoreBoard;
