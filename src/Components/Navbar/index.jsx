import React from 'react';
import {
    Flex,
    Box,
    Text,
    Avatar,
    HStack,
    IconButton,
    Center,
    Button,
    Icon,
    Divider,
    Image,
    CloseButton,
    VStack,
    Input,
    Badge
} from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrMail } from "react-icons/gr";
import { motion } from 'framer-motion';
// import { ChevronUpIcon } from "@chakra-ui/icon";
import { BsChevronUp, BsFillBellFill } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
const MotionBox = motion(Box);
const MotionChevronUpIcon = motion(BsChevronUp);

const menuVariants = {
    opened: {
        right: 0,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.25,
            duration: 0.25
        }
    },
    closed: {
        right: "-100vw",
        transition: {
            duration: 0.25,
            when: 'afterChildren',
            staggerChildren: 0.25,
        }
    }
}


const userDetailsVariants = {
    opened: {
        top: "110%",
        opacity: 1,
        display: 'block'
    },
    closed: {
        top: 200,
        opacity: 0,
        display: 'none'
    }
}


const expandIconVariants = {
    opened: {
        rotate: 0
    },
    closed: {
        rotate: 180
    }
};

const expandContentVariants = {
    opened: {
        y: 0,
        opacity: 1,
        display: "block"
    },
    closed: {
        y: 50,
        opacity: 0,
        display: "none"
    }
};

const MenuItem = ({ icon, onClick, label, onBack, contentdata, contentbackground }) => (

    <HStack
        spacing={2}
        cursor="pointer"
        _hover={{ bgColor: "whiteAlpha.200" }}
        borderRadius="md"
        p={2}
        width="100%"
    >
        {icon}
        <Text
            fontWeight="medium"
            fontSize="md"
            textTransform="capitalize"
            fontFamily="body"
            color="white"
            onClick={() => { onClick(); onBack() }}

        >
            {label}
        </Text>

        <Box fontSize="sm" paddingInline={2} borderRadius={3} backgroundColor={contentbackground}><Text fontSize="sm">{contentdata}</Text>
        </Box>
    </HStack >
);



const ExpandableMenuItem = ({
    children,
    title,
    icon,
    fontWeight,
    fontSize = "medium",
    color,
    contentdata,
    contentbackground
}) => {
    const [show, setShow] = React.useState(false);

    return (
        <React.Fragment>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                onClick={() => setShow(!show)}
                borderRadius="md"
                p={2}
                width="100%"
            >
                <HStack
                    cursor="pointer"
                    spacing={2}
                    width="100%"
                >
                    {icon}
                    <Text
                        fontWeight={fontWeight}
                        textTransform="capitalize"
                        fontSize={fontSize}
                        fontFamily="body"
                        color={color}
                    >
                        {title}
                    </Text>
                    <Box fontSize="sm" paddingInline={2} borderRadius={3} backgroundColor={contentbackground}><Text fontSize="sm">{contentdata}</Text></Box>
                </HStack>
                <MotionChevronUpIcon
                    variants={expandIconVariants}
                    animate={show ? "opened" : "closed"}
                    color={color}
                    size="18px"
                />
            </Flex>
            <MotionBox
                variants={expandContentVariants}
                animate={show ? "opened" : "closed"}
                ml={2}
                pl={2}
                borderLeftWidth={1}
                borderLeftColor="whiteAlpha.400"
                width="80%"
            >
                {children}
            </MotionBox>
        </React.Fragment>
    );
};


