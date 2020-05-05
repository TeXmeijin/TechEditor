import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState, useEffect } from "react";
import ArticleObjective from "../components/organism/ArticleObjective";
import Container from "../lib/container/container";
import { useInput } from "../lib/hooks/inputState";
import { ArticleState } from "../lib/domain/Article";

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
  const articleState = new ArticleState();

  const [loaded, setLoaded] = useState(false);

  const repository = Container.getArticleRepository();

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const article = repository.find();
      if (!article) return;

      articleState.update(article);
      return;
    }
    repository.create(articleState.pickArticleContents());
  }, articleState.effectTargetValues);

  return (
    <Layout>
      <Head>
        <title>Tech Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <WriteContainer>
          <ArticleConfigration>
            <ArticleObjective
              {...articleState.objectiveProps}
            ></ArticleObjective>
          </ArticleConfigration>
          <WriteContainerItem>
            <MarkdownEditor
              markdownText={articleState.markdownText.value}
              onChange={articleState.markdownText.set}
            ></MarkdownEditor>
          </WriteContainerItem>
        </WriteContainer>
      </Content>
    </Layout>
  );
}
