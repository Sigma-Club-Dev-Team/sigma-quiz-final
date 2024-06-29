"use client"
import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link"; 
import { useParams } from "next/navigation"; 
import { contentData } from "./content";
import Sidebar from "../../../components/sidebar"; 
import TopNav from './Topnav'
import RoundsBtn from "./RoundsBtn"; 
import QuestionsBTN from "./QuestionsButtons"; 
import AnsweredButtons from "./AnsweredQuestnBtn"; 
import ScoreBoard from "./ScoreBoard"; 

const TemplatePage: React.FC = () => {
  const params = useParams();
  const pageId = params?.pageId as string; 

  const pageContent = contentData.find((content) => content.id === pageId);
 
  if (!pageContent) {
    return <div>No data found</div>;
  }

  return (
    <Flex>
      <Sidebar />
      <Box  minW={{base: '100%', md: '80%'}} px={0} marginLeft={{base: '0%', md: '20%'}}>
        <TopNav title={pageContent.title} />
        <RoundsBtn />

        <Box px={8} fontFamily={'Poppins'}>
          <Box py={4}>
            <Text fontWeight={"500"} color={"#333333"} fontSize={"14px"}>
              Questions
            </Text>
            <QuestionsBTN />
          </Box>

          <Flex justify={"space-between"} my={4}>
            <Box fontWeight={"600"} color={"#FF0000"} fontSize={"16px"}>
              Answered by School Two
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

          <Box mt={6}>
            <Text fontWeight={"500"} color={"#333333"}>
              Answered Questions
            </Text>
            <Flex mt={4} justify={"space-between"}  direction={{base: 'column', md: 'row'}}>
              <AnsweredButtons />
              <Link href={`/schools/${pageContent.id}/test-details`} passHref>
                <Button rightIcon={<ChevronRightIcon />}>
                  View Details
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>
        <ScoreBoard />
      </Box>
    </Flex>
  );
};

export default TemplatePage;
