import React from 'react';
import {
    Box,
    useMediaQuery
} from '@chakra-ui/react';
import { AiOutlineMail, AiOutlineUser, AiOutlineBank, AiTwotoneExperiment, AiOutlineForm } from 'react-icons/ai';
import { BsList, BsFillGridFill } from "react-icons/bs";
import { IoDiamondOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { HiDesktopComputer } from "react-icons/hi";
//import { AiOutlineSetting } from "react-icons/ai";
import { useHistory, useLocation } from "react-router-dom";

import SidebarMenu from '../../Components/SidebarMenu';
import Navbar from '../../Components/Navbar';





const Home = ({ children }) => {
    const [sidebarWidth, setSidebarWidth] = React.useState(240);
    const [isFullWidth, setIsFullWidth] = React.useState(true);
    const [isLargerthan480] = useMediaQuery("(min-width:480px)")



    const history = useHistory();

    React.useEffect(() => {
        const width = localStorage.getItem("sideBarWidth");
        if (width) {
            setSidebarWidth(Number(width));
            if (Number(width) === 220) {
                setIsFullWidth(true);
            } else {
                setIsFullWidth(false);
            }
        }
    }, []);

    const navbarHeight = 8.5; // vh

    let links = [
        {
            label: "Dashboards",
            icon: <BsFillGridFill color='white' />,
            type: 'M',
            link: "/DashBoard1",
            onClick: () => history.push("/DashBoard")
        },
        {
            label: "Layouts",
            link: '/DashBoard1',
            icon: <IoDiamondOutline color='white' />,
            type: 'M',
            onClick: () => {
                history.push("/DashBoard");
            }
        },
        {
            label: "Layouts",
            link: '/DashBoard1',
            icon: <GoGraph color='white' />,
            type: 'M',
            onClick: () => {
                history.push("/DashBoard");
            }
        },
        {
            label: "Mailbox",
            link: '/DashBoard',
            icon: <AiOutlineMail color='white' />,
            type: 'EM',
            contentbackground: "orange",
            contentdata: "16/24",
            subLinks: [
                {
                    label: "inbox",
                    link: '/MailBox',
                    type: 'ESM',
                    onClick: () => history.push('/DashBoard')
                },
                {
                    label: "Email view",
                    link: '/Emailview',
                    type: 'ESM',
                    onClick: () => history.push('/DashBoard')
                },
                {
                    label: "Compose Email",
                    link: '/ComposeMail',
                    type: 'ESM',
                    onClick: () => history.push('/DashBoard')
                },
                {
                    label: "Email templates",
                    link: '/templates',
                    type: 'ESM',
                    onClick: () => history.push('/DashBoard')
                },
            ],
            onClick: () => {
                history.push("/DashBoard");
            }
        },
        {
            label: "Metrics",
            link: '/DashBoard1',
            icon: <FaChartPie color='white' />,
            type: 'M',
            onClick: () => history.push("/DashBoard")
        },
        {
            label: "Widgets",
            link: '/DashBoard1',
            icon: <AiTwotoneExperiment color='white' />,
            type: 'M',
            onClick: () => history.push("/DashBoard")
        },
        {
            label: "Forms",
            link: '/DashBoard1',
            icon: <AiOutlineForm color='white' />,
            type: 'M',
            onClick: () => history.push("/DashBoard")
        },
        {
            label: "App Views",
            link: '/DashBoard1',
            icon: <HiDesktopComputer color='white' />,
            type: 'M',
            onClick: () => history.push("/DashBoard"),
            contentbackground: "gray",
            contentdata: "SPECIAL",
        }
    ]

    const computedSideBarWidth = links.length > 1 ? sidebarWidth : 0
    //console.log("Linkss......", links);
    return (
        <Box pos="relative" overflowX="hidden" backgroundColor="gray.50">
            {/* NAVBAR */}



            {/* CONTAIN */}
            {/* SIDE-MENU */}
            {
                console.log("isLargerthan480.....", isLargerthan480)
            }
            {
                (links.length > 1 && isLargerthan480) &&
                <Box
                    height="100vh"
                    pos="fixed"

                >

                    <SidebarMenu
                        links={links}
                        width={sidebarWidth}
                        height={100}
                        isFullWidth={isFullWidth}
                    />
                </Box>
            }
            <Navbar
                height={navbarHeight}
                sidebarWidth={sidebarWidth}
                onClick={() => {
                    if (sidebarWidth === 240) {
                        localStorage.setItem("sideBarWidth", 60);
                        setSidebarWidth(60);
                        setIsFullWidth(false);
                    } else {
                        localStorage.setItem("sideBarWidth", 240);
                        setSidebarWidth(240);
                        setIsFullWidth(true);
                    }
                }}
                showMenuButton={
                    links.length > 1
                }
                links={links}
            />

            {/* MAIN */}
            <Box
                ml={isLargerthan480 ? `${computedSideBarWidth}px` : 0}
                mt={`${navbarHeight}vh`}
                minH={`${100 - navbarHeight}vh`}
            >
                <Box pr={6} pl={6} pt={6} pb={0} bgColor="lightgray" overflow="hidden">
                    {children}
                </Box>
            </Box>
        </Box>
    );
}


export default Home;