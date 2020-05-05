import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import ArticleObjective from "../components/organism/ArticleObjective";
import Container from "../lib/container/container";
import { fromHTML } from '../lib/viewModel/markdownToHTML'

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

export type inputState = {
  value: string;
  heading: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  set: Dispatch<SetStateAction<string>>;
};

const useInput: (initialValue: string, heading: string) => inputState = (
  initialValue: string,
  heading: string
) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    heading,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      console.log(e.target.value);
      set(e.target.value);
    },
    set,
  };
};

import { ContentState, EditorState } from "draft-js";
import { convertFromHTML } from "draft-convert";

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

      const headerOne = '<h1>title</h1>';
      const blocksFromHTML = convertFromHTML(headerOne);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setMarkdownText(EditorState.createWithContent(state));
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
          <WriteContainerItem>
            <ArticleObjective mainObjective={mainObjective}></ArticleObjective>
          </WriteContainerItem>
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
