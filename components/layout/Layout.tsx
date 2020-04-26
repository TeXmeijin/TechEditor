import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

function Layout({ children }) {
  return (
    <Main>
      <Content>{children}</Content>
      <footer>
        <a href="https://meijin.me" target="_blank" rel="noopener noreferrer">
          Powered by Meijin
        </a>
      </footer>
      <style jsx>
        {`
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
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
