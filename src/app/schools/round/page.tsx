"use client"
import React, { useEffect, useMemo, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getQuizDetails, Round, SchoolRoundParticipation } from "@/redux/slices/quiz/quizSlice";
import QuestionInfoSection from "./QuestionInfoSection";

const RoundPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { quizDetails, quizzesLoading, quiz, schoolRegistration } = useAppSelector(state => state.quiz)
  const { superAdminInfo, token } = useAppSelector(state => state.auth);
  const [selectedRound, setSelectedRound] = useState<SchoolRoundParticipation|null>(null)

  useEffect(()=>{
    if(quiz){
      dispatch(getQuizDetails(quiz.id))
    }
  },[]);

  
  const roundsMap = useMemo(() => {
    return new Map((quizDetails?.rounds ?? [])?.map((round) => [round.id, round]))
  }, [quizDetails]);

  const roundParticipations = useMemo(() => {
    if (roundsMap) {
      return (schoolRegistration?.rounds ?? []).toSorted((a, b) => {
        const bRound = roundsMap.get(b.roundId)!;
              const aRound = roundsMap.get(a.roundId)!;
              return aRound.round_number - bRound.round_number;
      })
    } else {
      return []
    }
  }, [schoolRegistration, roundsMap]);

  useEffect(()=>{
    if(roundParticipations.length > 0){
      setSelectedRound(roundParticipations[0])
    }
  },[roundParticipations]);
  


  return (
    <Flex>
      <Sidebar />
      <Box  minW={{base: '100%', md: '80%'}} px={0} marginLeft={{base: '0%', md: '20%'}}>
        
        <TopNav title={quizDetails?.title} />
        <RoundsBtn
          roundsMap={roundsMap}
          roundParticipations={roundParticipations}        
        selectedRound={selectedRound} onRoundSelected = {(round) => setSelectedRound(round)}/>

        <Box px={8} fontFamily={'Poppins'}>
          <QuestionInfoSection selectedRound={selectedRound} roundsMap={roundsMap} />
          
          {selectedRound && <Box mt={6}>
            <Text fontWeight={"500"} color={"#333333"}>
              Answered Questions
            </Text>
            <Flex mt={4} justify={"space-between"}  direction={{base: 'column', md: 'row'}}>
              <AnsweredButtons questions={selectedRound.answered_questions}/>
              <Link href={`/schools/round/test-details`} passHref>
                <Button rightIcon={<ChevronRightIcon />}>
                  View Details
                </Button>
              </Link>
            </Flex>
          </Box>}
        </Box>
        <ScoreBoard />
      </Box>
    </Flex>
  );
};

export default RoundPage;
