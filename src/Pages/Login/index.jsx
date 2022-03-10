import React from "react";
import {
    Box,
    Center,
    Text,
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    Select,
    Button,
    VStack,
    HStack,
    Image,
    useToast
} from '@chakra-ui/react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';





const Login = ({ history }) => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const toast = useToast();

    const handleSubmit = async () => {
        history.push("/DashBoard");
    }



    return (
        <Box overflow="hidden">
            <Center height="100vh">
                <Box position="relative">
                    <Box
                        position="absolute"
                        top="50%"
                        bottom="-16%"
                        left={["-2%", "-4%"]}
                        right={["-2%", "-4%"]}
                        bg="cyan.500"
                        display="flex"
                        alignItems="flex-end"
                    >

                    </Box>
                    <Box
                        w={["93vw", "36vw"]}
                        px={[2, 4]}
                        py={4}
                        shadow="md"
                        borderRadius="md"
                        borderWidth={1}
                        bg="white"
                        position="relative"
                    >
                        <VStack spacing={4} position="relative" bg="white" >
                            <HStack spacing={2}>

                                <Text
                                    textAlign="center"
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    letterSpacing="wider"
                                    // fontFamily="mono"
                                    color="cyan.500"
                                >
                                    Mail Interfaces
                                </Text>
                            </HStack>


                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<AiOutlineMail />}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        focusBorderColor="cyan.400"
                                        value={email}
                                        onChange={e => setEmail(e.target.value.trim())}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<AiOutlineLock />}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        focusBorderColor="cyan.400"
                                        value={password}
                                        onChange={e => setPassword(e.target.value.trim())}
                                    />
                                </InputGroup>
                            </FormControl>



                            <Box width="100%" display="flex" justifyContent="flex-end">
                                <Button
                                    colorScheme="cyan"
                                    variant="outline"
                                    letterSpacing={1.6}
                                    onClick={handleSubmit}
                                    isLoading={isSubmitting}
                                    isDisabled={isSubmitting}
                                >
                                    LOGIN
                                </Button>
                            </Box>
                        </VStack>
                    </Box>
                </Box>
            </Center>
        </Box>
    );
}


export default Login;