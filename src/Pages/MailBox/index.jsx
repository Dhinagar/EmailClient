import React from "react";
import {
    Box,
    Center,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    Button,
    VStack,
    HStack,
    Image,
    useToast,
    Flex, SimpleGrid,
    Icon,
    IconButton,
    Badge,
    Spacer,
    Checkbox,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Textarea
} from '@chakra-ui/react';
import { AiOutlineInbox, AiOutlineMail, AiFillEye, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { GiSevenPointedStar, GiGears } from "react-icons/gi";
import { RiDraftLine } from "react-icons/ri";
import { FaRegTrashAlt, FaExclamation } from "react-icons/fa";
import { BsFillTagFill } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { Email, addEmails, getEmails, deleteEmail, getDeletedEmails } from "../../HelFns/index"

const MailBox = () => {
    const {
        isOpen,
        onClose,
        onOpen
    } = useDisclosure();

    const [emails, setEmails] = React.useState([]);
    const [from, setFrom] = React.useState("");
    const [to, setTo] = React.useState("");
    const [cc, setCc] = React.useState("");
    const [bcc, setBcc] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [data, setData] = React.useState("");
    const [deletedata, setDeleteData] = React.useState();
    const [deletedataArray, setDeleteDataArray] = React.useState();
    const [inboxeEmails, setInboxEmails] = React.useState([]);
    const [inboxcount, setInboxcount] = React.useState(0);
    const [deletedCount, setDeleteCount] = React.useState(0);
    const [pageHeading, setPageHeading] = React.useState("Inbox");
    const [pageHeadingCount, setPageHeadingCount] = React.useState(0);

    const folders = [
        { lable: "Inbox", icon: <AiOutlineInbox />, contentData: inboxcount, contentBackground: "orange", onclick: inboxeEmails },
        { lable: "Send Mail", icon: <AiOutlineMail />, contentData: inboxcount, contentBackground: "", onclick: inboxeEmails },
        { lable: "Important", icon: <GiSevenPointedStar />, contentData: "", contentBackground: "", onclick: [] },
        { lable: "Drafts", icon: <RiDraftLine />, contentData: deletedCount, contentBackground: "red", onclick: deletedataArray },
        { lable: "Trash", icon: <FaRegTrashAlt />, contentData: "", contentBackground: "", onclick: [] }
    ]
    const Categories = [{ label: "Work", color: "green" }, { label: "Documents", color: "red" }, { label: "Social", color: "lightblue" }, { label: "Advertising", color: "gray" }, { label: "Clients", color: "orange" }]
    const labels = [{ label: "Family" }, { label: "Work" }, { label: "Home" }, { label: "Children" }, { label: "Holidays" }, { label: "Music" }, { label: "Photo" }, { label: "Filim" }]
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const sendMail = () => {
        setEmails(addEmails(new Email(from, to, cc, bcc, subject, data, new Date().getDate() + " " + monthNames[new Date().getMonth()])))
        setvals()
    }
    React.useEffect(() => {
        setEmails(getEmails())
        setInboxEmails(getEmails())
        setDeleteDataArray(getDeletedEmails())
        setInboxcount(getEmails().length)
        setDeleteCount(getDeletedEmails().length)
    }, []);
    const setvals = () => {
        setEmails(getEmails())
        setDeleteDataArray(getDeletedEmails())
        setInboxcount(getEmails().length)
        setDeleteCount(getDeletedEmails().length)
    }


    return (
        <React.Fragment>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                position="relative"
                bgColor="lightgray"

            >
                <IconButton
                    variant="solid"
                    colorScheme="green"
                    aria-label="Setting"
                    icon={<Icon as={GiGears} w={9} h={9} />}
                    size="lg"
                    pos="fixed"
                    top={"13%"}
                    right={0}
                    borderTopLeftRadius={50}
                    borderTopRightRadius={0}
                    borderBottomLeftRadius={50}
                    borderBottomRightRadius={0}

                />
                {/* <Box width={["100%"]} bgColor="lightgreen"> */}
                <Flex w={"100%"} >

                    <Box h={"88vh"} width={["100%", "30%"]} bgColor="lightgray" >
                        <Box pl={8} pt={8}>
                            <VStack>
                                <Box as='button' w="80%" borderRadius='sm' bg='tomato' color='white' h={10} onClick={() => { onOpen() }}>
                                    Compose Mail
                                </Box>

                                <Text w="80%" borderRadius='sm' color='white' >
                                    FOLDERS
                                </Text>
                                {
                                    folders.map((e, i) => (
                                        <>
                                            <HStack
                                                w="80%"
                                                cursor="pointer"
                                                spacing={2}
                                                onClick={() => { setEmails(e.onclick); setPageHeading(e.lable); setPageHeadingCount(e.contentData) }}
                                            >
                                                {e.icon}
                                                <HStack
                                                    cursor="pointer"
                                                    alignContent="flex-end"
                                                    w="80%"
                                                >
                                                    <Box>
                                                        <Text
                                                            textTransform="capitalize"
                                                            fontFamily="body"
                                                            color="green"
                                                        >
                                                            {e.lable}
                                                        </Text>
                                                    </Box>
                                                    <Spacer />
                                                    <Box>
                                                        <Badge ml='1' fontSize="10px" top={-5} bgColor={e.contentBackground}>
                                                            {e.contentData}
                                                        </Badge>
                                                    </Box>

                                                </HStack>
                                            </HStack>

                                        </>


                                    ))

                                }
                                <Text w="80%" borderRadius='sm' color='white' >
                                    CATEGORIES
                                </Text>
                                {
                                    Categories.map((e, i) => (
                                        <>
                                            <HStack
                                                w="80%"
                                                cursor="pointer"
                                                spacing={2}
                                            >
                                                <Box height="10px" width="10px" borderWidth={1} borderColor="black" borderRadius="100%" bgColor={e.color}></Box>

                                                <Box>
                                                    <Text
                                                        textTransform="capitalize"
                                                        fontFamily="body"
                                                        color="green"
                                                    >
                                                        {e.label}
                                                    </Text>
                                                </Box>

                                            </HStack>

                                        </>


                                    ))

                                }
                                <Text w="80%" borderRadius='sm' color='white' >
                                    LABELS
                                </Text>
                                <SimpleGrid columns={[2, null, 3]} spacing={3} w="80%">
                                    {
                                        labels.map((e, i) => (



                                            <Badge fontSize="10px" bgColor={e.contentBackground}>
                                                <HStack
                                                    cursor="pointer"
                                                    spacing={1}
                                                >
                                                    <BsFillTagFill />
                                                    <Text w="100%" p={1}>{e.label}</Text>
                                                </HStack>
                                            </Badge>



                                        ))

                                    }
                                </SimpleGrid>


                            </VStack>
                        </Box>
                    </Box>


                    <Box h={"88vh"} width={["100%", "70%"]} bgColor="white" overflowY="auto">

                        <HStack >


                            <Flex p={4} alignItems="flex-start" justifyContent="flex-start">
                                <VStack spacing={4}>
                                    <HStack spacing={12}>
                                        <HStack spacing={9}>
                                            <Box>
                                                <Text fontSize={32}>{pageHeading}({pageHeadingCount})</Text>
                                            </Box>
                                            <Spacer />

                                        </HStack>
                                        <Spacer />
                                    </HStack>

                                    <Box >
                                        <HStack spacing={2}>

                                            <Button
                                                borderColor="green"
                                                size="sm"
                                                variant="solid"
                                                leftIcon={<FiRefreshCcw />}
                                                color="green"
                                                borderRadius={0}
                                                borderWidth={1}
                                            // isDisabled={isbuttonDisplay}
                                            // onClick={() => { addDomain() }}
                                            >
                                                Refresh
                                            </Button>
                                            <IconButton
                                                borderWidth={1}
                                                borderColor="green"
                                                colorScheme="white"
                                                color="green"
                                                aria-label="customer details"
                                                size="sm"
                                                borderRadius={0}
                                                icon={<AiFillEye />}
                                            //onClick={() => {  }}
                                            />
                                            <IconButton
                                                borderWidth={1}
                                                borderColor="green"
                                                colorScheme="white"
                                                color="green"
                                                aria-label="customer details"
                                                size="sm"
                                                borderRadius={0}
                                                icon={<FaExclamation />}
                                            // onClick={() => {}}
                                            />
                                            <IconButton
                                                borderWidth={1}
                                                borderColor="green"
                                                colorScheme="white"
                                                color="green"
                                                aria-label="customer details"
                                                size="sm"
                                                borderRadius={0}
                                                icon={<FaRegTrashAlt />}
                                                onClick={() => { deleteEmail(deletedata), setvals() }}
                                            />
                                        </HStack>
                                    </Box>
                                </VStack>
                            </Flex>
                            <Spacer />
                            <Flex alignItems="flex-end" justifyContent="flex-end" pt={6} pr={8}>
                                <VStack spacing={4}>
                                    <Box>
                                        <HStack spacing={0} >
                                            <Spacer />
                                            <InputGroup size="sm" borderRadius={0} >
                                                <Input type="text" placeholder="Search Email..." />
                                            </InputGroup>
                                            <Button

                                                colorScheme="green"
                                                size="sm"
                                                variant="solid"
                                                color="white"
                                                borderRadius={0}
                                            >
                                                Search
                                            </Button>
                                        </HStack>
                                    </Box>

                                    <Box>
                                        <HStack ml={40}>
                                            <Spacer />
                                            <HStack spacing={5}>
                                                <Spacer />
                                                <HStack spacing={0}>
                                                    <IconButton
                                                        borderWidth={1}
                                                        borderColor="green"
                                                        colorScheme="white"
                                                        color="green"
                                                        aria-label="Prev"
                                                        size="sm"
                                                        borderRadius={0}
                                                        icon={<AiOutlineArrowLeft />}
                                                    // onClick={() => {}}
                                                    />
                                                    <IconButton
                                                        borderWidth={1}
                                                        borderColor="green"
                                                        colorScheme="white"
                                                        color="green"
                                                        aria-label="next"
                                                        size="sm"
                                                        borderRadius={0}
                                                        icon={<AiOutlineArrowRight />}
                                                        onClick={() => { }}
                                                        cursor="pointer"
                                                    />
                                                </HStack>
                                            </HStack>
                                        </HStack>
                                    </Box>
                                </VStack>

                            </Flex>
                        </HStack >
                        {
                            console.log("emails.......", emails)
                        }
                        {
                            emails && emails.map((e, i) => (
                                <Box width="100%" h={10} borderWidth={1} borderColor="lightgray">
                                    <HStack spacing={10} key={i}>
                                        <Box width="20%"> <Checkbox p={2} onChange={() => setDeleteData(e)}><Text ml={4} fontWeight="semibold" >{e.from.split("@")[0]}</Text></Checkbox></Box>
                                        <Box textAlign="center" w="10%"><Text fontSize="sm" pl={2} pr={2} border={1} borderRadius={3} bgColor="red">clients</Text></Box>
                                        <Box width="55%" ><Text fontSize="sm">{e.body}</Text></Box>
                                        <Box width="10%"> <Text fontSize="sm">{e.created}</Text></Box>
                                    </HStack>
                                </Box>
                            ))
                        }


                    </Box>

                    {/* </Box> */}
                </Flex>
            </Flex >
            <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>Add Worker</ModalHeader> */}
                    <ModalBody>
                        <Box p={4}>
                            <VStack spacing={2}>
                                <FormControl >
                                    <FormLabel>
                                        <Text>
                                            From{" "}
                                            <Text as="span" color="red.600">*</Text>
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="From"
                                        value={from}
                                        onChange={(e) => { setFrom(e.target.value) }}
                                    />
                                </FormControl>
                                <FormControl >
                                    <FormLabel>
                                        <Text>
                                            To{" "}
                                            <Text as="span" color="red.600">*</Text>
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="to"
                                        value={to}
                                        onChange={e => setTo(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl >
                                    <FormLabel>
                                        <Text>
                                            Cc{" "}
                                            <Text as="span" color="red.600"></Text>
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="cc"
                                        value={cc}
                                        onChange={e => setCc(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl >
                                    <FormLabel>
                                        <Text>
                                            Bcc{" "}
                                            <Text as="span" color="red.600"></Text>
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="bcc"
                                        value={bcc}
                                        onChange={e => setBcc(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl >
                                    <FormLabel>
                                        <Text>
                                            Subject{" "}
                                            <Text as="span" color="red.600">*</Text>
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="subject"
                                        value={subject}
                                        onChange={e => setSubject(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl width="100%" key="data">
                                    <FormLabel>
                                        <Text>

                                        </Text>
                                    </FormLabel>
                                    <Textarea
                                        placeholder="Type Here..."
                                        bgColor="white"
                                        color="black.400"
                                        value={data}
                                        onChange={e => {
                                            const { value } = e.target;
                                            setData(value)
                                        }}
                                        minH="20vh"
                                    />

                                </FormControl>



                            </VStack>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => { sendMail(); onClose() }}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment >
    )

}
export default MailBox