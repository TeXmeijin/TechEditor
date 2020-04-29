import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";
import { ReactElement } from "react";
import styled from "styled-components";

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
    h4: 0,
  };
  const checkValidElementType = (
    type: any
  ): type is {
    target: string;
  } => {
    if (!type.target) {
      return false;
    }
    if (elementCounter[type.target] === undefined) {
      return false;
    }
    return true;
  };
  const checkElementIsCountReset = (
    currentType: string,
    targetType: string
  ) => {
    if (!checkValidElementType({ target: currentType })) {
      return false;
    }
    switch (currentType) {
      case "h4":
        if (targetType === "h3") return true;
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
               * そのelement.type.targetがValidなものであれば本論になる
               */
              for (
                let currentIndex = index + 1;
                currentIndex <= element.props.children.length;
                currentIndex++
              ) {
                const nextElement = element.props.children[currentIndex];
                if (nextElement) {
                  if (
                    !nextElement.type ||
                    !nextElement.type.target ||
                    nextElement === "\n"
                  ) {
                    continue;
                  }
                  if (checkValidElementType(child.type)) {
                    if (
                      checkElementIsCountReset(
                        child.type.target,
                        nextElement.type.target
                      )
                    ) {
                      payload.isLast = true;
                      break;
                    }
                    if (checkValidElementType(nextElement.type)) {
                      break;
                    }
                    continue;
                  }
                  continue;
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
          if (!checkValidElementType(element.type)) {
            return;
          }
          const handler = (function () {
            if (payload?.isLast) {
              return "展開";
            }
            return getStructureName(elementCounter[element.type.target]);
          })();
          const currentElement = <ElementLabel>{handler}</ElementLabel>;
          element.props.children.unshift(currentElement);
          elementCounter[element.type.target]++;
          switch (element.type.target) {
            case "h1":
              elementCounter.h2 = 0;
            case "h2":
              elementCounter.h3 = 0;
            case "h3":
              elementCounter.h4 = 0;

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
const RemarkedImg = styled.img`
  max-width: 100%;
  max-height: 120px;
`;

const BaseHeading = styled.h1`
  margin-top: 16px;
  margin-bottom: 16px;
  font-weight: bold;
`;

const BASE_PADDING_LEFT = 24;

const Heading1 = styled(BaseHeading)``;
const Heading2 = styled(BaseHeading.withComponent("h2"))`
  padding-left: ${BASE_PADDING_LEFT}px;
`;
const Heading3 = styled(BaseHeading.withComponent("h3"))`
  padding-left: ${BASE_PADDING_LEFT * 2}px;
`;
const Heading4 = styled(BaseHeading.withComponent("h4"))`
  padding-left: ${BASE_PADDING_LEFT * 3}px;
`;

const BaseParagraph = styled.p`
  padding-left: ${BASE_PADDING_LEFT * 4}px;
  font-size: 0.8rem;
  color: #777;
`;
const Paragraph = styled(BaseParagraph)`
  padding-top: 4px;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
const Hr = styled.hr`
  margin-left: ${BASE_PADDING_LEFT * 4}px;
`;
const Ul = styled(BaseParagraph.withComponent("ul"))`
  padding: 8px 0;
  list-style: disc;
`;
const Li = styled(BaseParagraph.withComponent("li"))`
  margin-left: ${BASE_PADDING_LEFT * 6}px;
  padding-left: 0;
`;
const Pre = styled(BaseParagraph.withComponent("pre"))``;
const Code = styled(BaseParagraph.withComponent("code"))`
  display: inline-block;
  padding: 4px 8px;
  background: #e5e5e5;
  border-radius: 4px;
  margin: 0 4px;
`;

export default function MarkdownStructure({ markdown, showParagraph }) {
  const vfile = unified()
    .use(parse)
    .use(remark2react, {
      remarkReactComponents: {
        img: RemarkedImg,
        h1: Heading1,
        h2: Heading2,
        h3: Heading3,
        h4: Heading4,
        p: Paragraph,
        hr: Hr,
        ul: Ul,
        li: Li,
        code: Code,
        pre: Pre,
      },
    })
    .processSync(markdown) as any;
  const element = vfile.result as ReactElement;
  parseStructureElement(element);
  return element;
}
