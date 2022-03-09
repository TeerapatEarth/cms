import {
  Flex,
  Tag,
  Text,
  useColorModeValue,
  Avatar,
  Center,
  Grid,
  GridItem,
  Stack,
  Button,
  Menu,
  MenuButton,
  Image,
  Box
} from "@chakra-ui/react";
import { useCallback } from "react";
import { Tags } from "../model/Tags";
import { Post } from "../model/Post";
import Link from "next/link";
import useFetchTag from "../hook/useFetchTag";
import useFetchAuthor from "../hook/useFetchAuthor";
import useFetchMedia from "../hook/useFetchMedia"

type Props = {
  post: Post;
};

const Card = ({ post }: Props) => {
  const { tag } = useFetchTag(post.id);
  const { author } = useFetchAuthor(post.author);
  const { media } = useFetchMedia(post.featured_media)
  const cardBg = useColorModeValue("gray.300", "gray.700");

  const renderNoTag = useCallback(() => {
    if (tag.length == 0) {
      return <Tag p={2}>No tag</Tag>;
    }
  }, [tag]);

  return (
    <Stack bg={cardBg} mt={5} borderRadius={30} boxShadow='2xl' _hover={{
      boxShadow: "dark-lg"
    }}>
      
      {/* image post */}
      <Box mb={4}>
        <Image
          alt="name"
          src={media?.source_url}
          w={"100%"}
          minH={230}
          maxH={230}
          borderTopRadius={30}
        ></Image>
      </Box>

      {/*detail */}
      <Grid templateColumns="repeat(5, 1fr)" pl={5} pr={5} pb={5}>
        <GridItem colSpan={1}>
          <Center>
            <Menu>
              <Link href={"/author/" + author?.id} passHref>
                <MenuButton aria-label="avatar">
                  <Avatar
                    size="xl"
                    src={author?.avatar_urls[96]}
                    name=""
                  ></Avatar>
                </MenuButton>
              </Link>
            </Menu>
          </Center>
          <Center mt={3}>
            <Text fontSize={20}>{author?.name}</Text>
          </Center>
        </GridItem>
        <GridItem colSpan={4} ml={10}>
          <Text fontSize={20} isTruncated>
            {post.title.rendered}
          </Text>
          <Flex mt={3} mb={3}>
            {renderNoTag()}
            {tag.map((tag: Tags) => (
              <Tag
                key={tag.id}
                mr={3}
                colorScheme="facebook"
                variant="solid"
                p={2}
                _hover={{
                  background: "blue.600",
                  color: "white.500",
                }}
              >
                <Menu>
                  <Link href={"/tag/" + tag.id} passHref>
                    <MenuButton isTruncated>
                      <Text isTruncated>{tag.name}</Text>
                    </MenuButton>
                  </Link>
                </Menu>
              </Tag>
            ))}
          </Flex>
          <Text fontSize={15}>
            {post.date.substring(0, 10)} {post.date.substring(11)}
          </Text>
          <Flex justifyContent={"flex-end"} mt={5}>
            <Link href={{ pathname: "/post/" + post.id }} passHref>
              <Button aria-label="detail" title="detail" colorScheme={"blue"}>
                Detail
              </Button>
            </Link>
          </Flex>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default Card;
