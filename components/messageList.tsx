import { Message } from "models/message";
import { User } from "models/user";
import { resolveIDs, sortedMessages } from "utils/slack";

export default (props: { messages: Message[]; users: User[] }) => {
  resolveIDs(props.messages, props.users);
  return (
    <ul>
      {sortedMessages(props.messages).map((message: Message) => {
        let day = new Date(Number(message.ts) * 1000);
        return (
          <li key={message.ts}>
            ({day.toDateString()})
            <b> {message.user_profile?.real_name || message.user}: </b>
            {message.text}
          </li>
        );
      })}
    </ul>
  );
};
