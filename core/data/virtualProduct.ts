import { VirtualProduct } from "../interface/virtualProduct.interface";

// Mock data for virtual products
const virtualProducts: VirtualProduct[] = 
[
  {
    "id": 1,
    "name": "Busy",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20240822/ourmid/pngtree-smiling-businessman-cartoon-character-with-briefcase-3d-illustration-png-image_13590737.png"
    ],
    "category": "Emotes",
    "description": "A cheerful emote to express happiness."
  },
  {
    "id": 2,
    "name": "Selfie",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20240421/ourmid/pngtree-d-cartoon-style-young-business-man-taking-selfie-on-a-transparent-png-image_12305634.png"
    ],
    "category": "Emotes",
    "description": "An emote to show sadness or disappointment."
  },
  {
    "id": 3,
    "name": "Hurray",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-clipart/20231016/original/pngtree-celebration-of-businessman-wearing-long-shirt-and-blue-tie-3d-businessman-png-image_13321680.png"
    ],
    "category": "Emotes",
    "description": "An emote to express anger or frustration."
  },
  {
    "id": 4,
    "name": "You",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20230906/ourmid/pngtree-businessman-in-gray-vest-suit-pointing-with-thumb-aside-looking-at-png-image_10001780.png"
    ],
    "category": "Emotes",
    "description": "An emote to convey surprise or shock."
  },
  {
    "id": 5,
    "name": "Sitting",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://static.vecteezy.com/system/resources/thumbnails/038/368/301/small/ai-generated-3d-a-businessman-sitting-on-a-floor-with-smiling-face-on-isolated-transparent-background-generated-with-ai-png.png"
    ],
    "category": "Emotes",
    "description": "An emote to express love or affection."
  },
  {
    "id": 6,
    "name": "Funny Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-radio-wave-or-sound-wave-icon-vector-isolated-png-image_5219473.png"
    ],
    "category": "Sounds",
    "description": "A funny sound effect for your soundboard."
  },
  {
    "id": 7,
    "name": "Scary Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230922/original/pngtree-sound-wave-logo-vector-icon-bar-icon-line-vector-png-image_12522730.png"
    ],
    "category": "Sounds",
    "description": "A spooky sound effect to give you chills."
  },
  {
    "id": 8,
    "name": "Cool Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-radio-wave-or-sound-wave-icon-vector-isolated-png-image_5219473.png"
    ],
    "category": "Sounds",
    "description": "A cool and trendy sound effect."
  },
  {
    "id": 9,
    "name": "Motivational Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230922/original/pngtree-sound-wave-logo-vector-icon-bar-icon-line-vector-png-image_12522730.png"
    ],
    "category": "Sounds",
    "description": "A motivational sound to boost your spirits."
  },
  {
    "id": 10,
    "name": "Classic Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-radio-wave-or-sound-wave-icon-vector-isolated-png-image_5219475.png"
    ],
    "category": "Sounds",
    "description": "A classic and timeless sound effect."
  },
  {
    "id": 11,
    "name": "100 Coins",
    "price": 4.99,
    "type": "coin",
    "images": [
      "https://png.pngtree.com/png-vector/20240226/ourmid/pngtree-3d-illustration-game-coin-without-background-png-image_11880013.png"
    ],
    "category": "Coins",
    "description": "A pack of 100 in-game coins."
  },
  {
    "id": 12,
    "name": "500 Coins",
    "price": 19.99,
    "type": "coin",
    "images": [
      "https://png.pngtree.com/png-vector/20240226/ourmid/pngtree-3d-illustration-game-coin-without-background-png-image_11880013.png"
    ],
    "category": "Coins",
    "description": "A pack of 500 in-game coins."
  },
  {
    "id": 13,
    "name": "1000 Coins",
    "price": 39.99,
    "type": "coin",
    "images": [
      "https://png.pngtree.com/png-vector/20240226/ourmid/pngtree-3d-illustration-game-coin-without-background-png-image_11880013.png"
    ],
    "category": "Coins",
    "description": "A pack of 1000 in-game coins."
  },
  {
    "id": 14,
    "name": "2500 Coins",
    "price": 89.99,
    "type": "coin",
    "images": [
      "https://png.pngtree.com/png-vector/20240621/ourmid/pngtree-bitcoin-sign-coin-bag-png-image_12793216.png"
    ],
    "category": "Coins",
    "description": "A pack of 2500 in-game coins."
  },
  {
    "id": 15,
    "name": "5000 Coins",
    "price": 149.99,
    "type": "coin",
    "images": [
      "https://png.pngtree.com/png-vector/20240621/ourmid/pngtree-bitcoin-sign-coin-bag-png-image_12793216.png"
    ],
    "category": "Coins",
    "description": "A pack of 5000 in-game coins."
  },
  {
    "id": 16,
    "name": "Extremely Happy",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-clipart/20231116/original/pngtree-craft-a-humorous-businessman-cartoon-character-illustrating-the-ups-and-downs-png-image_13572497.png"
    ],
    "category": "Emotes",
    "description": "A playful wink emote."
  },
  {
    "id": 17,
    "name": "Thumbsup",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20240824/ourmid/pngtree-a-happy-3d-business-man-on-transparent-white-background-png-image_13604288.png"
    ],
    "category": "Emotes",
    "description": "An emote to show contemplation or thought."
  },
  {
    "id": 18,
    "name": "Party Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-radio-wave-or-sound-wave-icon-vector-isolated-png-image_5219475.png"
    ],
    "category": "Sounds",
    "description": "A lively party sound effect."
  },
  {
    "id": 19,
    "name": "Romantic Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230922/original/pngtree-sound-wave-logo-template-vector-icon-red-spectrum-frequency-vector-png-image_12517825.png"
    ],
    "category": "Sounds",
    "description": "A romantic and soothing sound effect."
  },
  {
    "id": 20,
    "name": "Epic Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230815/original/pngtree-sound-wave-vector-icon-digital-abstract-audio-vector-picture-image_10796636.png"
    ],
    "category": "Sounds",
    "description": "An epic and dramatic sound effect."
  },
  {
    "id": 21,
    "name": "10000 Coins",
    "price": 199.99,
    "type": "coin",
    "images": [
      "https://png.pngtree.com/png-vector/20240621/ourmid/pngtree-bitcoin-sign-coin-bag-png-image_12793216.png"
    ],
    "category": "Coins",
    "description": "A large pack of 10000 in-game coins."
  },
  {
    "id": 22,
    "name": "Working",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20240509/ourmid/pngtree-3d-illustration-of-a-happy-business-man-with-cartoon-png-image_12384195.png"
    ],
    "category": "Emotes",
    "description": "A cool and stylish emote."
  },
  {
    "id": 23,
    "name": "Thinking",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-businessman-is-thinking-and-wondering-character-3d-character-illustration-png-image_9200930.png"
    ],
    "category": "Emotes",
    "description": "A confident and stylish emote."
  },
  {
    "id": 24,
    "name": "Kachau",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-3d-cartoon-character-with-glasses-png-image_11531995.png"
    ],
    "category": "Emotes",
    "description": "A humorous and entertaining emote."
  },
  {
    "id": 25,
    "name": "Cute",
    "price": 1.99,
    "type": "emote",
    "images": [
      "https://png.pngtree.com/png-vector/20231015/ourmid/pngtree-3d-character-illustrator-standing-pose-png-image_10161392.png"
    ],
    "category": "Emotes",
    "description": "A cute and adorable emote."
  },
  {
    "id": 26,
    "name": "Dramatic Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230922/original/pngtree-sound-wave-logo-template-vector-icon-red-spectrum-frequency-vector-png-image_12517825.png"
    ],
    "category": "Sounds",
    "description": "A dramatic and suspenseful sound effect."
  },
  {
    "id": 27,
    "name": "Upbeat Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230815/original/pngtree-sound-wave-vector-icon-digital-abstract-audio-vector-picture-image_10796636.png"
    ],
    "category": "Sounds",
    "description": "An upbeat and cheerful sound effect."
  },
  {
    "id": 28,
    "name": "Nostalgic Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230815/original/pngtree-sound-wave-vector-icon-digital-abstract-audio-vector-picture-image_10796636.png"
    ],
    "category": "Sounds",
    "description": "A nostalgic and sentimental sound effect."
  },
  {
    "id": 29,
    "name": "Surprise Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230815/original/pngtree-sound-wave-vector-icon-digital-abstract-audio-vector-picture-image_10796636.png"
    ],
    "category": "Sounds",
    "description": "A surprising and unexpected sound effect."
  },
  {
    "id": 30,
    "name": "Victory Sound",
    "price": 0.99,
    "type": "sound",
    "images": [
      "https://png.pngtree.com/png-clipart/20230815/original/pngtree-sound-wave-vector-icon-digital-abstract-audio-vector-picture-image_10796636.png"
    ],
    "category": "Sounds",
    "description": "A triumphant victory sound effect."
  }
];


export default virtualProducts;