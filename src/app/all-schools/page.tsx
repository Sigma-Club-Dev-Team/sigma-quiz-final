"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Box, Text, Flex, IconButton, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { contentData } from "../schools/round/content";
import SideBar from "../../components/sidebar";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import TopNav from "../schools/round/Topnav";
import RoundsBtn from "../schools/round/RoundsSelector";
import SchoolResultSummary from "./SchoolResutSummary";
import { getQuizDetails, Round } from "@/redux/slices/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AllSchoolsRoundsSelector from "./RoundsSelector";
import {
  getAllAnsweredQuestions,
  getAllRightAnsweredQuestions,
  getAllWrongAnsweredQuestions,
} from "@/lib/utilityFunctions";
import Preloader from "@/components/UI/Preloader";
import NoSelectedQuizError from "@/components/NoSelectedQuizError";

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const { quizDetails, quiz, quizzesLoading } = useAppSelector(
    (state) => state.quiz
  );
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);

  const dispatch = useAppDispatch();

  // Function to handle navigation back
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    quiz && dispatch(getQuizDetails(quiz?.id));
  }, []);

  const roundsMap = useMemo(() => {
    const map = new Map<string, Round>();
    quizDetails?.rounds.forEach((round) => {
      map.set(round.id, round);
    });
    return map;
  }, [quizDetails]);

  return (
    <>
      <NoSelectedQuizError />
      <Flex>
        <SideBar />
        <Box
          minW={{ base: "100%", md: "80%" }}
          marginLeft={{ base: "0%", md: "20%" }}
          px={{ base: "4", md: "10" }}
        >
          <Box fontFamily={"Poppins"}>
            <TopNav title="" />
            <AllSchoolsRoundsSelector
              selectedRound={selectedRound}
              rounds={quizDetails?.rounds ?? []}
              onRoundSelected={(round) => setSelectedRound(round)}
            />
            {quizDetails?.schoolRegistrations &&
              [...quizDetails?.schoolRegistrations]
                .sort((a, b) => {
                  const aPosition =
                    a?.rounds.find(
                      (participation) =>
                        participation.roundId === selectedRound?.id
                    )?.position ??
                    a.position ??
                    Number.MAX_SAFE_INTEGER;
                  const bPosition =
                    b?.rounds.find(
                      (participation) =>
                        participation.roundId === selectedRound?.id
                    )?.position ??
                    b.position ??
                    Number.MAX_SAFE_INTEGER;
                  return aPosition - bPosition;
                })
                .map((registration) => {
                  const schoolRoundParticipation = registration?.rounds.find(
                    (participation) =>
                      participation.roundId === selectedRound?.id
                  );
                  return (
                    <Box key={registration.id}>
                      <Flex
                        justifyContent={"space-between"}
                        width={{ base: "100%", md: "800px" }}
                        mt={2}
                        px={{ base: "6", md: "0" }}
                      >
                        <Box>
                          <Text fontSize="xl">{registration.school.name}</Text>
                        </Box>
                        <Box>
                          <Link href={`/schools/round/${registration.id}`}>
                            <Flex
                              alignItems="center"
                              color="blue.500"
                              _hover={{ textDecoration: "underline" }}
                            >
                              <Text>See more</Text>
                              <ChevronRightIcon />
                            </Flex>
                          </Link>
                        </Box>
                      </Flex>
                      {selectedRound ? (
                        schoolRoundParticipation ? (
                          <SchoolResultSummary
                            testName={selectedRound.name}
                            position={schoolRoundParticipation?.position ?? 0}
                            score={schoolRoundParticipation?.score ?? 0}
                            corrects={
                              schoolRoundParticipation?.answered_questions?.filter(
                                (answeredQuestions) =>
                                  answeredQuestions.answered_correctly
                              ) ?? []
                            }
                            wrongs={
                              schoolRoundParticipation?.answered_questions?.filter(
                                (answeredQuestions) =>
                                  !answeredQuestions.answered_correctly
                              ) ?? []
                            }
                            answeredQuestions={
                              schoolRoundParticipation?.answered_questions ?? []
                            }
                          />
                        ) : (
                          "Round Not Available for School"
                        )
                      ) : (
                        <SchoolResultSummary
                          testName={"Overall"}
                          position={registration?.position ?? 0}
                          score={registration.score}
                          corrects={getAllRightAnsweredQuestions(
                            registration.rounds
                          )}
                          wrongs={getAllWrongAnsweredQuestions(
                            registration.rounds
                          )}
                          answeredQuestions={getAllAnsweredQuestions(
                            registration.rounds
                          )}
                        />
                      )}
                    </Box>
                  );
                })}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

const TextRow = ({ title, text }: { title: string; text: string | number }) => {
  return (
    <Flex justify="space-between" mb={2} gap={4}>
      <Text color={"#757575"}>{title}</Text>
      <Text width={"50%"} textAlign={{ base: "end", md: "left" }}>
        {text}
      </Text>
    </Flex>
  );
};

export default DetailsPage;
