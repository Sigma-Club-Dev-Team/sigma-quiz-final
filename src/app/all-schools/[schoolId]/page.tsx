
"use client"
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { contentData } from "../../schools/round/content";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import TopNav from "../../schools/round/Topnav";
import  SchoolResultSummary  from "../../all-schools/SchoolResutSummary";
import {
    IconButton
  } from "@chakra-ui/react";
import { useAppSelector } from "@/redux/hooks";
import { Round } from "@/redux/slices/quiz/quizSlice";
import AllSchoolsRoundsSelector from "../RoundsSelector";



const SchoolDetailsPage: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { quizDetails } =
    useAppSelector((state) => state.quiz);
  const [selectedRound, setSelectedRound] =
    useState<Round | null>(null);

  
    const parts = pathname.split("/");
    const schoolId = parts[2];
  
    const goBack = () => {
        router.back();
      };

  const school = contentData.find((school) => school.id === schoolId);

  if (!school) {
    return <div>School not found</div>;
  }

  return (
    <Box px={6}>

        
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Back"
        boxSize={8}
        size={'lg'}
        position="absolute"
        top="0px"
        left="0px"
        bg="transparent"
        onClick={goBack}
      />


      <TopNav title={school.title} />
    
      <AllSchoolsRoundsSelector selectedRound={selectedRound} rounds={quizDetails?.rounds ?? []} onRoundSelected={(round) => setSelectedRound(round)}/>
      {/* <SchoolResultSummary
      
        testName="General knowledge quiz"
        position='2nd'
        score={5}
<<<<<<< HEAD
        answeredQuestions={[]} corrects={[]} wrongs={[]}      />
=======
        answeredQuestions={[]} 
      /> */}
>>>>>>> b6312feea09c34aad53b74695d1a784f06f7aa91
    </Box>
  );
};

export default SchoolDetailsPage;
