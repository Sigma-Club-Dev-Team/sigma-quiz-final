import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon, AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Avatar,
  Text,
  IconButton
} from "@chakra-ui/react";

const PasswordUpdate: React.FC = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleToggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box textAlign="center">


<Box textAlign="center" mb={4}>
              <Box position="relative" display="inline-block">
                <Avatar size="xl" src="" />
                <IconButton
                  position="absolute"
                  bottom="0"
                  right="0"
                  aria-label="Add picture"
                  icon={<AddIcon />}
                  size="sm"
                  borderRadius="full"
                  bg="teal.500"
                  color="white"
                 
                />
                <input
                  type="file"
                 
                  style={{ display: 'none' }}
                />
              </Box>
              <Text fontWeight="bold" mt={2}>
              Yande Stephens
              </Text>
            </Box>


      <FormControl mb={4} maxWidth={"500px"} fontFamily={"Poppins"}>
        <FormLabel color="#333333">Old Password</FormLabel>
        <InputGroup>
          <Input
            type={showOldPassword ? "text" : "password"}
            borderColor="#33333380"
            borderRadius="10px"
            placeholder="Enter your old password"
            height={"50px"}
          />
          <InputRightElement>
            <Button
              h="50px"
              bg="inherit"
              size="sm"
              _hover={{ bg: "inherit" }}
              _active={{ bg: "inherit" }}
              _focus={{ boxShadow: "none" }}
              onClick={handleToggleOldPassword}
              my={"auto"}
            >
              {showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl fontFamily={"Poppins"} mb={4} maxWidth={"500px"}>
        <FormLabel color="#333333">New Password</FormLabel>
        <InputGroup>
          <Input
            type={showNewPassword ? "text" : "password"}
            borderColor="#33333380"
            borderRadius="10px"
            placeholder="Enter your new password"
            height={"50px"}
          />
          <InputRightElement>
            <Button
              h="50px"
              bg="inherit"
              size="sm"
              _hover={{ bg: "inherit" }}
              _active={{ bg: "inherit" }}
              _focus={{ boxShadow: "none" }}
              onClick={handleToggleNewPassword}
              my={"auto"}
            >
              {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl fontFamily={"Poppins"} mb={4} maxWidth={"500px"}>
        <FormLabel color="#333333">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            borderColor="#333333"
            borderRadius="10px"
            placeholder="Confirm your new password"
            height={"50px"}
          />
          <InputRightElement>
            <Button
              h="50px"
              bg="inherit"
              size="sm"
              _hover={{ bg: "inherit" }}
              _active={{ bg: "inherit" }}
              _focus={{ boxShadow: "none" }}
              onClick={handleToggleConfirmPassword}
              my={"auto"}
            >
              {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        mt={4}
        bg={"#8F19E7"}
        color={"white"}
        opacity="0.7"
        width={"500px"}
        borderRadius="10px"
        h={"65px"}
        _hover={{ opacity: "1" }}
      >
        Update Password
      </Button>
    </Box>
  );
};
export default PasswordUpdate;
