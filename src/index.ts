import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.event("message", async (props) => {
  console.log(JSON.stringify(props.body, null, 2));
});

app
  .start(Number(process.env.PORT) || 3000)
  .then(() => console.log("⚡️ Bot started"));
