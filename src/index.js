import bolt from "@slack/bolt";
import { listenerFn } from "./too-long.js";

const { App, subtype } = bolt;

const app = new App({
  token: process.env.SLACK_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message(listenerFn);

app
  .start(Number(process.env.PORT) || 3000)
  .then(() => console.log("⚡️ Bot started"));
