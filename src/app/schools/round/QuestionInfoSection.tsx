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
import { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SERVER_URL } from "@/lib/constants";
import { toast } from "sonner";
import Spinner from "@/components/UI/Spinner";

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
  const { schoolRegistration, quizDetails } = useAppSelector((state) => state.quiz);
  const [markStatus, setMarkStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch()

  
  const schoolRegistrationMap = useMemo(() => {
    return new Map(
      (quizDetails?.schoolRegistrations ?? [])?.map((reg) => [reg.id, reg])
    );
  }, [quizDetails]);

  const handleMarkQuestion = async (mark: string) => {
    if (selectedQuestion) {
      try {
        setIsSubmitting(true);
        const response = await fetch(
          `${SERVER_URL}/api/sigma-quiz/questions/${selectedQuestion.id}/mark`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              school_id: schoolRegistration?.schoolId,
              answered_correctly: mark === "right" ? true : false,
            }),
          }
        );
        if(response.ok){
          const data: IQuizDetail = await response.json();
          if (data) {
            console.log({ data });
            dispatch(setQuizDetails(data));
            dispatch(
              setSchoolRegistration(
                data.schoolRegistrations.find(
                  (reg) => reg.id === schoolRegistration?.id
                ) ?? schoolRegistration
              )
            );
            setIsSubmitting(false);
          } else {
            setIsSubmitting(false);
            toast.error("Error updating quiz");
          }

        }else{
          const data:{error: string, message: string, statusCode: number} = await response.json();
          toast.error(data.message ?? "Error assigning bonus")
          setIsSubmitting(false);
        }
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error marking the question:", error);
        toast.error(`Error marking question ${mark}`);
      }
    }
  };

  const handleMarkBonusQuestion = async () => {
    if (selectedQuestion) {
      try {
        setIsSubmitting(true);
        const response = await fetch(
          `${SERVER_URL}/api/sigma-quiz/questions/${selectedQuestion.id}/bonus`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ 
              school_id: schoolRegistration?.schoolId
             })
          }
        );
        if(response.ok){
          const data:IQuizDetail = await response.json();
          if (data) {
            console.log({data})
            toast.success("Bonus Point awarded")
            dispatch(setQuizDetails(data))
            dispatch(setSchoolRegistration(data.schoolRegistrations.find(reg => reg.id === schoolRegistration?.id) ?? schoolRegistration))
            setIsSubmitting(false);
          } else {
            setIsSubmitting(false);
            toast.error("Error updating quiz")
          }
        }else{
          const data:{error: string, message: string, statusCode: number} = await response.json();
          toast.error(data.message ?? "Error assigning bonus")
          setIsSubmitting(false);

        }
      } catch (error) {
        console.error("Error marking the question:", error);
        toast.error(`Error marking question bonus`)
        setIsSubmitting(false);
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
                ? `Answered By: ${schoolRegistrationMap.get(selectedQuestion.answered_by.schoolRegistrationId)?.school.name}`
                : ""}
            </Box>
            <Box color={"#33333399"} textDecoration={"underline"}>
              Manage questions
            </Box>
          </Flex>
          {isLoggedIn ? (
            <>
              <Flex justify={"space-between"} my={4} flexWrap={"wrap"}>
                <Button onClick={() => handleMarkQuestion("right")}>
                  Right
                </Button>
                <Button onClick={() => handleMarkBonusQuestion()}>Bonus</Button>
                <Button onClick={() => handleMarkQuestion("wrong")}>
                  Wrong
                </Button>
              </Flex>
              <Flex
                justify={"center"}
                align={"center"}
                my={4}
                flexWrap={"wrap"}
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    <Text ml={"2"} fontSize={"16px"}>
                      Submitting answer, please wait...
                    </Text>
                  </>
                ) : null}
              </Flex>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </Box>
  );
};

export default QuestionInfoSection;
