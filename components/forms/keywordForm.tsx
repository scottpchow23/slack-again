import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FormEvent } from "react";

export default function (props: {
  handleSubmit: (e: FormEvent) => void;
  setSearchTerm: (value: string) => void;
}) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Row className="Row">
        <Col xs="auto">
          <Form.Control
            type="text"
            name="searchTerm"
            placeholder="Enter keyword here"
            onChange={(e) => props.setSearchTerm(e.target.value)}
          ></Form.Control>
        </Col>
        <Col xs="auto">
          <Button type="submit" variant="primary">
            Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
