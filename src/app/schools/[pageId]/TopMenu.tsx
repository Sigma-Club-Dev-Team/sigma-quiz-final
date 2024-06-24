import React from "react";
import {
  Box,
  Heading,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaEdit, FaPlus } from "react-icons/fa";

const HeaderSection: React.FC<{ title: string }> = ({ title }) => {
  const buttonProps = {
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: 500,
    padding: "10px",
    mr: 2,
  };

  const buttonLabels = [
    "Round 1",
    "Round 2",
    "Round 3",
    "Round 4",
    "Round 5",
    "Overall",
  ];

  return (
    <Box py={4}>
      <Flex justify="flex-end" align="center" mb="4">
        <Heading as="h3" size="sm" mr="4">
          {title} ,Sango Otta
        </Heading>
        <Menu>
          <Box>
            <Text fontWeight={"500"}>Welcome Jennifer</Text>
          </Box>
          <MenuButton
            as={Button}
            variant="ghost"
            rightIcon={<ChevronDownIcon />}
          >
            <Avatar name="School Name" size="md" />
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box px={8}>
        <Text fontSize={"16px"} color={"#333333"}>
          Test Details
        </Text>
        <Flex justify={"space-between"}>
          <Flex py={4}>
            {buttonLabels.map((label, index) => (
              <Button
                key={index}
                {...buttonProps}
                bg={index === 0 ? "#8F19E7" : "transparent"}
                color={index === 0 ? "white" : "black"}
                _hover={{ bg: index === 0 ? "blue.600" : "gray.100" }}
              >
                {label}
              </Button>
            ))}
          </Flex>

          <Box textAlign={"center"} fontFamily={"Poppins"}>
            <Button
              leftIcon={<Box as={FaEdit} color="#333333" />}
              rightIcon={<Box as={FaPlus} color="#333333" />}
              bg={"#EDEDED"}
              variant="solid"
              width="9.8125rem"
              mx={"auto"}
              color="#333333"
              _hover={{ shadow: "xlg" }}
              fontWeight={"400"}
              fontSize={"14px"}
            >
              Edit / Add
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HeaderSection;
