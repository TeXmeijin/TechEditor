import React from "react";
import styled from "styled-components";
import { useState } from "react";

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
    heading: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <tr>
      <td>{props.heading}</td>
      <td>
        <input type="text" value={props.value} onChange={props.onChange} />
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

    input {
      width: 100%;
    }
  }
`;

const ArticleObjective: React.FC = (props) => {
  const useInput = (initialValue: string) => {
    const [value, set] = useState(initialValue);
    return { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value) };
  };
  const mainObjective = useInput("");

  return (
    <>
      <StyledSubHeading>書く前に産めること</StyledSubHeading>
      <StyledObjectiveTable>
        <ObjectiveTableRow
          heading="何を伝えるのか（主題文）"
          {...mainObjective}
        ></ObjectiveTableRow>
      </StyledObjectiveTable>
    </>
  );
};

export default ArticleObjective;
