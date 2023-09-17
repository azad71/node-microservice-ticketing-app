import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

describe("Ticket Service - Create New Ticket", () => {
  it("has a route handler listening to /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.status).not.toEqual(404);
  });

  it("can only be accessible to signed in user", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.status).toEqual(401);
  });

  it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it("returns an error if an invalid title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title: "",
        price: 10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it("returns an error if an invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title: "Metalica concert",
        price: -10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
        title: "Metalica concert",
      })
      .expect(400);
  });

  it("creates new ticket with valid input", async () => {
    let tickets = await Ticket.find({});

    expect(tickets.length).toEqual(0);

    const title = "Metalica concert";
    const price = 20;

    await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({ title, price })
      .expect(201);

    tickets = await Ticket.find({});

    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(price);
    expect(tickets[0].title).toEqual(title);
  });
});
