import React from "react";
import styled from "styled-components";
import { inputState } from '../../lib/hooks/inputState'
import { ObjectiveProps } from "../../lib/domain/Article";

const SubHeading = (props) => {
  return <h2 className={props.className}>{props.children}</h2>;
};

const ObjectiveTable = (props) => {
  return (
    <table className={props.className}>
      <tbody>{props.children}</tbody>
    </table>
  );
};

const ObjectiveTableRow = (props: {
  heading: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <tr>
      <td>{props.heading}</td>
      <td>
        <textarea value={props.value} onChange={props.onChange} />
      </td>
    </tr>
  );
};

const StyledSubHeading = styled(SubHeading)`
  font-size: 1.4rem;
  font-weight: bold;
`;

const StyledObjectiveTable = styled(ObjectiveTable)`
  display: flex;
  margin-top: 16px;

  tbody,
  tr {
    width: 100%;
    display: flex;
  }

  tbody {
    flex-direction: column;
  }

  td:first-child {
    width: 180px;
    text-align: right;
  }

  td:nth-child(2) {
    flex: 1;
    width: 100%;

    textarea {
      width: 100%;
      max-width: 100%;
    }
  }
`;


const ArticleObjective: React.FC<ObjectiveProps> = (props: ObjectiveProps) => {
  return (
    <>
      <StyledSubHeading>記事を書くときに意識すること</StyledSubHeading>
      <StyledObjectiveTable>
        <ObjectiveTableRow {...props.mainObjective}></ObjectiveTableRow>
        <ObjectiveTableRow {...props.target}></ObjectiveTableRow>
        <ObjectiveTableRow {...props.targetKnows}></ObjectiveTableRow>
        <ObjectiveTableRow {...props.youWantToDoForTarget}></ObjectiveTableRow>
      </StyledObjectiveTable>
    </>
  );
};

export default ArticleObjective;
