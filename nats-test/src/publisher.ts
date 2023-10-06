import { randomUUID } from "crypto";
import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", randomUUID(), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "Metalica Concert",
    price: 20,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});
