import IPFS from "ipfs";
import Room from "ipfs-pubsub-room";

let room;
let peerCount = 0;

let bubbleList = [
  {
    title: "first thing",
    score: 0,
    happy: 0,
    sad: 0,
    id: "bubble-888"
  },
  {
    title: "second thing",
    score: 1,
    happy: 0,
    sad: 3,
    id: "bubble-999"
  }
];

export function getTopBubbles() {
  const sortedBubbles = bubbleList.slice();
  sortedBubbles.sort((left, right) => {
    if (left.score > right.score) {
      return -1;
    } else if (left.score < right.score) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedBubbles;
}

export function broadcastThing(thing) {
  room.broadcast(thing);
}

export function initIPFS({ onBubbleChange, onPeerChange }) {
  const ipfs = new IPFS({
    repo: "ipfs/pubsub-demo/" + Math.random(),
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        Swarm: [
          //"/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star"
          "/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star"
        ]
      }
    }
  });

  ipfs.once("ready", () =>
    ipfs.id((err, info) => {
      if (err) {
        throw err;
      }
      console.log("IPFS node ready with address " + info.id);

      room = Room(ipfs, "bbly-news");

      room.on("peer joined", peer => {
        console.log("peer " + peer + " joined");

        peerCount++;
        onPeerChange(peerCount);
      });
      room.on("peer left", peer => {
        console.log("peer " + peer + " left");
        peerCount--;
        onPeerChange(peerCount);
      });

      // send and receive messages
      // room.on("peer joined", peer => room.sendTo(peer, "Hello " + peer + "!"));

      room.on("message", message => {
        const messageObject = JSON.parse(message.data.toString());
        console.log(messageObject);

        if (messageObject["type"] === "vote") {
          for (let x = 0; x < bubbleList.length; ++x) {
            // find the bubble
            if (bubbleList[x].id === messageObject["id"]) {
              if (messageObject["emotion"] === "happy") bubbleList[x].happy++;
              if (messageObject["emotion"] === "sad") bubbleList[x].sad++;

              bubbleList[x].score = bubbleList[x].happy - bubbleList[x].sad;
            }
          }

          onBubbleChange();
          return;
        }

        if (messageObject["type"] === "story") {
          bubbleList.push({
            title: messageObject["title"],
            score: 0,
            happy: 0,
            sad: 0,
            id: messageObject["id"]
          });

          onBubbleChange();
        }
      });

      // broadcast message every 2 seconds
      //setInterval(() => room.broadcast("OMG BUBBLES!"), 2000);
    })
  );
}
