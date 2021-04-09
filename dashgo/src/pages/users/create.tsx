import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

import { RiAddLine, RiSkipBackLine } from "react-icons/ri";
import { Input } from "../../components/Form/Input";

import Header from "../../components/Header";

import { Sidebar } from "../../components/Sidebar";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

type CreateFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createFormShema = yup.object().shape({
  email: yup.string().required("email obrigatorio").email(),
  name: yup.string().required("Nome obrigatorio"),
  password: yup
    .string()
    .required("password obrigatorio")
    .min(6, "no minimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const { register, handleSubmit, formState, setValue, getValues } = useForm({
    resolver: yupResolver(createFormShema),
  });

  const { errors } = formState;

  const handleForm: SubmitHandler<CreateFormData> = async (data, event) => {
    event.preventDefault();
    await new Promise((resolver) => setTimeout(resolver, 2000));
    console.log("data", data);
  };

  useEffect(() => {
    setValue("name", "fulano");
  }, []);

  console.log("getvalue: ", getValues());

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth="1480" mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleForm)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuários
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register("name")}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button
                  as="a"
                  leftIcon={<Icon as={RiSkipBackLine} fontSize="20" />}
                  colorScheme="whiteAlpha"
                >
                  Cancelar
                </Button>
              </Link>

              <Button
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}