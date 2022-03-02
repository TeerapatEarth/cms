import type { NextPage } from "next";
import Head from "next/head";
import { Post } from "../../model/Post";
import Detail from "../../components/Detail";
import useFetchOnePost from "../../hook/useFetchOnePost";
import { useRouter } from "next/router";

interface Props {
  postDetail: Post;
}

const PostDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { postDetail, loading, error, renderPost } = useFetchOnePost(id);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      <Head>
        <title>Post Detail</title>
        <meta name="description" content="Post detail page"></meta>
      </Head>
      {renderPost && <Detail post={postDetail} />}
    </div>
  );
};

PostDetail.getInitialProps = async (context: any) => {
  const { id } = context.query;
  const res = await fetch(
    "https://fswd-wp.devnss.com/wp-json/wp/v2/posts/" + id
  );
  const postDetail = await res.json();
  return {
    props: {
      postDetail,
    },
  };
};

export default PostDetail;
