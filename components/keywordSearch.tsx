import { Message } from "models/message";
import { User } from "models/user";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useCallback, FormEvent } from "react";
import MessageList from "./messageList";
import { messagesToData } from "utils/plotting";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Col from "react-bootstrap/Col";

const countKeyword = (keyword: string, messages: Message[]) => {
  let count = 0;
  let keyMessages: Message[] = [];
  for (const message of messages) {
    const regex = new RegExp(keyword, "g");
    const messageCount = message.text.match(regex)?.length || 0;
    if (messageCount > 0) {
      count += messageCount;
      keyMessages.push(message);
    }
  }
  return { count, keyMessages, keyword };
};

interface SearchResult {
  keyword: string;
  count: number;
  keyMessages: Message[];
}

interface KeywordPlotData {
  x: number;
  y: number;
  name: string;
}

export default (props: { messages: Message[]; users: User[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [keywordData, setKeywordData] = useState(Array<KeywordPlotData>());
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      let result = countKeyword(searchTerm, props.messages);
      setSearchResults(result);
      setKeywordData(messagesToData(result.keyMessages));
    },
    [searchTerm]
  );

  return (
    <Accordion>
      <Card>
        <Card.Header>
          <AccordionToggle as={Button} variant="link" eventKey="0">
            Search for keywords
          </AccordionToggle>
        </Card.Header>
        <AccordionCollapse eventKey="0">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row className="Row">
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    name="searchTerm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col xs="auto">
                  <Button type="submit" variant="primary" className="mb-2">
                    Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
            <br></br>
            {searchResults ? (
              <>
                <p>
                  "{searchResults.keyword}" occurs {searchResults.count} times
                  in this channel.
                </p>
                <LineChart width={500} height={500} data={keywordData}>
                  <Line type="monotone" dataKey="y" stroke="#000"></Line>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
                <MessageList
                  messages={searchResults.keyMessages}
                  users={props.users}
                ></MessageList>
              </>
            ) : (
              <p>Nothing is searched yet; try submitting something above.</p>
            )}
          </Card.Body>
        </AccordionCollapse>
      </Card>
    </Accordion>
  );
};
