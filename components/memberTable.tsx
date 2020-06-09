import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Channel } from "models/channel";
import { User } from "models/user";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { messagesPerUser } from "utils/plotting";
import { userMapFromList } from "utils/general";
import { Message } from "models/message";
import CenterDiv from "components/centerDiv";
import MessageRatioChart from "components/charts/messageRatioChart";

export default (props: {
  channel: Channel;
  users: User[];
  messages: Message[];
}) => {
  const channel = props.channel;
  const userMap = userMapFromList(props.users);
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
              {channel.members.map((member) => {
                let user = userMap[member];
                return <li key={user.id}>{user.profile.real_name}</li>;
              })}
            </ul>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
