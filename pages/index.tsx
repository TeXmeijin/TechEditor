import Head from "next/head";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article>
        <div className="write-container">
          <div className="write-container-item">
            こっちが文章の構成を入力、表示するエリア
          </div>
          <div className="write-container-item">こっちがMarkdownエディタ</div>
        </div>
      </article>

      <style jsx>{`
        .write-container {
          display: flex;
        }

        .write-container-item {
          flex: 1;
        }
      `}</style>

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
    </Layout>
  );
}
