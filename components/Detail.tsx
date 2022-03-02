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
import { Comment } from "../model/Comment"

type Props = {
  post: Post | undefined;
};
const Detail = ({ post }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
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
    const newArr = comments;
    const newCom = { id: "1", user: "Teerapat", comment: commentInput}
    newArr.push(newCom);
    setComments(newArr);
    setCommentInput("");
  }, [commentInput, comments]);
  return (
    <Box p={10}>
      <Center>
        <Text fontSize={50}>Detail page</Text>
      </Center>
      <Grid templateColumns="repeat(12, 1fr)" mt={5}>
        <GridItem colSpan={2}></GridItem>
        <GridItem colSpan={8}>
          <Grid
            templateColumns="repeat(12, 1fr)"
            bg={cardBg}
            p={5}
            borderRadius={20}
          >
            <GridItem colSpan={3}>
              <Center>
                <Menu>
                  <Link href={"/author/" + author?.id} passHref>
                    <MenuButton aria-label="avatar">
                      <Avatar
                        size="2xl"
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
            <GridItem colSpan={9}>
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
                      <Link href={"/tag/" + tag.name} passHref>
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
            <GridItem colSpan={2}>
              <Center mt={5}>
                <Text fontSize={30}>Comment</Text>
              </Center>
            </GridItem>
            <GridItem colSpan={10}></GridItem>
            <GridItem colSpan={11} mt={5}>
              {comments.map((item, index) => (
                <Grid templateColumns="repeat(12, 1fr)" mb={5} key={index}>
                  <GridItem colSpan={2}>
                    <Center>
                      <Avatar size={"lg"}></Avatar>
                    </Center>
                  </GridItem>
                  <GridItem colSpan={10}>
                    <Box mb={5}>
                      <Text fontSize={20}>{item.user}</Text>
                      <Box mt={3}>
                        <Text fontSize={15}>{item.comment}</Text>
                      </Box>
                    </Box>
                  </GridItem>
                </Grid>
              ))}
            </GridItem>
            <GridItem colSpan={2}></GridItem>
            <GridItem colSpan={8}>
              <Input
                w={"100%"}
                onChange={(e) => setCommentInput(e.target.value)}
                value={commentInput}
                placeholder="Comment"
                variant="filled"
              ></Input>
            </GridItem>
            <GridItem colSpan={2} ml={4}>
              <Button onClick={() => addComment()}>Comment</Button>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={2}></GridItem>
      </Grid>
    </Box>
  );
};

export default Detail;
