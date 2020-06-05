import { Channel } from "models/channel";
import Link from "next/link";

export default (props: { channels: Channel[] }) => {
  return (
    <ul>
      {props.channels.map((channel) => {
        return (
          <li key={channel.id}>
            <Link
              href="/channels/[channelName]"
              as={`/channels/${channel.name}`}
            >
              <a href=""># {channel.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
