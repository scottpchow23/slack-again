import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Channel } from "models/channel";
import { User } from "models/user";

export default (props: { channel: Channel; users: User[] }) => {
  const channel = props.channel;
  let userMap: { [id: string]: User } = {};
  for (const user of props.users) {
    userMap[user.id] = user;
  }
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
