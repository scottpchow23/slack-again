import Navbar from "./navbar";
import Container from "react-bootstrap/Container";
import Head from "next/head";

export default (props: { children: React.ReactElement[] }) => {
  return (
    <div className="container">
      <Head>
        <title>slack again</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar></Navbar>
        <Container>{props.children}</Container>
      </main>
    </div>
  );
};
