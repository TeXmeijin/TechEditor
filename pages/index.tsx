import Head from "next/head";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import MarkdownEditor from "../components/organism/MarkdownEditor";
import { useState, ReactElement } from "react";

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

// remark area
import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

const ElementLabel = styled.span`
  display: inline-block;
  padding: 4px 0;
  border: 1px solid #239348;
  border-radius: 8px;
  color: #239348;
  margin-right: 16px;
  width: 100px;
  text-align: center;
`;

const isReactElement = (child: any): child is ReactElement => {
  if (child.props) {
    return true;
  }
  return false;
};
const parseStructureElement = (element: ReactElement) => {
  const structureName = ["導入", "本論", "展開"];
  const elementCounter = {
    h1: 0,
    h2: 0,
    h3: 0,
    p: 0,
  };
  const parseStructureElementRecursive = (element: ReactElement) => {
    if (!element.props) {
      return;
    }
    const children = element.props.children || [];
    if (children.length >= 1) {
      element.props.children.forEach(
        (child: string | ReactElement, index: number) => {
          if (isReactElement(child)) {
            parseStructureElementRecursive(child);
            return;
          }
          if (typeof element.type !== "string") {
            return;
          }
          element.props.children.unshift(
            <ElementLabel>
              {structureName[elementCounter[element.type]]}
            </ElementLabel>
          );
          elementCounter[element.type]++;
          switch (element.type) {
            case "h1":
              elementCounter.h2 = 0;
            case "h2":
              elementCounter.h3 = 0;
            case "h3":
              elementCounter.p = 0;

            default:
              break;
          }
          console.log(elementCounter);
        }
      );
      return;
    }
  };
  parseStructureElementRecursive(element);
};
function markDownToReactElement(markdown: string) {
  const vfile = unified()
    .use(parse)
    .use(remark2react)
    .processSync(markdown) as any;
  const element = vfile.result as ReactElement;
  parseStructureElement(element);
  return element;
}
// remark area

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
            <div>{markDownToReactElement(markdownText)}</div>
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
