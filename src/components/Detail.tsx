//Chakra ui
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
  Image,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

//Model type
import { Post } from "../model/Post";
import { Tags } from "../model/Tags";
import { Comment } from "../model/Comment";

//Next link
import Link from "next/link";

//Hook
import { useCallback, useState } from "react";
import useFetchAuthor from "../hook/useFetchAuthor";
import useFetchTag from "../hook/useFetchTag";
import useFetchComment from "../hook/useFetchComment";
import useFetchMedia from "../hook/useFetchMedia";

type Props = {
  post: Post | undefined;
};

const Detail = ({ post }: Props) => {
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { comment } = useFetchComment(post?.id);
  const { author } = useFetchAuthor(post?.author);
  const { tag } = useFetchTag(post?.id);
  const { media } = useFetchMedia(post?.featured_media);
  const cardBg = useColorModeValue("gray.300", "gray.700");

  // variable new comment for fetch POST
  const newComment = useCallback(() => {
    return {
      post: post?.id,
      author_name: "EEE",
      content: commentInput,
    };
  }, [post?.id, commentInput]);

  // variable new comment fake data for frontend
  const fakeComment = useCallback(() => {
    return {
      id: 1,
      post: post?.id,
      author_name: "EEE",
      content: { rendered: commentInput },
    };
  }, [post?.id, commentInput]);

  // just in case this post has no tag
  const renderNoTag = useCallback(() => {
    if (tag.length == 0) {
      return <Tag p={2}>No tag</Tag>;
    }
  }, [tag]);

  //POST comment
  const fetchAddComment = useCallback(async () => {
    try {
      const newCom = newComment();
      await fetch("https://fswd-wp.devnss.com/wp-json/wp/v2/comments", {
        method: "POST",
        body: JSON.stringify(newCom),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic ZnN3ZDpmc3dkLWNtcw==",
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  }, [newComment]);

  //Fake data affter user comment
  const addCommentInFront = useCallback(() => {
    const newCom: Comment = fakeComment();
    comment.push(newCom);
  }, [comment, fakeComment]);

  //Check input comment
  const checkInputComment = useCallback(() => {
    if (commentInput === "") {
      alert("error");
      return 0;
    }
  }, [commentInput]);

  //Button comment will call this function.
  const addComment = useCallback(() => {
    checkInputComment();
    fetchAddComment();
    addCommentInFront();
    setCommentInput("");
  }, [setCommentInput, fetchAddComment, addCommentInFront, checkInputComment]);

  return (
    <Box p={10}>
      <Center>
        <Text fontSize={50}>Detail page</Text>
      </Center>
      <Grid templateColumns="repeat(12, 1fr)" mt={5}>
        {/* content detail */}
        <GridItem colStart={{ base: 1, lg: 3 }} colEnd={{ base: 13, lg: 11 }}>
          <Grid
            templateColumns="repeat(12, 1fr)"
            bg={cardBg}
            borderRadius={20}
            p={5}
            boxShadow="2xl"
          >
            {/*Image post */}
            <GridItem colStart={1} colEnd={13}>
              <Box mb={30}>
                <Image
                  alt="name"
                  src={media?.source_url}
                  w={"100%"}
                  minH={{ base: 200, lg: 400 }}
                  maxH={{ base: 200, lg: 400 }}
                  borderTopRadius={30}
                ></Image>
              </Box>
            </GridItem>

            {/* Avatar and name*/}
            <GridItem colStart={1} colEnd={{ base: 13, lg: 4 }}>
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
            <GridItem colStart={{ base: 2, lg: 4 }} colEnd={13}>
              <Text fontSize={{ base: 20, lg: 30 }}>
                {post?.title.rendered}
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
                    size="lg"
                  >
                    <Menu>
                      <Link href={"/tag/" + tag.id} passHref>
                        <MenuButton isTruncated>
                          <Text isTruncated fontSize={{ base: 15, lg: 20 }}>
                            {tag.name}
                          </Text>
                        </MenuButton>
                      </Link>
                    </Menu>
                  </Tag>
                ))}
              </Flex>
              <Text fontSize={{ base: 15, lg: 20 }}>
                {post?.date.substring(0, 10)} {post?.date.substring(11)}
              </Text>
            </GridItem>

            {/* Content*/}
            <GridItem colStart={2} colEnd={12}>
              <Box
                mt={5}
                dangerouslySetInnerHTML={{
                  __html: String(post?.content.rendered),
                }}
              ></Box>
            </GridItem>

            {/* Comment*/}
            <GridItem colStart={{ base: 3, lg: 1 }} colEnd={4}>
              <Center mt={5}>
                <Text fontSize={{ base: 20, lg: 30 }}>Comment</Text>
              </Center>
            </GridItem>
            <GridItem colStart={{ base: 5, lg: 4 }} colEnd={8}>
              {showComments == false && (
                <Button
                  ml={1}
                  mt={5}
                  onClick={() => setShowComments(true)}
                  colorScheme="facebook"
                >
                  <Text>Show</Text>
                  <ArrowDownIcon ml={3} />
                </Button>
              )}
              {showComments == true && (
                <Button
                  ml={1}
                  mt={5}
                  onClick={() => setShowComments(false)}
                  colorScheme="facebook"
                >
                  <Text>Hide</Text>
                  <ArrowUpIcon ml={3} />
                </Button>
              )}
            </GridItem>
            <GridItem colStart={1} colEnd={12} mt={7}>
              {showComments &&
                comment.map((item: Comment) => (
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
            <GridItem
              colStart={{ base: 1, lg: 2 }}
              colEnd={{ base: 13, lg: 11 }}
            >
              {showComments && (
                <Input
                  w={"100%"}
                  onChange={(e) => setCommentInput(e.target.value)}
                  value={commentInput}
                  placeholder="Comment"
                  variant="filled"
                ></Input>
              )}
            </GridItem>
            <GridItem
              colStart={{ base: 1, lg: 11 }}
              colEnd={13}
              ml={{ base: 0, lg: 4 }}
              mt={{ base: 4, lg: 0 }}
            >
              {showComments && (
                <Button
                  onClick={() => addComment()}
                  w={"100%"}
                  colorScheme="facebook"
                >
                  Comment
                </Button>
              )}
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Detail;
