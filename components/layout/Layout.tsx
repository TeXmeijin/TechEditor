function Layout({ children }) {
  return (
    <main>
      {children}
      <footer>
        <a
          href="https://meijin.me"
          target="_blank"
          rel="noopener noreferrer"
        >
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
    </main>
  );
}

export default Layout;
