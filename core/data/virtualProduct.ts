import { VirtualProduct } from "../interface/virtualProduct.interface";

// Mock data for virtual products
const virtualProducts: VirtualProduct[] = [
  {
    id: 1,
    name: "Happy Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "A cheerful emote to express happiness.",
  },
  {
    id: 2,
    name: "Sad Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "An emote to show sadness or disappointment.",
  },
  {
    id: 3,
    name: "Angry Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "An emote to express anger or frustration.",
  },
  {
    id: 4,
    name: "Surprised Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "An emote to convey surprise or shock.",
  },
  {
    id: 5,
    name: "Love Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "An emote to express love or affection.",
  },
  {
    id: 6,
    name: "Funny Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A funny sound effect for your soundboard.",
  },
  {
    id: 7,
    name: "Scary Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A spooky sound effect to give you chills.",
  },
  {
    id: 8,
    name: "Cool Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A cool and trendy sound effect.",
  },
  {
    id: 9,
    name: "Motivational Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A motivational sound to boost your spirits.",
  },
  {
    id: 10,
    name: "Classic Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A classic and timeless sound effect.",
  },
  {
    id: 11,
    name: "100 Coins",
    price: 4.99,
    type: "coin",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Coins",
    description: "A pack of 100 in-game coins.",
  },
  {
    id: 12,
    name: "500 Coins",
    price: 19.99,
    type: "coin",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Coins",
    description: "A pack of 500 in-game coins.",
  },
  {
    id: 13,
    name: "1000 Coins",
    price: 39.99,
    type: "coin",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Coins",
    description: "A pack of 1000 in-game coins.",
  },
  {
    id: 14,
    name: "2500 Coins",
    price: 89.99,
    type: "coin",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Coins",
    description: "A pack of 2500 in-game coins.",
  },
  {
    id: 15,
    name: "5000 Coins",
    price: 149.99,
    type: "coin",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Coins",
    description: "A pack of 5000 in-game coins.",
  },
  {
    id: 16,
    name: "Wink Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "A playful wink emote.",
  },
  {
    id: 17,
    name: "Thinking Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "An emote to show contemplation or thought.",
  },
  {
    id: 18,
    name: "Party Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A lively party sound effect.",
  },
  {
    id: 19,
    name: "Romantic Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A romantic and soothing sound effect.",
  },
  {
    id: 20,
    name: "Epic Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "An epic and dramatic sound effect.",
  },
  {
    id: 21,
    name: "10000 Coins",
    price: 199.99,
    type: "coin",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Coins",
    description: "A large pack of 10000 in-game coins.",
  },
  {
    id: 22,
    name: "Cool Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "A cool and stylish emote.",
  },
  {
    id: 23,
    name: "Swag Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "A confident and stylish emote.",
  },
  {
    id: 24,
    name: "Funny Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "A humorous and entertaining emote.",
  },
  {
    id: 25,
    name: "Cute Emote",
    price: 1.99,
    type: "emote",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Emotes",
    description: "A cute and adorable emote.",
  },
  {
    id: 26,
    name: "Dramatic Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A dramatic and suspenseful sound effect.",
  },
  {
    id: 27,
    name: "Upbeat Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "An upbeat and cheerful sound effect.",
  },
  {
    id: 28,
    name: "Nostalgic Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A nostalgic and sentimental sound effect.",
  },
  {
    id: 29,
    name: "Surprise Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A surprising and unexpected sound effect.",
  },
  {
    id: 30,
    name: "Victory Sound",
    price: 0.99,
    type: "sound",
    images: [
      "https://cdn.pixabay.com/photo/2017/08/05/11/16/emoji-2586449_960_720.png",
    ],
    category: "Sounds",
    description: "A triumphant victory sound effect.",
  },
];

export default virtualProducts;