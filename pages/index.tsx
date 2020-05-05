import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState, useEffect } from "react";
import ArticleObjective from "../components/organism/ArticleObjective";
import Container from "../lib/container/container";
import { useInput } from "../lib/hooks/inputState";

const WriteContainer = styled.div`
  height: 100%;
`;
const ArticleConfigration = styled.div``;
const WriteContainerItem = styled.div`
  height: 100%;
`;
const Content = styled.div`
  height: 100%;
`;

export default function Home() {
  const [markdownText, setMarkdownText] = useState("");

  const mainObjective = useInput("", "何を伝えるのか（主題文）");
  const [loaded, setLoaded] = useState(false);

  const repository = Container.getArticleRepository();

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const article = repository.find();
      if (!article) return;
      mainObjective.set(article.mainObjective);
      setMarkdownText(article.markdownText);
      return;
    }
    const article = { mainObjective: mainObjective.value, markdownText };
    repository.create(article);
  }, [mainObjective, markdownText]);

  return (
    <Layout>
      <Head>
        <title>Tech Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <WriteContainer>
          <ArticleConfigration>
            <ArticleObjective mainObjective={mainObjective}></ArticleObjective>
          </ArticleConfigration>
          <WriteContainerItem>
            <MarkdownEditor
              markdownText={markdownText}
              onChange={setMarkdownText}
            ></MarkdownEditor>
          </WriteContainerItem>
        </WriteContainer>
      </Content>
    </Layout>
  );
}
