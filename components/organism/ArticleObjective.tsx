import React from "react";
import styled from "styled-components";
import { inputState } from "../../lib/hooks/inputState";
import StyledSubHeading from '../atoms/SubHeading'

const ObjectiveTable = (props) => {
  return (
    <table className={props.className}>
      <tbody>{props.children}</tbody>
    </table>
  );
};

const Tr = (props) => {
  return <tr className={props.className}>{props.children}</tr>;
};
const Td = (props) => {
  return <td className={props.className}>{props.children}</td>;
};

const ObjectiveTextArea = (props) => {
  return (
    <textarea
      className={props.className}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

const StyledTr = styled(Tr)`
  padding: 0 0 0 8px;
  width: 100%;
  display: flex;

  &:nth-child(2n + 1) {
    background-color: var(--grayLight5);
  }
`;
const StyledTd = styled(Td)`
  &:nth-child(2) {
    flex: 1;
    width: 100%;
    padding-left: 4px;

    textarea {
      width: 100%;
      max-width: 100%;
    }
  }

  &:first-child {
    padding: 16px 0;
    width: 210px;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1.5;

    display: flex;
    align-items: center;
  }
`;

const StyledObjectiveTextArea = styled(ObjectiveTextArea)`
  font-size: 1rem;
  padding: 8px;
  border-radius: 0 4px 4px 0;
  border: 1px solid var(--grayLight4);
  height: 100%;
`;

const ObjectiveTableRow = (props: {
  heading: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <StyledTr>
      <StyledTd>
        <span>{props.heading}</span>
      </StyledTd>
      <StyledTd>
        <StyledObjectiveTextArea {...props}></StyledObjectiveTextArea>
      </StyledTd>
    </StyledTr>
  );
};

const StyledObjectiveTable = styled(ObjectiveTable)`
  display: flex;
  margin-top: 8px;

  tbody {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const StyledArticleObjective = styled.div`
  &:not(:first-child) {
    margin-top: 32px;
  }
`;

type IProps<T> = {
  inputList: {
    [key in keyof T]: inputState;
  };
} & { heading: string };

class ArticleObjective<T> extends React.Component<IProps<T>> {
  render() {
    return (
      <StyledArticleObjective>
        <StyledSubHeading>{this.props.heading}</StyledSubHeading>
        <StyledObjectiveTable>
          {Object.keys(this.props.inputList).map((key) => {
            return (
              <ObjectiveTableRow
                key={key}
                {...this.props.inputList[key]}
              ></ObjectiveTableRow>
            );
          })}
        </StyledObjectiveTable>
      </StyledArticleObjective>
    );
  }
}

export default ArticleObjective;