const Navbar = ({ onClick, height = 12, showMenuButton = true, links = [], location, sidebarWidth, history }) => {
    const { userEmail, userType, } = {
        userType: "", userEmail: ""
    };
    const [showUserDetails, setShowUserDetails] = React.useState(false);
    const [showMenu, setShowMenu] = React.useState(false);
    const remove = () => {
        setShowMenu(false);
    }
    const logout = () => {
        window.location.href = `/Login`
    }
    const setwith = (sidebarWidth) => {
        let width
        if (sidebarWidth === 240) {
            width = screen.width - 255.5
            return ["100vw", width + "px"]
            //return ["185.6vh",], 
        } else {
            width = screen.width - 75.5
            return ["100vw", width + "px"]
            //return ["202.3vh"], 
        }
    }

    return (
        <>
            <Box
                pos="fixed"
                top={0}
                //left={0}
                right={0}
                zIndex="docked"
            >


                <Flex
                    backgroundColor="white"
                    justifyContent="space-between"
                    p={4}
                    alignItems="center"
                    position="relative"
                    height={`${height}vh`}
                    //width={`${100}vh`}
                    width={
                        setwith(sidebarWidth)
                    }
                    bgColor="whiteAlpha.100"
                    borderBottom="1px solid lightgray"


                >
                    <HStack>
                        <Flex
                            alignItems="flex-start"
                            justifyContent="flex-start">

                            <HStack>

                                {
                                    showMenuButton &&
                                    <IconButton
                                        display={["none", "flex"]}
                                        color="white"
                                        colorScheme="green"
                                        fontSize="1.35rem"
                                        fontWeight="bold"
                                        icon={<GiHamburgerMenu />}
                                        onClick={onClick}
                                        _hover={{
                                            color: 'lightgreen',
                                        }}
                                    />
                                }
                                <Box color="green">
                                    <Input placeholder='Search for something...' />
                                </Box>
                            </HStack>
                        </Flex>
                    </HStack>
                    <Box flexGrow={2} ml={6} display={["none", "block"]}>
                        <Flex justifyContent="flex-end" alignItems="center">

                            <HStack spacing={4}>

                                <Box color="green">
                                    <HStack spacing={-2} cursor="pointer">
                                        {/* <IconButton
                                    color="green"
                                    size="sm"
                                    icon={<AiOutlineMail />}

                                /> */}
                                        <Icon as={GrMail} w={6} h={6} color="green" />
                                        <Badge ml='1' fontSize="10px" top={-5} colorScheme='green'>
                                            18
                                        </Badge>
                                    </HStack>
                                </Box>
                                <Box color="green">
                                    <HStack spacing={-2} cursor="pointer">
                                        <Icon as={BsFillBellFill} w={6} h={6} color="green" />
                                        <Badge ml='1' fontSize="10px" top={-5} colorScheme='green'>
                                            18
                                        </Badge>
                                    </HStack>
                                </Box>
                                <Box color="green">
                                    <HStack spacing={2} onClick={() => { logout() }} cursor="pointer">
                                        <Icon as={IoLogOutOutline} w={6} h={6} color="green" />
                                        <Text>Log Out</Text>
                                    </HStack>
                                </Box>
                            </HStack>
                        </Flex>
                    </Box>
                    {/* <Box flexGrow={2} ml={4} display={["none", "block"]}>
                        <Flex justifyContent="flex-end" alignItems="center">
                            <HStack onClick={() => setShowUserDetails(!showUserDetails)}>
                                <Avatar size="sm" bg="cyan.500" />
                                <IconButton color="white" variant="link" size="sm" icon={<AiFillCaretDown />} />
                            </HStack>
                        </Flex>
                    </Box> */}

                    <Icon
                        as={FiMenu}
                        color="white"
                        onClick={() => setShowMenu(true)}
                        display={["block", "none"]}
                    />

                    <MotionBox
                        backgroundColor="white"
                        borderRadius="md"
                        shadow="md"
                        pos="absolute"
                        right={5}
                        px={4}
                        py={8}
                        variants={userDetailsVariants}
                        animate={showUserDetails ? "opened" : "closed"}
                        zIndex="dropdown"
                    >
                        <Center>
                            <Avatar size="sm" bg="cyan.500" />
                        </Center>
                        <Text color="gray.600" textAlign="center">{userEmail}</Text>
                        <Text color="gray.600" fontWeight="bold" textAlign="center">{userType}</Text>
                        <Center mt={4}>
                            <Button
                                variant="outline"
                                onClick={logout}
                                size="sm"
                            >
                                Sign out
                            </Button>
                        </Center>
                    </MotionBox>
                </Flex>
            </Box>
            <MotionBox
                backgroundColor="gray.700"
                pos="fixed"
                top={0}
                width="100vw"
                height="100vh"
                zIndex={10000}
                variants={menuVariants}
                animate={showMenu ? "opened" : "closed"}
                p={4}
                display={["block", "none"]}

            >
                <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                    overflow="auto"
                >
                    <Box overflow="auto" >
                        <Flex justifyContent="flex-end">
                            <CloseButton onClick={() => setShowMenu(false)} color="white" />
                        </Flex>
                        <VStack spacing={2}>
                            {
                                links.map((link, i) => (
                                    <React.Fragment key={i}>
                                        {
                                            link.type === "EM" &&
                                            (
                                                <ExpandableMenuItem
                                                    title={link.label}
                                                    icon={link.icon}
                                                    fontWeight="medium"
                                                    color="white"
                                                    contentbackground={link.contentbackground}
                                                    contentdata={link.contentdata}
                                                >
                                                    {
                                                        link.subLinks.map((subLink, j) => {
                                                            return (
                                                                <MenuItem
                                                                    key={j}
                                                                    icon={subLink.icon}
                                                                    label={subLink.label}
                                                                    onClick={subLink.onClick}
                                                                    onBack={remove}
                                                                    contentbackground={subLink.contentbackground}
                                                                    contentdata={subLink.contentdata}
                                                                />
                                                            );
                                                        })
                                                    }
                                                </ExpandableMenuItem>
                                            )
                                        }
                                        {
                                            link.type === "M" &&
                                            (
                                                <MenuItem
                                                    icon={link.icon}
                                                    label={link.label}
                                                    onClick={link.onClick}
                                                    onBack={remove}
                                                    contentbackground={link.contentbackground}
                                                    contentdata={link.contentdata}
                                                />
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </VStack>
                    </Box>
                    <Box overflow="auto" >
                        <Divider mb={2} bgColor="white" />
                        <Center>
                            <Avatar size="sm" bg="cyan.500" />
                        </Center>
                        <Text color="white" textAlign="center">{userEmail}</Text>
                        <Text color="white" textTransform="capitalize" fontWeight="bold" textAlign="center">{userType}</Text>
                        <Center mt={2}>
                            <Button
                                variant="outline"
                                color="white"
                                onClick={logout}
                            >
                                Sign out
                            </Button>
                        </Center>
                    </Box>
                </Flex>
            </MotionBox>
        </>
    );
}

export default Navbar;