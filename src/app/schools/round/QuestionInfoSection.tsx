import { Box, Button, Flex, Text } from "@chakra-ui/react";
import QuestionsBTN from "./QuestionsButtons";
import {
  IQuizDetail,
  Question,
  Round,
  SchoolRoundParticipation,
  setQuizDetails,
  setSchoolRegistration,
} from "@/redux/slices/quiz/quizSlice";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SERVER_URL } from "@/lib/constants";
import { toast } from "sonner";

const QuestionInfoSection = ({
  selectedRound,
  roundsMap,
}: {
  roundsMap: Map<string, Round>;
  selectedRound: SchoolRoundParticipation | null;
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const { isLoggedIn, token } = useAppSelector((state) => state.auth);
  const { schoolRegistration } = useAppSelector((state) => state.quiz);
  const [markStatus, setMarkStatus] = useState<string | null>(null);

  const dispatch = useAppDispatch()

  const handleMarkQuestion = async (mark: string) => {
    if (selectedQuestion) {
      try {
        const response = await fetch(
          `${SERVER_URL}/api/sigma-quiz/questions/${selectedQuestion.id}/mark`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ 
              school_id: schoolRegistration?.schoolId,
              answered_correctly: mark === 'right' ? true : false
             })
          }
        );
        const data:IQuizDetail = await response.json();
        if (data) {
          dispatch(setQuizDetails(data))
          dispatch(setSchoolRegistration(data.schoolRegistrations.find(reg => reg.id === schoolRegistration?.id) ?? schoolRegistration))
        } else {
          toast.error("Error updating quiz")
        }
      } catch (error) {
        console.error("Error marking the question:", error);
        toast.error(`Error marking question ${mark}`)
      }
    }
  };

  useEffect(() => {
    if (markStatus) {
      console.log("Mark Status:", markStatus);
    }
  }, [markStatus]);

  return (
    <Box py={4}>
      <Text fontWeight={"500"} color={"#333333"} fontSize={"14px"}>
        Questions
      </Text>
      <QuestionsBTN
        selectedQuestion={selectedQuestion}
        onQuestionSelected={(ques) => setSelectedQuestion(ques)}
        questions={roundsMap.get(selectedRound?.roundId ?? "")?.questions ?? []}
      />
      {!!selectedQuestion && (
        <>
          <Flex justify={"space-between"} my={4}>
            <Box fontWeight={"600"} color={"#FF0000"} fontSize={"16px"}>
              {selectedQuestion.answered_by
                ? `Answered By: ${selectedQuestion.answered_by.schoolRegistration?.school.name}`
                : ""}
            </Box>
            <Box color={"#33333399"} textDecoration={"underline"}>
              Manage questions
            </Box>
          </Flex>
          {isLoggedIn ? (
            <Flex justify={"space-between"} my={4} flexWrap={"wrap"}>
              <Button onClick={() => handleMarkQuestion("right")}>Right</Button>
              <Button onClick={() => handleMarkQuestion("bonus")}>Bonus</Button>
              <Button onClick={() => handleMarkQuestion("wrong")}>Wrong</Button>
            </Flex>
          ) : (
            ""
          )}
        
        </>
      )}
    </Box>
  );
};

export default QuestionInfoSection;
