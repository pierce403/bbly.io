import IPFS from "ipfs";
import Room from "ipfs-pubsub-room";

let room;
let peerCount = 0;

let bubbleList = [];
if (localStorage.getItem("bubbleList") == null) {
  console.log("loading default bubbles");
  bubbleList = [
    {
      title: "Welcome to BBLY.IO!",
      link: "https://bbly.io",
      summary: "This site is pretty fun, hope you enjoy it!",
      score: 0,
      awesome: 0,
      hilarious: 0,
      enlightening: 0,
      solidarity: 0,
      scammy: 0,
      poopy: 0,
      hateful: 0,

      id: "bubble-777"
    }
  ];
} else {
  console.log("loading stored bubbles");
  bubbleList = JSON.parse(localStorage.getItem("bubbleList"));
}

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
          "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star"
          //"/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star"
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
              if (messageObject["emotion"] === "awesome")
                bubbleList[x].awesome++;
              if (messageObject["emotion"] === "hilarious")
                bubbleList[x].hilarious++;
              if (messageObject["emotion"] === "enlightening")
                bubbleList[x].enlightening++;
              if (messageObject["emotion"] === "solidarity")
                bubbleList[x].solidarity++;
              if (messageObject["emotion"] === "scammy") bubbleList[x].scammy++;
              if (messageObject["emotion"] === "poopy") bubbleList[x].poopy++;
              if (messageObject["emotion"] === "hateful")
                bubbleList[x].hateful++;

              bubbleList[x].score =
                bubbleList[x].awesome +
                bubbleList[x].hilarious +
                bubbleList[x].enlightening +
                bubbleList[x].solidarity -
                bubbleList[x].scammy -
                bubbleList[x].poopy -
                bubbleList[x].hateful * 10;
            }
          }

          console.log("stored " + bubbleList.length + " bubbles!");
          localStorage.setItem("bubbleList", JSON.stringify(bubbleList));
          onBubbleChange();
          return;
        }

        if (messageObject["type"] === "story") {
          bubbleList.push({
            title: messageObject["title"],
            score: 0,
            awesome: 0,
            hilarious: 0,
            enlightening: 0,
            solidarity: 0,
            hateful: 0,
            poopy: 0,
            scammy: 0,

            id: messageObject["id"]
          });

          onBubbleChange();
        }
      });
    })
  );
}
