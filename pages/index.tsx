import Head from "next/head";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import { Channel } from "../models/channel";

export default function Home() {
  const fetcher = (url: any) => fetch(url).then((r) => r.json());
  const { data: channelsWrapper, mutate } = useSWR("/api/channels", fetcher);

  if (channelsWrapper) {
    return (
      <div className="container">
        <Head>
          <title>slack again</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>A list of slack channels should appear here:</h1>
          {channelsWrapper.channels.map((channel: Channel) => {
            return <li key={channel.name}>{channel.name}</li>;
          })}
        </main>
      </div>
    );
  }

  return <h1>Loading...</h1>;
}
