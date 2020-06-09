import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function (props: { handleSubmit; setSearchTerm }) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Row className="Row">
        <Col xs="auto">
          <Form.Control
            type="text"
            name="searchTerm"
            onChange={(e) => props.setSearchTerm(e.target.value)}
          ></Form.Control>
        </Col>
        <Col xs="auto">
          <Button type="submit" variant="primary" className="mb-2">
            Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
