import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState } from "react";
import ArticleObjective from "../components/organism/ArticleObjective";

const WriteContainer = styled.div`
  display: flex;
  height: 100%;
`;
const WriteContainerItem = styled.div`
  width: 50%;
`;
const Content = styled.div`
  height: 100%;
`;

export default function Home() {
  const [markdownText, setMarkdownText] = useState("");

  return (
    <Layout>
      <Head>
        <title>Tech Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <WriteContainer>
          <WriteContainerItem>
            <ArticleObjective></ArticleObjective>
          </WriteContainerItem>
          <WriteContainerItem>
            <MarkdownEditor
              markdownText={markdownText}
              onChange={(text) => {
                console.log(text);
                setMarkdownText(text);
              }}
            ></MarkdownEditor>
          </WriteContainerItem>
        </WriteContainer>
      </Content>
    </Layout>
  );
}
