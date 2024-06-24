import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Text, IconButton } from "@chakra-ui/react";

const ProfileForm: React.FC = () => {
  return (
    <Box>
      <Box textAlign="center" mb={8}>
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
          <input type="file" style={{ display: "none" }} />
        </Box>
        <Text fontWeight="bold" mt={2}>
          Yande Stephens
        </Text>
      </Box>

      <Stack spacing={4} direction={{ base: "column", md: "row" }}>
        <FormControl id="first-name">
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            h={"70px"}
            borderColor={"#33333380"}
            w={"230px"}
            borderRadius={"10px"}
            placeholder="Enter your first name"
          />
        </FormControl>

        <FormControl id="last-name">
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            h={"70px"}
            borderColor={"#33333380"}
            borderRadius={"10px"}
            w={"230px"}
            placeholder="Enter your last name"
          />
        </FormControl>
      </Stack>

      <FormControl id="email" mt={4}>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          borderColor={"#33333380"}
          h={"70px"}
          w={"230px"}
          borderRadius={"10px"}
          width={"500px"}
          placeholder="Enter your email address"
        />
      </FormControl>

      <Button
        mt={10}
        bg="#8F19E7"
        h={"60px"}
        color="white"
        w={"518px"}
        _hover={{ opacity: "0.8" }}
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default ProfileForm;
