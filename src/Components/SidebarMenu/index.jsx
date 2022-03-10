import React from 'react';
import {
    Box,
    Text,
    Image,
    HStack,
    Center,
    Flex,
    VStack,
    IconButton,
    Icon

} from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BsChevronUp, BsChevronLeft } from "react-icons/bs";
import { AiOutlineCaretDown } from "react-icons/ai";

const MotionBox = motion(Box);
const MotionChevronUpIcon = motion(BsChevronLeft);


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

const MenuItem = ({
    onClick = () => { },
    icon,
    title,
    fontWeight = "bold",
    fontSize = "lg",
    color,
    isActive = false,
    contentdata = "",
    contentbackground
}) => (
    <HStack
        spacing={2}
        cursor="pointer"
        _hover={{ bgColor: "whiteAlpha.200" }}
        borderRadius="md"
        bgColor={isActive ? "whiteAlpha.400" : "transparent"}
        p={2.5}

    >
        {icon}

        <HStack
            cursor="pointer"
            spacing={12}
        >
            <Text
                fontWeight={fontWeight}
                textTransform="capitalize"
                fontSize={fontSize}
                fontFamily="body"
                color={color}
            >
                {title}
            </Text>

            <Box fontSize="sm" paddingInline={2} borderRadius={3} backgroundColor={contentbackground}><Text fontSize="sm">{contentdata}</Text>
            </Box>
        </HStack>



    </HStack >

);

const ExpandableMenuItem = ({
    children,
    title,
    icon,
    fontWeight,
    fontSize = "medium",
    color,
    contentdata = "",
    contentbackground
}) => {
    const [show, setShow] = React.useState(false);

    return (
        <React.Fragment>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                onClick={() => setShow(!show)}
                _hover={{ bgColor: "whiteAlpha.500" }}
                cursor="pointer"
                borderRadius="md"
                p={2.5}

            >
                <HStack
                    cursor="pointer"
                    spacing={2}
                >
                    {icon}
                    <HStack
                        cursor="pointer"
                        spacing={12}
                    >
                        <Text
                            fontWeight={fontWeight}
                            textTransform="capitalize"
                            fontSize={fontSize}
                            fontFamily="body"
                            color={color}
                        >
                            {title}
                        </Text>

                        <Box fontSize="sm" paddingInline={2} borderRadius={3} backgroundColor={contentbackground}><Text fontSize="sm">{contentdata}</Text>
                        </Box>
                    </HStack>
                </HStack>
                <MotionChevronUpIcon
                    variants={expandIconVariants}
                    animate={show ? "opened" : "closed"}
                    color={color}
                    size="18px"
                    _hover={{ color: "whiteAlpha.500" }}
                />
            </Flex>
            <MotionBox
                variants={expandContentVariants}
                animate={show ? "opened" : "closed"}
                ml={2}
                pl={2}
                borderLeftWidth={1}
                borderLeftColor="whiteAlpha.400"
            >
                {children}
            </MotionBox>
        </React.Fragment>
    );
};



const SidebarMenu = ({
    links = [],
    width,
    height = 100,
    isFullWidth = true
}) => {
    const history = useHistory();
    const location = useLocation();
    const activeLink = location.pathname;

    return (
        <Box
            display={["hidden", "block"]}
            backgroundColor="gray.700"
            pos="fixed"
            left={0}
            bottom={0}
            height={`${height}vh`}
        >
            {
                isFullWidth ?
                    (
                        <>

                            <Flex
                                width={`${width}px`}
                                flexDirection="column"
                                justifyContent="space-between"
                                height="100%"
                            >


                                <Box p={3}>
                                    <Box backgroundColor="gray.700" paddingTop={1}  >

                                        <VStack >
                                            <Image
                                                borderRadius='full'
                                                boxSize='75px'
                                                src='https://bit.ly/dan-abramov'
                                                alt='Dan Abramov'

                                            />
                                            <Text color="white" fontSize="md" fontWeight="semibold">David Williams</Text>
                                            <HStack>
                                                <Text color="gray.400" fontSize="md" fontWeight="normal">Art Director</Text>

                                                <Icon as={AiOutlineCaretDown} color="white" />
                                            </HStack>
                                        </VStack>
                                    </Box>
                                    {
                                        links.map((link, i) => {
                                            return (
                                                <Box key={i}>
                                                    {
                                                        link.type === 'EM' &&
                                                        (
                                                            <ExpandableMenuItem
                                                                title={link.label}
                                                                icon={link.icon}
                                                                fontWeight={(link.subLinks.filter(x => activeLink === x.link).length > 0) ? "medium" : "normal"}
                                                                color={(link.subLinks.filter(x => activeLink === x.link).length > 0) ? "white" : "white"}
                                                                contentbackground={link.contentbackground}
                                                                contentdata={link.contentdata}
                                                            >

                                                                {
                                                                    link.subLinks.map((subLink, j) => {
                                                                        return (
                                                                            <MenuItem
                                                                                key={j}
                                                                                icon={subLink.icon}
                                                                                color={activeLink === subLink.link ? "gray.50" : "gray.400"}
                                                                                fontWeight={activeLink === subLink.link ? "medium" : "normal"}
                                                                                title={subLink.label}
                                                                                isActive={activeLink === subLink.link}
                                                                                fontSize="md"
                                                                                onClick={subLink.onClick}
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
                                                        link.type === 'M' &&
                                                        (
                                                            <MenuItem
                                                                title={link.label}
                                                                icon={link.icon}
                                                                fontSize="md"
                                                                isActive={activeLink === link.link}
                                                                color={activeLink === link.link ? "gray.50" : "gray.400"}
                                                                fontWeight={activeLink === link.link ? "medium" : "normal"}
                                                                onClick={link.onClick}
                                                                contentbackground={link.contentbackground}
                                                                contentdata={link.contentdata} />

                                                        )
                                                    }

                                                </Box>
                                            );
                                        }
                                        )
                                    }
                                </Box>
                                {/* {
                                isFullWidth &&
                                (
                                    <Box
                                        bg="gray.700"
                                        display="flex"
                                        alignItems="flex-end"
                                    >
                                        <Center width="100%">
                                            <HStack spacing={2}>
                                                <Text fontFamily="monospace" color="gray.400">Powered by</Text>
                                                <Image
                                                    boxSize="40px"
                                                    objectFit="cover"
                                                    src={AlmawizLogo}
                                                    alt="Almawiz Logo"
                                                />
                                            </HStack>
                                        </Center>
                                    </Box >
                                )
                            } */}
                            </Flex >
                        </>
                    ) :
                    (
                        <Flex
                            flexDirection="column"
                            justifyContent="space-between"
                            width={`${width}px`}
                            height="100%"
                        >
                            <VStack spacing={2} px={4} pt={4}>
                                <Text fontSize="2xl" color="white">IN+</Text>
                                {
                                    links.map((link, i) => {
                                        return (
                                            <IconButton
                                                key={i}
                                                icon={link.icon}
                                                colorScheme="blackAlpha"
                                                size="md"
                                                isActive={activeLink === link.link}
                                                // onClick={() => history.push("subLinks" in link ? link.defaultLink : link.link)}
                                                onClick={link.onClick}
                                            />
                                        );
                                    })
                                }
                            </VStack>

                        </Flex>
                    )
            }
        </Box >
    );
}

export default SidebarMenu;