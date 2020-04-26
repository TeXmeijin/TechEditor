function Layout({ children }) {
  return (
    <main>
      {children}
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
    </main>
  );
}

export default Layout;
