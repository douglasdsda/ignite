import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export default function NavSection({ title, children }: NavSectionProps) {
  const color = useColorModeValue("gray.400", "gray.400");

  return (
    <Box>
      <Text fontWeight="bold" color={color} fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
