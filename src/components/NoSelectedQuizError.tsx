import React from "react";
import { useAppSelector } from "@/redux/hooks";
import Preloader from "./UI/Preloader";
import { Flex, Text, Link } from "@chakra-ui/react";

export default function NoSelectedQuizError() {
  const { quizDetails, quizzesLoading, quiz, schoolRegistration } =
    useAppSelector((state) => state.quiz);
  if (quizzesLoading) return <Preloader />;
  if (!quiz && !quizDetails) {
    return (
      <Flex
        align={"center"}
        justify={"center"}
        w={"100dvw"}
        h={"100dvh"}
        flexDirection={"column"}
      >
        <p>Error Fetching Quiz detail.</p> <br />
        <Text>
          <Link href="/" color={"brand.purple"}>
            Back to Home Page
          </Link>
        </Text>
      </Flex>
    );
  }
}
