import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export default function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Douglas Souza</Text>
          <Text color="gray.300" fontSize="small">
            douglas@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Douglas Souza"
        src="https://github.com/douglasdsda.png"
      />
    </Flex>
  );
}
