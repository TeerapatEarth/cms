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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("blue.400", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Menu>
            <Link href={"/"} passHref>
              <MenuButton>
                <Text fontSize={25}>Front-end CMS</Text>
              </MenuButton>
            </Link>
          </Menu>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                aria-label="mode"
                onClick={toggleColorMode}
                bg={useColorModeValue("blue.400", "gray.900")}
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
