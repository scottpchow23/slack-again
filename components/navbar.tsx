import Navbar from "react-bootstrap/Navbar";

const appName = "slack again";

export default () => {
  return (
    <Navbar>
      <Navbar.Brand>{appName}</Navbar.Brand>
    </Navbar>
  );
};
