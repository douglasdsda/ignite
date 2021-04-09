import Head from "next/head";
import { Flex, Button, Stack, useColorMode } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInputFOrmShema = yup.object().shape({
  email: yup.string().required('email obrigatorio').email(),
  password: yup.string().required('password obrigatorio'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInputFOrmShema),
  });

  const { errors } = formState;

  const { colorMode, toggleColorMode } = useColorMode()
 

  const handleSignIn: SubmitHandler<SignInFormData> = async (data, event) => {
    event.preventDefault();
    await new Promise((resolver) => setTimeout(resolver, 2000));
    console.log("data", data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Head>
        <title>SignIn | dashgo</title>
      </Head>
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bgColor="gray.800"
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
          colorScheme="pink"
          mt="6"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
