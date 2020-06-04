import Head from "next/head";
import useSWR from "swr";
import ChannelList from "../components/channelList";

export default function Home() {
  const { data: channelsWrapper, mutate } = useSWR("/api/channels");

  if (channelsWrapper) {
    return (
      <div className="container">
        <Head>
          <title>slack again</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>A list of slack channels should appear here:</h1>
          <ChannelList channels={channelsWrapper.channels} />
        </main>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}
