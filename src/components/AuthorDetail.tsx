import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Author } from "../model/Author";
import PostList from "./PostList";
type Props = {
  author: Author | undefined;
};
const AuthorDetail = ({ author }: Props) => {
  const cardBg = useColorModeValue("gray.300", "gray.700");
  return (
    <Box>
      <Grid templateColumns="repeat(12, 1fr)" p={10}>
        <GridItem colStart={2} colEnd={12}>
          <Grid
            templateColumns="repeat(12, 1fr)"
            bg={cardBg}
            p={10}
            borderRadius={30}
          >
            <GridItem colStart={2} colEnd={4}>
              <Avatar
                size="2xl"
                src={author?.avatar_urls[96]}
                name=""
                w={150}
                height={150}
              ></Avatar>
            </GridItem>
            <GridItem colStart={4} mt={5}>
              <Text fontSize={60}>{author?.name}</Text>
            </GridItem>
            <GridItem colStart={2} colEnd={5} mt={5}>
              <Text fontSize={25}>Post by {author?.name}</Text>
            </GridItem>
            <GridItem colStart={2} colEnd={12} mt={5}>
              <PostList id={author?.id}/>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AuthorDetail;
