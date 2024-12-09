import Pusher from 'pusher';

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'mt1',
    useTLS: true,
});


export const triggerPusherEvent = async (channel: string, event: string, data: object) => {
    await pusher.trigger(channel, event, data);
  };