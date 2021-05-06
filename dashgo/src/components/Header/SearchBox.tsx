import { Flex, Input, Icon, useColorModeValue } from "@chakra-ui/react";
import { useRef } from "react";
import {
  RiSearchLine,
} from "react-icons/ri";

export default function SearchBox() {

  const bg = useColorModeValue("gray.100", "gray.800")
  const color = useColorModeValue("gray.700", "gray.200")
  const inputColor = useColorModeValue("gray.700", "gray.50")
  const placeholderColor = useColorModeValue("gray.700", "gray.400")

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color={color}
      position="relative"
      bg={bg}
      borderRadius="full"
    >
      <Input
        color={inputColor}
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{
          color: {placeholderColor},
        }}
       
      ></Input>

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
