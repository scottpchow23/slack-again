import Navbar from "react-bootstrap/Navbar";

const appName = "slack archive";

export default () => {
  return (
    <Navbar>
      <Navbar.Brand>{appName}</Navbar.Brand>
    </Navbar>
  );
};
