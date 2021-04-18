import * as R from "ramda";

const isPartOfThread = (next) =>
  R.when(R.pathSatisfies(Boolean, ["message", "thread_ts"]), next);

const fn = async ({ message, context, say }) => {
  const { conversation = {}, updateConversation } = context;

  const { replies = [], moderated = false } = conversation;
  const nextReplies = [...replies, { user: message.user }];

  if (replies.length === 10 && moderated === false) {
    await say({
      text: "This is taking a bit too long. How about initiating a video call?",
      thread_ts: message.thread_ts,
    });

    await updateConversation({
      ...conversation,
      replies: nextReplies,
      moderated: true,
    });
  } else {
    await updateConversation({
      ...conversation,
      replies: nextReplies,
      moderated: false,
    });
  }
};

export const listenerFn = R.compose(isPartOfThread)(fn);
