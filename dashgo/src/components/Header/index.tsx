import {
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import Profile from "./Profile";
import NotificationsNav from "./NotificationsNav";
import SearchBox from "./SearchBox";
import Logo from "./Logo";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { RiChatSettingsLine, RiMenuLine } from "react-icons/ri";

export default function Header() {
  const { onOpen } = useSidebarDrawer();

  const { colorMode, toggleColorMode } = useColorMode();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      <Logo />

      {isWideVersion && <SearchBox />}
      <Flex align="center" ml="auto">
        <IconButton
          aria-label="color mode"
          icon={<Icon as={RiChatSettingsLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={toggleColorMode}
          mr="2"
        />
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
