import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState, useEffect } from "react";
import ArticleObjective from "../components/organism/ArticleObjective";
import Container from "../lib/container/container";
import { ArticleState, ArticleDTO } from "../lib/domain/Article";
import StyledSubHeading from "../components/atoms/SubHeading";
import { useCheckbox } from "../lib/hooks/inputState";
import { StyledRefineTarget } from "../components/organism/RefineTarget";
import { CheckBoxWithLabel } from "../components/molecules/CheckBoxWithLabel";
import { StyledCommitButton } from "../components/molecules/CommitButton";

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const ConfigurationContainer = styled.div`
  display: flex;
  padding: 32px;
`;
const ObjectiveContainer = styled.div`
  flex: 2;
`;
const HistoryContainer = styled.div`
  margin-left: 16px;
  flex: 1;
  max-height: 400px;
  overflow-y: scroll;
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
const RefineContainer = styled.div`
  margin-top: 16px;
`;

const StyledCommitButtonContainer = styled(StyledCommitButton)`
  margin-left: 16px;
`;

const HistoryCard = (props) => {
  return (
    <div className={props.className}>
      <div className="metaInfo" onClick={props.onClick}>
        <div className="title">{props.title || "タイトル無し"}</div>
        <div className="id">ID: {props.id}</div>
      </div>
      <div>
        <button onClick={props.onDeleteClick}>✕</button>
      </div>
    </div>
  );
};

const StyledHistoryCard = styled(HistoryCard)`
  border-bottom: 1px solid var(--grayLight3);
  padding: 16px 8px;
  display: flex;
  justify-content: space-between;

  .metaInfo {
    cursor: pointer;

    .title {
      font-weight: bold;
      font-size: 0.9rem;
    }

    .id {
      margin-top: 8px;
      color: var(--gray);
      font-size: 0.8rem;
    }
  }
`;

export default function Home() {
  const articleState = new ArticleState();

  const [markdownTextForRefine, setMarkdownTextForRefine] = useState("");
  const commitMarkdownText = () => {
    setMarkdownTextForRefine(articleState.markdownText.value);
    const article = articleState.pickArticleContents();
    articleState.setId(repository.create(article));
    setListArticles(repository.listAll());
  };

  const [loaded, setLoaded] = useState(false);
  const [listArticles, setListArticles] = useState<ArticleDTO[]>([]);
  const isRefineMode = useCheckbox(false, "推敲モードにする");

  const repository = Container.getArticleRepository();

  useEffect(() => {
    setListArticles(repository.listAll());

    if (!loaded) {
      setLoaded(true);
      const article = repository.find();
      if (!article) return;

      articleState.update(article);
      return;
    }

    const article = articleState.pickArticleContents();
    if (!article.id) {
      return;
    }
    repository.update(article);
  }, articleState.effectTargetValues);

  return (
    <Layout>
      <Head>
        <title>Tech Editor | 技術記事執筆に特化したブラウザエディタ</title>
        <meta property="og:description" content="技術記事の執筆に特化したエディタです。ブラウザ上で動きます。対象読者や主題文を最初に整備した上で書くことができます。差分をGitのように管理でき、推敲もはかどります。" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css"
        />
      </Head>

      <Content>
        <MainContainer>
          <ConfigurationContainer>
            <ObjectiveContainer>
              <ArticleObjective<typeof articleState.headings>
                heading="タイトル"
                inputList={articleState.headings}
              ></ArticleObjective>
              <ArticleObjective<typeof articleState.objectiveProps>
                heading="本記事の目的"
                inputList={articleState.objectiveProps}
              ></ArticleObjective>
            </ObjectiveContainer>
            <HistoryContainer>
              <StyledSubHeading>編集履歴</StyledSubHeading>
              {listArticles.map((article) => {
                return (
                  <StyledHistoryCard
                    title={article.title}
                    id={article.id}
                    onClick={() => {
                      articleState.update(article)
                    }}
                    onDeleteClick={() => {
                      repository.delete(article.id);
                      setListArticles(repository.listAll());
                    }}
                  ></StyledHistoryCard>
                );
              })}
            </HistoryContainer>
          </ConfigurationContainer>
          <EditorArea>
            <EditorHeading>
              <StyledSubHeading>記事エディタ</StyledSubHeading>
            </EditorHeading>
            <RefineContainer>
              <CheckBoxWithLabel
                {...isRefineMode}
                label="コミット差分を見る"
                name="refineMode"
              ></CheckBoxWithLabel>
              <StyledCommitButtonContainer
                label="コミットする"
                onClick={() => {
                  commitMarkdownText();
                  repository.create(articleState.pickArticleContents());
                }}
              ></StyledCommitButtonContainer>
            </RefineContainer>
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
              ) : null}
            </EditorContainer>
          </EditorArea>
        </MainContainer>
      </Content>
    </Layout>
  );
}
