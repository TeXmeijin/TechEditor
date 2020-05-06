import styled from 'styled-components'
const SubHeading = (props) => {
  return <h2 className={props.className}>{props.children}</h2>;
};

const StyledSubHeading = styled(SubHeading)`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--primaryColor);
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primaryColor);
`;

export default StyledSubHeading;
