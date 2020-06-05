import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

const appName = "slack archive";

export default () => {
  return (
    <Navbar>
      <Link href="/">
        <Navbar.Brand>{appName}</Navbar.Brand>
      </Link>
    </Navbar>
  );
};
