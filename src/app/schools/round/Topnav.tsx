"use client";

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
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import SidebarContent from "../../../components/sidebar";
import { useAppSelector } from "@/redux/hooks";

const HeaderContent: React.FC<{ title?: string }> = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { superAdminInfo } = useAppSelector(state => state.auth)

  return (
    <Box >
      <Flex
        justifyContent={"space-between"}
        mb="4"
        textAlign={"right"}
        position="fixed"
        right="0rem"
        zIndex="1000"
        w={{base: '95%', md: '80%'}}
        bg={'#ffffff'}
      >
        <Box ml="auto" display="flex" alignItems="center" py={4}>
          <Box mr={4} textAlign="right">
            <Heading as="h3" fontSize={{ base: "12px", md: "16px" }} mb={1}>
              {title}
            </Heading>
            <Text fontWeight="400" fontSize="12px">
              Welcome {superAdminInfo?.first_name}
            </Text>
          </Box>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar name="School Name" size="sm" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default HeaderContent;
