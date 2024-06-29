import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AddQuizTrigger from './AddQuiz'
import Quizzes from './Quizzes'
import { ContainImage } from '../myImage'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getQuizzes } from '@/redux/slices/quiz/quizSlice'

function SelectQuiz() {
  const [quizId, setQuizId] = useState('')
  const { quizzes, quiz } = useAppSelector(state => state.quiz)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getQuizzes())
  }, [])


  return (
    <Flex alignItems={'center'} justifyContent={'center'} bg={'white'} p={{base: '.5rem', md: '1rem', lg: '2rem'}}>
      <Flex
        flexDirection={'column'}
        gap={'3rem'}
        width={{ base: '90%', md: '60%', lg: '849px' }}
        height="auto"
        padding="2rem"
        borderRadius="1.875rem"
        boxShadow="lg"
        bg="#EDEDED"
        my={{base: '4', md:'0'}}>

          {/* Header */}
          <Box  width={'100%'}>
            <Box position={'relative'} height={'3.75rem'} width={'11.5625rem'}>
              <ContainImage src="/assets/svgs/sigmaLogo.svg" alt='Since 1950' />
            </Box>
          </Box>

          {/* Body */}
          <VStack align={'stretch'}>
            <Flex direction={'column'} gap={'1.5rem'}>

              <Flex direction={'column'} gap={'.5rem'}>
                <Heading color={'brand.purple'} fontSize={'1.5rem'} fontWeight={'600'}>
                  Select Quiz
                </Heading>
                <Text color={'#333333'} fontSize={'1rem'}>
                  Select which quiz you choose to operate
                </Text>
              </Flex>

              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    width={'100%'}
                    padding={'1rem'}
                    borderRadius={'.5rem'}
                    rightIcon={<ChevronDownIcon />}
                    bg={'white'}
                    color={"#333333"}
                    textAlign={'left'}
                    fontWeight={'400'}
                  >
                    Select a quiz
                  </MenuButton>
                  <MenuList>
                    {quizzes.map((quiz, index) => (
                      <MenuItem onClick={()=>setQuizId(quiz.id)} key={index}>{quiz.title}</MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>

              {/* Action Buttons */}
              <Flex gap={'1rem'} >
                <AddQuizTrigger />

                <Quizzes />
              </Flex>
            </Flex>
          </VStack>

          <Button alignSelf={'center'} p={"1.5rem"} width={'70%'} bg={'brand.purple'} color={'brand.white'} _hover={{ opacity: .8 }} >
            Get Started
          </Button>

          <Link alignSelf={'center'}>Log out</Link>


      </Flex>
    </Flex>
  )
}

export default SelectQuiz