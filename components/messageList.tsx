import { Message } from "models/message";
import { User } from "models/user";

function sortedMessages(messages: Message[]) {
  return messages.sort((a: Message, b: Message) => Number(a.ts) - Number(b.ts));
}

function resolveIDs(messages: Message[], users: User[]) {
  let userMap: { [id: string]: User } = {};
  for (const user of users) {
    userMap[user.id] = user;
  }
  for (let message of messages) {
    if (message.user_profile === undefined) {
      let user = userMap[message.user];
      message.user_profile = {
        real_name: user.profile.real_name,
        display_name: user.profile.display_name,
      };
    }
    if (message.bot_id !== undefined) {
      message.text = "We are unable to display bot messages at this time.";
      message.user_profile.real_name =
        "[BOT] " + message.user_profile.real_name;
    } else {
      message.text = message.text.replace(/<@(U\w+)>/gi, (match, p1) => {
        return "@" + userMap[p1].real_name;
      });
    }
  }
}

export default (props: { messages: Message[]; users: User[] }) => {
  resolveIDs(props.messages, props.users);
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
