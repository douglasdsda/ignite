import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryCLient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};


type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export default function UserList({dataBase}) {
  const [ page, setPage] = useState(1)
  // const { data, isLoading, error, isFetching } = useUsers(page, {
  //   initialData: dataBase,
  // });
  const { data, isLoading, error, isFetching } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const bg = useColorModeValue("gray.100", "gray.800");
  const color = useColorModeValue("gray.700", "gray.50");
  const tableColor = useColorModeValue("gray.100", "whiteAlpha");
  const fontColor = useColorModeValue("gray.500", "gray.300");

  useEffect(() => {}, []);

  async function handlePrefetchUser(userId: string){
    await queryCLient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)
      return response.data;
    },{
      staleTime: 1000 * 60 * 10 // 10 minutos
    })
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth="1480" mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg={bg} p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                as="a"
                cursor="pointer"
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha em carregar os dados de usuário.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme={tableColor}>
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {isWideVersion && <Th>Opções</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            {/* <Text fontWeight="bold"> {user.name}</Text> */}
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold"> {user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color={fontColor}>
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Button
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              as="a"
                              cursor="pointer"
                            >
                              Editar
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {


  // const {users, totalCount} = await getUsers(1)
  const dataBase = await getUsers(1)

  return {
    props: {
      dataBase,
    }
  }
}