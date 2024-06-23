import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { LuPlusCircle } from "react-icons/lu"

function AddQuizTrigger() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button background={'white'} fontWeight={'400'} color={'brand.grey'} leftIcon={<LuPlusCircle />} onClick={onOpen}>Add Quiz</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
            <ModalOverlay 
                // bg='none'
                backdropFilter='auto'
                // backdropInvert='80%'
                backdropBlur='2px' 
            />
          <ModalContent width={'80rem'}>
            <ModalCloseButton />
            <ModalHeader color={'brand.purple'}>Add Quiz</ModalHeader>
            <ModalBody>
                <Grid templateColumns={'1fr 1fr'} gap={'1rem'}>
                    <GridItem>
                        <FormControl>
                            <Flex direction={'column'} gap={'1rem'}>
                                <Box>
                                    <FormLabel fontSize={'.875rem'}>Title</FormLabel>
                                    <InputGroup>
                                        <Input placeholder="Type here" fontSize={'.875rem'} type="text" bg={"brand.bgGrey"} borderRadius={'.5rem'} />
                                    </InputGroup>
                                </Box>
                                <Box>
                                    <FormLabel fontSize={'.875rem'}>Description</FormLabel>
                                    <InputGroup>
                                        <Textarea placeholder="Type here" fontSize={'.875rem'} minHeight={'10rem'} bg={"brand.bgGrey"} borderRadius={'.5rem'} />
                                    </InputGroup>
                                </Box>
                                <Box>
                                    <FormLabel fontSize={'.875rem'}>Date</FormLabel>
                                    <InputGroup>
                                        <Input placeholder="11/05/2024" fontSize={'.875rem'} type="text" bg={"brand.bgGrey"} borderRadius={'.5rem'} />
                                    </InputGroup>
                                </Box>
                            </Flex>

                        </FormControl>
                    </GridItem>
                    <GridItem>
                    <Flex height={'100%'}  direction={'column'} gap={'.5rem'}>
                        <Text fontSize={'.875rem'}>Review</Text>
                        <Flex height={'100%'} borderRadius={'.5rem'} bg={'brand.bgGrey'} padding={'1rem'} direction={'column'} gap={'1rem'} justifyContent={'space-between'}>
                            <Flex gap={'1rem'} justifyContent={'space-between'}>
                                <Text fontWeight={"600"} fontSize={".875rem"}>Title</Text>
                                <Text fontWeight={"400"} fontSize={".75rem"}>2024 Sigma Quiz</Text>
                            </Flex>
                            <Flex gap={'1rem'} justifyContent={'space-between'}>
                                <Text fontWeight={"600"} fontSize={".875rem"}>Description</Text>
                                <Text textAlign={'right'} fontWeight={"400"} fontSize={".75rem"}>2024 Roseline Etuokwu Sigma
                                Quiz Competition </Text>
                            </Flex>
                            <Flex gap={'1rem'} justifyContent={'space-between'}>
                                <Text fontWeight={"600"} fontSize={".875rem"}>Date</Text>
                                <Text fontWeight={"400"} fontSize={".75rem"}>2024 - 05 - 30</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    </GridItem>
                </Grid>
            </ModalBody>
  
            <ModalFooter>
              <Button bg='brand.purple' color={'brand.white'} fontWeight={'500'} mr={3} onClick={onClose}>
                Add Quiz
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default AddQuizTrigger