import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Menu,
  MenuButton,
  HStack,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { ReactNode } from "react";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgNav = useColorModeValue("blue.400", "gray.900");
  const bgButtonTheme = useColorModeValue("blue.400", "gray.900");

  const NavLink = ({
    children,
    page,
  }: {
    children: ReactNode;
    page: string;
  }) => (
    <NextLink href={page} passHref>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {children}
      </Link>
    </NextLink>
  );

  return (
    <>
      <Box bg={bgNav} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={10}>
            <Text fontSize={{base: 20, lg: 25}}>Front-end CMS</Text>
            <Box>
              <NavLink page={"/"}>
                Home
              </NavLink>
            </Box>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                aria-label="mode"
                onClick={toggleColorMode}
                bg={bgButtonTheme}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
