import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Channel } from "models/channel";
import { User } from "models/user";
import { messagesPerUser } from "utils/plotting";
import { Message } from "models/message";
import CenterDiv from "components/centerDiv";
import MessageRatioChart from "components/charts/messageRatioChart";

export default (props: {
  channel: { name: string; members: string[] };
  users: User[];
  messages: Message[];
}) => {
  const channel = props.channel;
  const messageRatioData = messagesPerUser(props.messages, props.users);
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            #{channel.name} has {channel.members.length} members
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <CenterDiv>
              <MessageRatioChart messageRatioData={messageRatioData} />
            </CenterDiv>
            <ul>
              {messageRatioData.map((value) => {
                return (
                  <li key={value.name}>
                    {value.name}: {value.value} messages
                  </li>
                );
              })}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
