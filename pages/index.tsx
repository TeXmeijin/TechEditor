import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";

const WriteContainer = styled.div`
  display: flex;
`;
const WriteContainerItem = styled.div`
  flex: 1;
`;
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article>
        <WriteContainer>
          <WriteContainerItem>
            こっちが文章の構成を入力、表示するエリア
          </WriteContainerItem>
          <WriteContainerItem>こっちがMarkdownエディタ</WriteContainerItem>
        </WriteContainer>
      </article>
    </Layout>
  );
}
