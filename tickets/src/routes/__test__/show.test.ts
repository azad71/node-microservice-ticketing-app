import request from "supertest";
import { app } from "../../app";

describe("Ticket Service - Fetch Ticket", () => {
  it("returns 404 if the ticket is not found", async () => {
    await request(app).get("/api/tickets/lkafjdklsaf").send().expect(404);
  });

  it("returns the ticket if found", async () => {
    const title = "Metalica Concert";
    const price = 20;

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title,
        price,
      })
      .expect(201);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
  });
});
