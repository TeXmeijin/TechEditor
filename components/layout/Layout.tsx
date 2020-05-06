import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;

  --primaryColor: #078749;
  --grayLight3: #ccc;
  --grayLight4: #ddd;
  --grayLight5: #eee;
`;

const Footer = (props) => {
  return <footer className={props.className}>{props.children}</footer>;
};

const StyledFooter = styled(Footer)`
  width: 100%;
  height: 60px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function Layout({ children }) {
  return (
    <Main>
      <Content>{children}</Content>
      <StyledFooter>
        <a href="https://meijin.me" target="_blank" rel="noopener noreferrer">
          Powered by Meijin
        </a>
      </StyledFooter>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Roboto, Helvetica Neue, -apple-system, BlinkMacSystemFont,
            Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Main>
  );
}

export default Layout;
