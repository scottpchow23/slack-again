import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import Button from "react-bootstrap/Button";
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import ConversationChart from "components/charts/conversationChart";
import { Message } from "models/message";
import { User } from "models/user";
import { userMessagePairCounts } from "utils/plotting";
import CenterDiv from "./centerDiv";

export default (props: { messages: Message[]; users: User[] }) => {
  const messages = props?.messages;
  const users = props?.users;
  const data = userMessagePairCounts(props.users, props.messages);
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <AccordionToggle as={Button} variant="link" eventKey="0">
            See conversation pairing statistics
          </AccordionToggle>
        </Card.Header>
        <AccordionCollapse eventKey="0">
          <Card.Body>
            <CenterDiv>
              <ConversationChart data={data} />
            </CenterDiv>
            The above abbreviations are expanded below:
            <ul>
              {data.map((data) => {
                return (
                  <li>
                    {data.displayName} corresponds to {data.name} with{" "}
                    {data.value} occurrences.
                  </li>
                );
              })}
            </ul>
          </Card.Body>
        </AccordionCollapse>
      </Card>
    </Accordion>
  );
};
