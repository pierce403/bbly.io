import IPFS from "ipfs";
import Room from "ipfs-pubsub-room";

let room;
let peerCount = 0;

export function broadcastThing(thing) {
  room.broadcast(thing);
}

export function initIPFS({ onAddBubble, onAddPeer }) {
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
        onAddPeer(peerCount);
      });
      room.on("peer left", peer => {
        console.log("peer " + peer + " left");
        peerCount--;
        onAddPeer(peerCount);
      });

      // send and receive messages
      // room.on("peer joined", peer => room.sendTo(peer, "Hello " + peer + "!"));

      room.on("message", message => {
        //const newBubble = new Bubble();
        //newBubble.title = ;

        onAddBubble({
          title: message.data.toString(),
          score: 0,
          id: "bubble" + Math.random()
        });
        //bubbleList.push(newBubble);
        console.log(
          "got message from " + message.from + ": " + message.data.toString()
        );
      });

      // broadcast message every 2 seconds
      //setInterval(() => room.broadcast("OMG BUBBLES!"), 2000);
    })
  );
}
