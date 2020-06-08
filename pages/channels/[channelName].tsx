import Layout from "components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Message } from "models/message";
import MessageList from "components/messageList";
import MemberTable from "components/memberTable";

export default function () {
  const router = useRouter();
  const { channelName } = router.query;
  const { data } = useSWR(channelName ? `/api/channels/${channelName}` : null);
  if (data) {
    console.log(data);
    const messages = data?.messages;
    const channel = data?.channel;
    const users = data?.users;
    return (
      <Layout>
        <>
          <h1>#{channelName}</h1>
          {channel && <MemberTable channel={channel} users={users} />}
          {messages && <MessageList messages={messages} users={users} />}
        </>
      </Layout>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
