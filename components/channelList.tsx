import { Channel } from "../models/channel";

export default (props: { channels: Channel[] }) => {
  return (
    <ul>
      {props.channels.map((channel) => {
        return <li key={channel.id}># {channel.name}</li>;
      })}
    </ul>
  );
};
