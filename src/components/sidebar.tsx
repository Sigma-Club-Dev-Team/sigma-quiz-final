"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  VStack,
  HStack,
  IconButton,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaEdit,
  FaPercent,
  FaList,
  FaQuestion,
  FaUserCog,
  FaUser,
  FaGraduationCap,
  FaPlus,
  FaBars,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  IQuizDetail,
  persistSelectedRoundParticipation,
  resetPolling,
  SchoolRegistrationElement,
  setSchoolRegistration,
} from "@/redux/slices/quiz/quizSlice";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { quizDetails, schoolRegistration } = useAppSelector(
    (state) => state.quiz
  );

  const handleSetSchool = (school: SchoolRegistrationElement) => {
    console.log(pathname);
    dispatch(persistSelectedRoundParticipation(null));
    dispatch(resetPolling());
    dispatch(setSchoolRegistration(school));
    if (pathname === "/all-schools") {
      router.push("/schools/round");
    }
  };

    
  useEffect(()=>{
    quizDetails && dispatch(setSchoolRegistration(quizDetails.schoolRegistrations.find(sch => sch.id === schoolRegistration?.id) ?? schoolRegistration));
  }, [quizDetails])


  return (
    <>
      <IconButton
        icon={<FaBars />}
        aria-label="Open menu"
        position="fixed"
        top="1rem"
        left="1rem"
        zIndex="10000"
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
      />

      <Box
        bg="#EDEDED"
        color="white"
        minW={{ base: "none", md: "10%", lg: "20%" }}
        height="100vh"
        py={10}
        fontFamily={"Poppins"}
        overflowY={"scroll"}
        position={"fixed"}
        top={"0"}
        display={{ base: "none", md: "block" }}
      >
        {quizDetails && (
          <SidebarContent
            schoolRegistration={schoolRegistration}
            handleSetSchool={handleSetSchool}
            quizDetails={quizDetails}
            pathname={pathname}
          />
        )}
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{""}</DrawerHeader>
          <DrawerBody>
            {quizDetails && (
              <SidebarContent
                schoolRegistration={schoolRegistration}
                handleSetSchool={handleSetSchool}
                quizDetails={quizDetails}
                pathname={pathname}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SidebarContent: React.FC<{
  pathname: string;
  quizDetails: IQuizDetail;
  handleSetSchool: (school: SchoolRegistrationElement) => void;
  schoolRegistration: SchoolRegistrationElement | null;
}> = ({ pathname, quizDetails, handleSetSchool, schoolRegistration }) => {
  const { token, superAdminInfo, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  return (
    <VStack spacing={6} align="stretch">
      <HStack cursor="pointer" spacing={4} px={8}>
        <FaGraduationCap color="#333333" size="1.5rem" />
        <Text fontSize="xl" fontWeight="bold" color="#333333">
          Schools
        </Text>
      </HStack>

      <VStack align="stretch" spacing={4}>
        {quizDetails.schoolRegistrations.map((registration, index) => (
          <HStack
            key={index}
            cursor="pointer"
            spacing={4}
            bg={"#ffffff"}
            onClick={() => handleSetSchool(registration)}
            px={8}
            py={2}
            borderLeft="5px solid"
            borderColor={
              pathname !== "/all-schools" &&
              schoolRegistration?.schoolId === registration.schoolId
                ? "#8F19E7"
                : "transparent"
            }
            shadow={"md"}
          >
            <Text
              color={
                pathname !== "/all-schools" &&
                schoolRegistration?.schoolId === registration.schoolId
                  ? "#8F19E7"
                  : "#000000"
              }
            >
              {registration.school.name}
            </Text>
          </HStack>
        ))}
      </VStack>

      {/* <Box textAlign={"center"}>
        <Button
          leftIcon={
            <Box
              as={FaEdit}
              bg="white"
              borderRadius=".3125rem"
              p={1}
              color="#8F19E7"
            />
          }
          rightIcon={
            <Box
              as={FaPlus}
              bg="white"
              borderRadius=".3125rem"
              p={1}
              color="#8F19E7"
            />
          }
          bg={"#8F19E7"}
          variant="solid"
          width="9.8125rem"
          mx={"auto"}
          color="white"
          _hover={{ shadow: "xlg" }}
          fontWeight={"400"}
          fontSize={"14px"}
        >
          Edit / Add
        </Button>

        <HStack
          cursor="pointer"
          spacing={0}
          textAlign={"center"}
          px={8}
          ml={8}
          mt={2}
          _hover={{ shadow: "md" }}
        >
          <IconButton
            aria-label="percent-scores"
            icon={<FaPercent />}
            variant="ghost"
            color="#333333"
            _hover={{ bg: "inherit" }}
          />
          <Text color="#333333">Scores</Text>
        </HStack>
      </Box> */}

      <VStack align="stretch" spacing={4}>
        <Link href="/all-schools">
          <HStack
            cursor="pointer"
            spacing={0}
            px={4}
            py={2}
            _hover={{ shadow: "md" }}
            alignItems="center"
            borderLeft="5px solid"
            borderColor={
              pathname === "/all-schools" ? "#8F19E7" : "transparent"
            }
            bg={"#ffffff"}
          >
            <IconButton
              aria-label="all-schools"
              icon={<FaList />}
              variant="ghost"
              color="#333333"
            />
            <Text color="#333333">All Schools</Text>
          </HStack>
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/manage-questions">
              <HStack
                cursor="pointer"
                spacing={0}
                px={4}
                py={2}
                _hover={{ shadow: "md" }}
                alignItems="center"
                borderLeft="5px solid"
                borderColor={
                  pathname === "/manage-questions" ? "#8F19E7" : "transparent"
                }
                bg={"#ffffff"}
              >
                <IconButton
                  aria-label="manage-questions"
                  icon={<FaQuestion />}
                  variant="ghost"
                  color="#333333"
                />
                <Text color="#333333">Manage Questions</Text>
              </HStack>
            </Link>
            <Link href="/account">
              <HStack
                cursor="pointer"
                spacing={0}
                px={4}
                py={2}
                _hover={{ shadow: "md" }}
                alignItems="center"
                borderLeft="5px solid"
                borderColor={
                  pathname === "/account" ? "#8F19E7" : "transparent"
                }
                bg={"#ffffff"}
              >
                <IconButton
                  aria-label="account"
                  icon={<FaUser />}
                  variant="ghost"
                  color="#333333"
                />
                <Text color="#333333">Account</Text>
              </HStack>
            </Link>
            <Link href="/manage-users">
              <HStack
                cursor="pointer"
                spacing={0}
                px={4}
                py={2}
                _hover={{ shadow: "md" }}
                alignItems="center"
                borderLeft="5px solid"
                borderColor={
                  pathname === "/manage-users" ? "#8F19E7" : "transparent"
                }
                bg={"#ffffff"}
              >
                <IconButton
                  aria-label="manage-users"
                  icon={<FaUserCog />}
                  variant="ghost"
                  color="#333333"
                />
                <Text color="#333333">Manage Users</Text>
              </HStack>
            </Link>
            <Link href="/my-account">
              <HStack
                cursor="pointer"
                spacing={0}
                px={4}
                py={2}
                _hover={{ shadow: "md" }}
                alignItems="center"
                borderLeft="5px solid"
                borderColor={
                  pathname === "/my-account" ? "#8F19E7" : "transparent"
                }
                shadow={"lg"}
                bg={"#ffffff"}
              >
                <IconButton
                  aria-label="my-account"
                  icon={<FaUser />}
                  variant="ghost"
                  color="#333333"
                />
                <Text color="#333333">My Account</Text>
              </HStack>
            </Link>
          </>
        ) : (
          ""
        )}
      </VStack>
    </VStack>
  );
};

export default Sidebar;
