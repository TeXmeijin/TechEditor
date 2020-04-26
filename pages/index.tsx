import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState } from "react";

const WriteContainer = styled.div`
  display: flex;
  height: 100%;
`;
const WriteContainerItem = styled.div`
  flex: 1;
`;
const Content = styled.div`
  height: 100%;
`;

import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt();

function renderHTML(text: string) {
  return mdParser.render(text);
}

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
            こっちが文章の構成を入力、表示するエリア
            <div
              dangerouslySetInnerHTML={{
                __html: renderHTML(markdownText),
              }}
            ></div>
          </WriteContainerItem>
          <WriteContainerItem>
            <MarkdownEditor
              markdownText={markdownText}
              onChange={({ text }) => {
                setMarkdownText(text);
              }}
            ></MarkdownEditor>
          </WriteContainerItem>
        </WriteContainer>
      </Content>
    </Layout>
  );
}
