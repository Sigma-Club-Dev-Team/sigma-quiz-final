import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { LuPencil } from "react-icons/lu"
import EditQuizTrigger from "./EditQuiz"
import { useAppSelector } from "@/redux/hooks"

function Quizzes() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { quizzes } = useAppSelector(state => state.quiz)
    return (
      <>
        <Button background={'white'} fontWeight={'400'} color={'brand.grey'} leftIcon={<LuPencil />} onClick={onOpen}>Edit Quiz</Button>

        {/* Quizzes Modal */}
          
        <Modal isOpen={isOpen} onClose={onClose} size={'3xl'} scrollBehavior="inside">
            <ModalOverlay 
                // bg='none'
                backdropFilter='auto'
                // backdropInvert='80%'
                backdropBlur='2px' 
            />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader color={'brand.purple'}>Edit Quiz</ModalHeader>
            <ModalBody>
                <Flex direction={'column'} gap={'1rem'}>
                    <Text fontSize={'.875rem'} fontWeight={'500'}>Quizzes</Text>
                    <Flex direction={'column'} gap={'1rem'}>
                        {quizzes.map((quiz, index) => (
                            <EditQuizTrigger quiz={quiz} key={index} />
                        ))}
                    </Flex>
                </Flex>
            </ModalBody>
  
            <ModalFooter>
              {/* <Button bg='brand.purple' color={'brand.white'} fontWeight={'500'} mr={3} onClick={onClose}>
                Add Quiz
              </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default Quizzes