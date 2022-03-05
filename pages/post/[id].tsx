import type { NextPage } from "next";
import Head from "next/head";
import Detail from "../../components/Detail";
import useFetchOnePost from "../../hook/useFetchOnePost";

interface Props {
  id: string
}

const PostDetail: NextPage<Props> = ({id}) => {
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


export const getServerSideProps = (context: any) => {
  const { id } = context.query
  return {
    props: {
      id,
    }
  }
}

export default PostDetail;
