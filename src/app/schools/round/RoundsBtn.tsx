import React, { useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Round, SchoolRoundParticipation } from "@/redux/slices/quiz/quizSlice";


const RoundsButton = ({onRoundSelected, selectedRound, roundParticipations, roundsMap}: {
  roundsMap: Map<string, Round>,
  roundParticipations: SchoolRoundParticipation[],
  onRoundSelected: (newRound: SchoolRoundParticipation)=> void, selectedRound: SchoolRoundParticipation | null}) => {

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
          Test Details
        </Text>
        <Flex justify={"space-between"} flexWrap={'wrap'}>
          <Flex py={4} flexWrap={'wrap'}>
            {roundParticipations.map((roundParticipation, index) => {
               const roundInfo = roundsMap.get(roundParticipation.roundId)!;
               const isSelected = selectedRound?.id === roundParticipation.id;
              return <Button
                key={index}
                {...buttonProps}
                bg={ isSelected ? "#8F19E7" : "transparent"}
                color={isSelected ? "white" : "black"}
                _hover={{ bg: isSelected ? "blue.600" : "gray.100" }}
                onClick={()=>onRoundSelected(roundParticipation)}
              >
                {roundInfo.name}
              </Button>
            })}
          </Flex>

          {/* <Box textAlign={"center"} fontFamily={"Poppins"}>
            <Button
              leftIcon={<Box as={FaEdit} color="#333333" />}
              rightIcon={<Box as={FaPlus} color="#333333" />}
              bg={"#EDEDED"}
              variant="solid"
              width="9.8125rem"
              mx={"auto"}
              color="#333333"
              _hover={{ shadow: "xlg" }}
              fontWeight={"400"}
              fontSize={"14px"}
            >
              Edit / Add
            </Button>
          </Box> */}
        </Flex>
      </Box>
    </Box>
  );
};

export default RoundsButton;
