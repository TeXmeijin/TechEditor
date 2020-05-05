import React, { useEffect } from "react";
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
    }
  }
`;

const ArticleObjective: React.FC = (props) => {
  const useInput = (initialValue: string) => {
    const [value, set] = useState(initialValue);
    return {
      value,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => set(e.target.value),
      set,
    };
  };
  const mainObjective = useInput("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      mainObjective.set(
        (function () {
          setLoaded(true);
          const data = localStorage.getItem("ArticleObjective:data");
          if (data) {
            return JSON.parse(data).mainObjective;
          }
          return "";
        })()
      );
    }
    return () => {
      localStorage.setItem(
        "ArticleObjective:data",
        JSON.stringify({ mainObjective: mainObjective.value })
      );
    };
  }, [mainObjective]);

  return (
    <>
      <StyledSubHeading>書く前に埋めること</StyledSubHeading>
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
