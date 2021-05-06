import Head from "next/head";
import {
  Flex,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
  Grid,
  Box,
  Image,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";
import { AiOutlineUser } from "react-icons/ai";

type SignInFormData = {
  email: string;
  password: string;
};

const signInputFOrmShema = yup.object().shape({
  email: yup.string().required("email obrigatorio").email(),
  password: yup.string().required("password obrigatorio"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInputFOrmShema),
  });

  const { errors } = formState;

  const bg = useColorModeValue("gray.500", "gray.800");
  const color = useColorModeValue("gray.700", "gray.50");
  const colorButton = useColorModeValue("orange", "pink");

  const handleSignIn: SubmitHandler<SignInFormData> = async (data, event) => {
    event.preventDefault();
    await new Promise((resolver) => setTimeout(resolver, 2000));
    console.log("data", data);
  };

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  return (
    <Flex w="100vw" h="100vh" flexDir="column">
      <Head>
        <title>SignIn | dashgo</title>
      </Head>
      <Grid w="100vw" h="100vh" templateColumns={`repeat(${!isDrawerSidebar ? 2 : 1},1fr)`}>
        { !isDrawerSidebar && (<Flex align="center" justify="center" w="100%" h="100%">
         <Image h="100vh" objectFit="cover" src="/images/download.jfif" />
        </Flex>)}
        <Flex flex="1" align="center" justify="center">
          <Flex
            as="form"
            w="100%"
            maxWidth={360}
            bgColor={bg}
            color={color}
            p="8"
            m="2"
            borderRadius="8"
            flexDir="column"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Stack spacing="4">
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                error={errors.email}
                label="E-mail"
                {...register("email")}
              />

              <Input
                type="password"
                placeholder="Senha"
                name="password"
                label="Senha"
                error={errors.password}
                {...register("password")}
              />
            </Stack>
            <Button
              isLoading={formState.isSubmitting}
              type="submit"
              colorScheme={colorButton}
              mt="6"
              size="lg"
            >
              Entrar
            </Button>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
}
