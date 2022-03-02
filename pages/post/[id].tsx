import type { NextPage } from "next";
import Head from "next/head";
import { Post } from "../../model/Post";
import Detail from "../../components/Detail";

interface Props {
  postDetail: Post;
}

const PostDetail: NextPage<Props> = ({ postDetail }) => {
  return (
    <div>
      <Head>
        <title>Post Detail</title>
        <meta name="description" content="Post detail page"></meta>
      </Head>
      <Detail post={postDetail} />
    </div>
  );
};


export const getServerSideProps = async(context: any) => {
  const { id } = context.query;
  const res = await fetch(
    "https://fswd-wp.devnss.com/wp-json/wp/v2/posts/" + id
  );
  const postDetail = await res.json();
  return {
    props:{
      postDetail,
    }
  };
};

export default PostDetail;
