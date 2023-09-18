import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

describe("Ticket Service - Get Ticket List", () => {
  const createTicket = (title: string, price: number) => {
    return request(app).post("/api/tickets").set("Cookie", signin()).send({
      title,
      price,
    });
  };

  it("fetch a list of tickets", async () => {
    await createTicket("Metalica Concert", 20);
    await createTicket("Nirvana Concert", 20);
    await createTicket("Megadeth Concert", 20);

    const response = await request(app).get("/api/tickets").send().expect(200);

    expect(response.body.length).toEqual(3);
  });
});
