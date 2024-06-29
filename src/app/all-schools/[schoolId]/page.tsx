
"use client"
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { contentData } from "../../schools/[pageId]/content";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import TopNav from "../../schools/[pageId]/Topnav";
import RoundsBtn from "../../schools/[pageId]/RoundsBtn";
import { SchoolResultSummary } from "../page";
import {
    IconButton
  } from "@chakra-ui/react";



const SchoolDetailsPage: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
  
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
    
      <RoundsBtn />
      <SchoolResultSummary
      
        testName="General knowledge quiz"
        position='2nd'
        score={5}
        answeredQuestions={[]} 
      />
    </Box>
  );
};

export default SchoolDetailsPage;
