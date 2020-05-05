import React from "react";
import styled from "styled-components";
import { inputState } from '../../lib/hooks/inputState'

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

  td:first-child {
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

export type ObjectiveProps = {
  mainObjective: inputState;
};

const ArticleObjective: React.FC<ObjectiveProps> = (props: ObjectiveProps) => {
  return (
    <>
      <StyledSubHeading>書く前に埋めること</StyledSubHeading>
      <StyledObjectiveTable>
        <ObjectiveTableRow {...props.mainObjective}></ObjectiveTableRow>
      </StyledObjectiveTable>
    </>
  );
};

export default ArticleObjective;
