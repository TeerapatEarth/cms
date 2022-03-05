import type { NextPage } from "next";
import Head from "next/head";
import useFetchPost from "../../hook/useFetchPost"
import { Grid, GridItem, Center, Text, Box, Spinner } from "@chakra-ui/react";
import { Post } from "../../model/Post";
import Card from "../../components/Card";
import useFetchOneTag from "../../hook/useFetchOneTag"

interface Props {
  id: string
}

const TagPost: NextPage<Props> = ({id}) => {
  const { posts, loading, error } = useFetchPost("https://fswd-wp.devnss.com/wp-json/wp/v2/posts?tags="+id);
  const { tag } = useFetchOneTag(id)
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
        <title>{tag?.name}</title>
        <meta name="description" content="Home page"></meta>
      </Head>
      <Center>
        <Text fontSize={50}>{tag?.name}</Text>
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

export const getServerSideProps = (context: any) => {
  const { id } = context.query
  return {
    props: {
      id,
    }
  }
}

export default TagPost;
