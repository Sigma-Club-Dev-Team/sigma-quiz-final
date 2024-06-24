"use client"
import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { ChevronRightIcon, LockIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  VStack,
  Flex,
} from "@chakra-ui/react";
import Sidebar from "../../components/sidebar";
import ProfileUpdate from './ProfileUpdate';
import UpdatePassword from './UpdatePassword';

const ProfileSetting: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("profile"); 

  // Function to handle button click and set active component
  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box ml={'28%'} w="full" fontFamily="Poppins" minW={'72%'}>
        <Flex >
          <Box flex="1" display="flex" alignItems="center" justifyContent="center" flexWrap={'wrap'}>
            {/* Conditional rendering based on activeComponent state */}
            {activeComponent === "profile" && <ProfileUpdate />}
            {activeComponent === "password" && <UpdatePassword />}
            
          </Box>
          <Box flex="1" display="flex" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center" justifyContent="space-around" height="100vh">
              <VStack spacing={4} gap={12}>
                <Button
                  w="400px"
                  h="70px"
                  borderColor={"#33333380"}
                  fontWeight={"400"}
                  bg={activeComponent === "profile" ? "#8F19E7" : "white"} 
                  color={activeComponent === "profile" ? "white" : "#333333"} 
                  borderRadius="10px"
                   border={"1px"}
                  textAlign={'left'}
                  _hover={{ opacity: "0.8" }}
                  leftIcon={<SettingsIcon />}
                  rightIcon={<ChevronRightIcon />}
                  onClick={() => handleComponentChange("profile")}
                >
                  Profile Setting
                </Button>
                <Button
                  w="400px"
                  h="70px"
                   borderColor={"#333333"}
                    fontWeight={"400"}
                  bg={activeComponent === "password" ? "#8F19E7" : "white"} 
                  color={activeComponent === "password" ? "white" : "#333333"} 
                  borderRadius="10px"
                   border={"1px"}
                  _hover={{ opacity: "0.8" }}
                  leftIcon={<LockIcon />}
                  rightIcon={<ChevronRightIcon />}
                  onClick={() => handleComponentChange("password")}
                >
                  Password Setting
                </Button>
                <Button
                  w="400px"
                  h="70px"
                  bg={activeComponent === "logout" ? "#8F19E7" : "white"} 
                  color={activeComponent === "logout" ? "white" : "#333333"} 
                  border={"1px"}
                   fontWeight={"400"}
                  borderRadius="10px"
                  _hover={{ opacity: "0.8" }}
                  leftIcon={<AddIcon />}
                  rightIcon={<ChevronRightIcon />}
                 
                >
                  Log Out
                </Button>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfileSetting;
