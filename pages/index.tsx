import { Grid, GridItem, Center, Text, Box, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import Card from "../components/Card";
import { Post } from "../model/Post";
import Head from "next/head";
import useFetchAllPost from "../hook/useFetchAllPost";

const Home: NextPage = () => {
  const { posts, loading, error } = useFetchAllPost();

  if(loading){
    return (
      <div>loading</div>
    )
  }
  if(error){
    return (
      <div>error</div>
    )
  }
  return (
    <Box pl={10} pb={10} pr={10} pt={5}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page"></meta>
      </Head>
      <Center>
        <Text fontSize={50}>Home</Text>
      </Center>
      <Center pr={10} pl={10}>
        <Grid templateColumns="repeat(9, 1fr)" gap={10}>
          {posts.map((post: Post) => (
            <GridItem key={post.id} colSpan={{ base: 9, lg: 3, md: 9, sm: 9 }}>
              <Card post={post}></Card>
            </GridItem>
          ))}
        </Grid>
      </Center>
    </Box>
  );
};

export default Home;

//https://fswd-wp.devnss.com/wp-json/wp/v2/posts
