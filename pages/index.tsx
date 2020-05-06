import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState, useEffect } from "react";
import ArticleObjective from "../components/organism/ArticleObjective";
import Container from "../lib/container/container";
import { ArticleState } from "../lib/domain/Article";
import StyledSubHeading from "../components/atoms/SubHeading";
import { useCheckbox } from "../lib/hooks/inputState";
import { StyledRefineTarget } from "../components/organism/RefineTarget";
import { CheckBoxWithLabel } from "../components/molecules/CheckBoxWithLabel";

const WriteContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const ArticleConfigration = styled.div`
  padding: 32px;
`;
const EditorArea = styled.div`
  height: 100%;
  padding: 0 32px;
`;
const EditorHeading = styled.div``;
const EditorContainer = styled.div`
  margin-top: 16px;
  flex: 1;
  display: flex;
  height: 100%;
`;
const Content = styled.div`
  height: 100%;
`;
const CheckBoxContainer = styled.div`
  margin-top: 16px;
`;

export default function Home() {
  const articleState = new ArticleState();

  const [markdownTextForRefine, setMarkdownTextForRefine] = useState("");

  const [loaded, setLoaded] = useState(false);
  const isRefineMode = useCheckbox(false, "推敲モードにする");

  const repository = Container.getArticleRepository();

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const article = repository.find();
      if (!article) return;

      articleState.update(article);
      return;
    }
    const article = articleState.pickArticleContents();
    if (!article.id) {
      repository.create(article);
      return;
    }
    repository.update(article);
  }, articleState.effectTargetValues);

  useEffect(() => {
    setMarkdownTextForRefine(articleState.markdownText.value);
  }, [isRefineMode.value]);

  return (
    <Layout>
      <Head>
        <title>Tech Editor</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css"
        />
      </Head>

      <Content>
        <WriteContainer>
          <ArticleConfigration>
            <ArticleObjective<typeof articleState.headings>
              heading="タイトル"
              inputList={articleState.headings}
            ></ArticleObjective>
            <ArticleObjective<typeof articleState.objectiveProps>
              heading="本記事の目的"
              inputList={articleState.objectiveProps}
            ></ArticleObjective>
          </ArticleConfigration>
          <EditorArea>
            <EditorHeading>
              <StyledSubHeading>記事エディタ</StyledSubHeading>
            </EditorHeading>
            <CheckBoxContainer>
              <CheckBoxWithLabel
                {...isRefineMode}
                label="推敲する"
                name="refineMode"
              ></CheckBoxWithLabel>
            </CheckBoxContainer>
            <EditorContainer
              className={isRefineMode.value ? "refining-editor" : null}
            >
              <MarkdownEditor
                markdownText={articleState.markdownText.value}
                onChange={articleState.markdownText.set}
                mode={{ refine: isRefineMode.value }}
              ></MarkdownEditor>
              {isRefineMode.value ? (
                <StyledRefineTarget
                  current={markdownTextForRefine}
                  refined={articleState.markdownText.value}
                ></StyledRefineTarget>
              ) : (
                ""
              )}
            </EditorContainer>
          </EditorArea>
        </WriteContainer>
      </Content>
    </Layout>
  );
}
