import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState, useEffect } from "react";
import ArticleObjective from "../components/organism/ArticleObjective";
import Container from "../lib/container/container";
import { ArticleState } from "../lib/domain/Article";
import StyledSubHeading from "../components/atoms/SubHeading";
import { useInput, useCheckbox } from "../lib/hooks/inputState";

const WriteContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ArticleConfigration = styled.div`
  padding: 32px;
`;
const EditorArea = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 0 32px;
`;
const PreviewArea = styled.div`
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark-color(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textarea;
  background-color: -internal-light-dark-color(white, black);
  -webkit-rtl-ordering: logical;
  flex-direction: column;
  resize: auto;
  cursor: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin: 0em;
  font: 400 11px system-ui;
  border-width: 1px;
  border-style: solid;
  border-color: initial;
  border-image: initial;
  padding: 2px;
  padding: 15px;
  padding-top: 10px;
  margin-top: 40px;
  font-size: 1rem;
  flex: 1;
  white-space: pre-wrap;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  border: none;
  resize: none;
  outline: none;
  min-height: 0;
  background: #fff;
  color: #333;
  line-height: 1.7;
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
            <input
              checked={isRefineMode.value}
              onChange={isRefineMode.onChange}
              type="checkbox"
              name="refineMode"
              id="refineMode"
            />
            <label htmlFor="refineMode">推敲モード</label>
            <EditorContainer
              className={isRefineMode.value ? "refining-editor" : null}
            >
              <MarkdownEditor
                markdownText={articleState.markdownText.value}
                onChange={articleState.markdownText.set}
                mode={{ refine: isRefineMode.value }}
              ></MarkdownEditor>
              {isRefineMode.value ? (
                <PreviewArea>{markdownTextForRefine}</PreviewArea>
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
