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
  width: 50%;
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

const RemarkedImg = styled.img`
  max-width: 100%;
`;

const isReactElement = (child: any): child is ReactElement => {
  if (child.props) {
    return true;
  }
  return false;
};
const parseStructureElement = (element: ReactElement) => {
  const getStructureName = (index: number) => {
    if (index === 0) {
      return "導入";
    }
    return "本論";
  };
  const elementCounter = {
    h1: 0,
    h2: 0,
    h3: 0,
  };
  const checkValidElementType = (type: any): type is string => {
    if (elementCounter[type] === undefined) {
      return false;
    }
    return true;
  };
  const checkElementIsCountReset = (
    currentType: string,
    targetType: string
  ) => {
    if (
      !checkValidElementType(currentType) &&
      !checkValidElementType(targetType)
    ) {
      return false;
    }
    switch (currentType) {
      case "h3":
        if (targetType === "h2") return true;
      case "h2":
        if (targetType === "h1") return true;
        break;
    }
    return false;
  };
  const parseStructureElementRecursive = (
    element: ReactElement,
    payload?: {
      isLast: boolean;
    }
  ) => {
    if (!element.props) {
      return;
    }
    const children = element.props.children || [];
    if (children.length >= 1) {
      element.props.children.forEach(
        (child: string | ReactElement, index: number) => {
          if (isReactElement(child)) {
            const payload = {} as any;
            if (!!element && !!element.props && element.props.children) {
              /**
               * 次のChildが存在し、かつ
               * そのelement.typeがValidなものであれば本論になる
               */
              for (
                let currentIndex = index + 1;
                currentIndex < element.props.children.length;
                currentIndex++
              ) {
                const nextElement = element.props.children[currentIndex];
                if (nextElement) {
                  if (!nextElement.type || nextElement === "\n") {
                    continue;
                  }
                  if (
                    checkValidElementType(child.type) &&
                    checkElementIsCountReset(child.type, nextElement.type)
                  ) {
                    payload.isLast = true;
                    break;
                  }
                  payload.isLast = false;
                  break;
                }
                continue;
              }
            }
            parseStructureElementRecursive(child, payload);
            return;
          }
          if (index > 0) {
            return;
          }
          if (
            typeof element.type !== "string" ||
            !checkValidElementType(element.type)
          ) {
            return;
          }
          const handler = (function () {
            if (payload?.isLast) {
              return "展開";
            }
            return getStructureName(elementCounter[element.type]);
          })();
          const currentElement = <ElementLabel>{handler}</ElementLabel>;
          element.props.children.unshift(currentElement);
          elementCounter[element.type]++;
          switch (element.type) {
            case "h1":
              elementCounter.h2 = 0;
            case "h2":
              elementCounter.h3 = 0;

            default:
              break;
          }
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
    .use(remark2react, {
      remarkReactComponents: {
        img: RemarkedImg,
      },
    })
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
