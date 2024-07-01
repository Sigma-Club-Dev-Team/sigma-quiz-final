import { Box, Button, Flex, Text, } from "@chakra-ui/react"
import QuestionsBTN from "./QuestionsButtons"
import { Question, Round, SchoolRoundParticipation } from "@/redux/slices/quiz/quizSlice"
import { useState } from "react"

const QuestionInfoSection = ({ selectedRound, roundsMap}: {
    roundsMap: Map<string, Round>,
    selectedRound: SchoolRoundParticipation | null}) => {

    const [selectedQuestion, setSelectedQuestion] = useState<Question|null>(null)    
        
    return <Box py={4}>
    <Text fontWeight={"500"} color={"#333333"} fontSize={"14px"}>
      Questions
    </Text>
    <QuestionsBTN
        selectedQuestion={selectedQuestion}
        onQuestionSelected={(ques) => setSelectedQuestion(ques)}
    
    questions={roundsMap.get(selectedRound?.roundId ?? "")?.questions ?? [] } />
    {
        !!selectedQuestion && <>
        <Flex justify={"space-between"} my={4}>
        <Box fontWeight={"600"} color={"#FF0000"} fontSize={"16px"}>
          {selectedQuestion.answered_by ? `Answered By: ${selectedQuestion.answered_by.schoolRegistration?.school.name}` : ""}
        </Box>
        <Box color={"#33333399"} textDecoration={"underline"}>
          Manage questions
        </Box>
      </Flex>
    
      <Flex justify={"space-between"} my={4} flexWrap={'wrap'}>
        <Button>Right</Button>
        <Button>Bonus</Button>
        <Button>Wrong</Button>
      </Flex>
        </>
      )}
    </Box>
  );
};

export default QuestionInfoSection;
