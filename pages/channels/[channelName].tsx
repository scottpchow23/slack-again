import Layout from "components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import MessageList from "components/messageList";
import MemberTable from "components/memberTable";
import KeywordSearch from "components/keywordSearch";

export default function () {
  const router = useRouter();
  const { channelName } = router.query;
  const { data } = useSWR(channelName ? `/api/channels/${channelName}` : null);
  if (data) {
    const messages = data?.messages;
    const channel = data?.channel;
    const users = data?.users;
    return (
      <Layout>
        <>
          <h1>#{channelName}</h1>
          <MemberTable channel={channel} users={users} />
          <KeywordSearch messages={messages} users={users} />
          <MessageList messages={messages} users={users} />
        </>
      </Layout>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
