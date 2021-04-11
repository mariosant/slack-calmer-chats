import bolt from "@slack/bolt";

const { App } = bolt;

const app = new App({
  token: process.env.SLACK_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("message", (props) => {
  console.log(JSON.stringify(props.body, null, 2));
});

app.start(process.env.PORT ?? 3000).then(() => console.log("⚡️ Bot started"));
