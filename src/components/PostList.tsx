import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import useFetchPost from "../hook/useFetchPost";
import { Post } from "../model/Post";
import Link from "next/link"

type Props = {
  id: string | undefined;
};

const PostList = ({ id }: Props) => {
  const { posts } = useFetchPost(
    "https://fswd-wp.devnss.com/wp-json/wp/v2/posts/?author=" + id
  );

  return (
    <Box bg={"blackAlpha.300"} borderRadius={10} p={5} overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Date</Th>
            <Th isNumeric>Detail</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post: Post) => (
            <Tr key={post.id}>
              <Td>{post.title.rendered}</Td>
              <Td>
                {post.date.substring(0, 10)} {post.date.substring(11)}
              </Td>
              <Td isNumeric>
                <Link href={{ pathname: "/post/" + post.id }} passHref>
                  <Button colorScheme={"blue"}>Detail</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PostList;
