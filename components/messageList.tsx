import { Message } from "models/message";
import { User } from "models/user";

function sortedMessages(messages: Message[]) {
  return messages.sort((a: Message, b: Message) => Number(a.ts) - Number(b.ts));
}

export default (props: { messages: Message[] }) => {
  return (
    <ul>
      {sortedMessages(props.messages).map((message: Message) => {
        return (
          <li key={message.ts}>
            <b>{message.user_profile?.real_name || message.user}: </b>
            {message.text}
          </li>
        );
      })}
    </ul>
  );
};
