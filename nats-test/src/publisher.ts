import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  //"abc" is the ID by which this client is identified by the NATS Streaming Server
  //using "stan" instead of "client" is a convention here
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish({
    id: "123",
    title: "concert",
    price: 20,
  });

  //data sent to the NATS Streaming Server must be a string!
  // const data = JSON.stringify({
  //   id: "1234",
  //   title: "concert",
  //   price: 20,
  // });

  // share the "data" over the "ticket:created" channel
  // stan.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });
});
