import type { NextPage } from "next";
import Head from "next/head";
import useFetchAuthor from "../../hook/useFetchAuthor";
import AuthorDetail from "../../components/AuthorDetail";

interface Props {
  id: string;
}

const AuthorPage: NextPage<Props> = ({ id }) => {
  const { author, render } = useFetchAuthor(id);
  return (
    <div>
      <Head>
        <title>Author</title>
        <meta name="description" content="Author page"></meta>
      </Head>
      {render && <AuthorDetail author={author} />}
    </div>
  );
};

export const getServerSideProps = (context: any) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};

export default AuthorPage;
