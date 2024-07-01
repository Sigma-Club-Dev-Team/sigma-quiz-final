import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Round } from "@/redux/slices/quiz/quizSlice";
import { useAppSelector } from "@/redux/hooks";


const SchoolDetailsRoundSelector = ({onRoundSelected, selectedRound, rounds}: {
  rounds: Round[],
  onRoundSelected: (newRound: Round | null)=> void, selectedRound: Round | null}) => {

    const { schoolRegistration } = useAppSelector(state => state.quiz)

  const buttonProps = {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
    padding: "10px",
    mr: 2,
  };

  return (
    <Box mb={10}  mt={'20'}>
      <Box px={8}>
        <Text fontSize={"16px"} color={"#333333"}>
          {schoolRegistration?.school.name}
        </Text>
        <Flex justify={"space-between"} flexWrap={'wrap'}>
          <Flex py={4} flexWrap={'wrap'}>
            {rounds.map((round, index) => {
               const isSelected = selectedRound?.id === round.id;
              return <Button
                key={index}
                {...buttonProps}
                bg={ isSelected ? "#8F19E7" : "transparent"}
                color={isSelected ? "white" : "black"}
                _hover={{ bg: isSelected ? "blue.600" : "gray.100" }}
                onClick={()=>onRoundSelected(round)}
              >
                {round.name}
              </Button>
            })}
             <Button
                {...buttonProps}
                bg={ !selectedRound ? "#8F19E7" : "transparent"}
                color={!selectedRound ? "white" : "black"}
                _hover={{ bg: !selectedRound ? "blue.600" : "gray.100" }}
                onClick={()=>onRoundSelected(null)}
              >
                {'Overall'}
              </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default SchoolDetailsRoundSelector;
