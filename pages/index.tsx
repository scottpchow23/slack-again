import Head from "next/head";
import useSWR from "swr";
import ChannelList from "../components/channelList";
import Layout from "../components/layout";

export default function Home() {
  const { data: channelsWrapper, mutate } = useSWR("/api/channels");

  if (channelsWrapper) {
    return (
      <Layout>
        <h1>A list of slack channels should appear here:</h1>
        <ChannelList channels={channelsWrapper.channels} />
      </Layout>
    );
  }

  return <h1>Loading...</h1>;
}
