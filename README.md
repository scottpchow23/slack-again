# slack archive

A local tool to bring slack exports to life - again.

## getting started

First, you'll need to get an export of your Slack workspace. Instructions for that can be found [here](https://slack.com/help/articles/204897248-Guide-to-Slack-import-and-export-tools).

With that export in hand, you'll need to copy all of the files within it under `public/data/`. This will be where the backend of this app expects to see all of the data regarding your workspace.

To clarify; if your slack export is in a folder named `slack-export`, then you'll want to put the files _under_ it into `public/data`, not the folder itself.

Finally, run the development server:

```bash
npx install
npx run dev
```

With that, you should see the app running and displaying information about your workspace!
