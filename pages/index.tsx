import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState } from "react";
import MarkdownStructure from "../components/organism/MarkdownStructure";

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
  const [showParagraph, setShowParagraph] = useState(false);

  return (
    <Layout>
      <Head>
        <title>Tech Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <WriteContainer>
          <WriteContainerItem>
            <MarkdownStructure
              markdown={markdownText}
              showParagraph={showParagraph}
            ></MarkdownStructure>
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
