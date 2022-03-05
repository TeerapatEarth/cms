import { Post } from "../model/Post";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Center,
  Menu,
  MenuButton,
  Avatar,
  Tag,
  Flex,
  useColorModeValue,
  Input,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import useFetchAuthor from "../hook/useFetchAuthor";
import { useCallback, useState } from "react";
import useFetchTag from "../hook/useFetchTag";
import { Tags } from "../model/Tags";
import useFetchComment from "../hook/useFetchComment";
import { Comment } from "../model/Comment";

type Props = {
  post: Post | undefined;
};
const Detail = ({ post }: Props) => {
  const { comment } = useFetchComment(post?.id);
  const [commentInput, setCommentInput] = useState("");
  const { author } = useFetchAuthor(post?.author);
  const { tag } = useFetchTag(post?.id);
  const cardBg = useColorModeValue("gray.300", "gray.700");
  const renderNoTag = useCallback(() => {
    if (tag.length == 0) {
      return <Tag p={2}>No tag</Tag>;
    }
  }, [tag]);

  const addComment = useCallback(() => {
    if(commentInput === ""){
      return 0;
    }
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = (date.getMonth() < 10) ? "0"+date.getMonth() : date.getMonth().toString()
    const day = (date.getDate() < 10) ? "0"+date.getDate() : date.getDate().toString()
    const hour = (date.getHours() < 10) ? "0"+date.getHours() : date.getHours().toString()
    const miniute = (date.getMinutes() < 10) ? "0"+date.getMinutes() : date.getMinutes().toString()
    const second = (date.getSeconds() < 10) ? "0"+date.getSeconds() : date.getSeconds().toString()
    const newCom : Comment = {
      id: 1,
      post: post?.id,
      author_name: "Teerapat",
      content: {rendered: commentInput},
      date: `${year}-${month}-${day}T${hour}:${miniute}:${second}`,
      avatar_urls: {"24": "", "48": "", "96": ""}
    };
    comment.push(newCom);
    setCommentInput("");
  }, [commentInput, comment, setCommentInput, post?.id]);

  return (
    <Box p={10}>
      <Center>
        <Text fontSize={50}>Detail page</Text>
      </Center>
      <Grid templateColumns="repeat(12, 1fr)" mt={5}>
        <GridItem colSpan={2}></GridItem>

        {/* content detail */}
        <GridItem colSpan={{ base: 12, lg: 8, md: 12, sm: 12 }}>
          <Grid
            templateColumns="repeat(12, 1fr)"
            bg={cardBg}
            p={5}
            borderRadius={20}
          >
            {/* Avatar and name*/}
            <GridItem colSpan={{ base: 12, lg: 3 }}>
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
                <Text fontSize={30}>{author?.name}</Text>
              </Center>
            </GridItem>

            {/* Detail post*/}
            <GridItem colSpan={{ base: 12, lg: 9 }}>
              <Text fontSize={30}>{post?.title.rendered}</Text>
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
                    size="lg"
                  >
                    <Menu>
                      <Link href={"/tag/" + tag.id} passHref>
                        <MenuButton isTruncated>
                          <Text isTruncated fontSize={20}>
                            {tag.name}
                          </Text>
                        </MenuButton>
                      </Link>
                    </Menu>
                  </Tag>
                ))}
              </Flex>
              <Text fontSize={20}>
                {post?.date.substring(0, 10)} {post?.date.substring(11)}
              </Text>
            </GridItem>

            {/* Content*/}
            <GridItem colSpan={1}></GridItem>
            <GridItem colSpan={10}>
              <Box
                mt={5}
                dangerouslySetInnerHTML={{
                  __html: String(post?.content.rendered),
                }}
              ></Box>
            </GridItem>
            <GridItem colSpan={1}></GridItem>

            {/* Comment*/}
            <GridItem colSpan={{ base: 12, lg: 2 }}>
              <Center mt={5}>
                <Text fontSize={30}>Comment</Text>
              </Center>
            </GridItem>
            <GridItem colSpan={{ base: 12, lg: 10 }}></GridItem>
            <GridItem colSpan={12} mt={5}>
              {comment.map((item: Comment) => (
                <Grid templateColumns="repeat(12, 1fr)" mb={5} key={item.id}>
                  <GridItem colSpan={{ base: 4, lg: 2 }}>
                    <Center>
                      <Avatar size={"lg"}></Avatar>
                    </Center>
                  </GridItem>
                  <GridItem colSpan={{ base: 8, lg: 10 }}>
                    <Box mb={5}>
                      <Flex>
                        <Text fontSize={20}>{item.author_name}</Text>
                        <Text fontSize={10} mt={3} ml={3}>
                          {item.date.substring(0, 10)} {item.date.substring(11)}
                        </Text>
                      </Flex>
                      <Box mt={3}>
                        <Text
                          fontSize={15}
                          dangerouslySetInnerHTML={{
                            __html: String(item.content.rendered),
                          }}
                        ></Text>
                      </Box>
                    </Box>
                  </GridItem>
                </Grid>
              ))}
            </GridItem>

            {/* Comment input*/}
            <GridItem colSpan={{ base: 12, lg: 1 }}></GridItem>
            <GridItem colSpan={{ base: 12, lg: 9 }}>
              <Input
                w={"100%"}
                onChange={(e) => setCommentInput(e.target.value)}
                value={commentInput}
                placeholder="Comment"
                variant="filled"
              ></Input>
            </GridItem>
            <GridItem
              colSpan={{ base: 12, lg: 2 }}
              ml={{ base: 0, lg: 4 }}
              mt={{ base: 4, lg: 0 }}
            >
              <Button
                onClick={() => addComment()}
                w={"100%"}
                colorScheme="facebook"
              >
                Comment
              </Button>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem colSpan={2}></GridItem>
      </Grid>
    </Box>
  );
};

export default Detail;
