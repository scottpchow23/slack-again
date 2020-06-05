import Layout from "components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Message } from "models/message";

export default function () {
  const router = useRouter();
  const { channelName } = router.query;
  const { data } = useSWR(`/api/channels/${channelName}`);
  if (channelName) {
    console.log(data);
    return (
      <Layout>
        <>
          <h1># {channelName}</h1>
          <ul>
            {data &&
              data.messages.map((message: Message) => {
                return (
                  <li key={message.ts}>
                    {message.user}: {message.text}
                  </li>
                );
              })}
          </ul>
        </>
      </Layout>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
