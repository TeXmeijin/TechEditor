import styled from 'styled-components'
const CommitButton = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export const StyledCommitButton = styled(CommitButton)`
  padding: 4px 16px;
  border: 2px solid var(--primaryColor);
  color: var(--primaryColor);
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;
