import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

describe("Ticket Service - Update Ticket", () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = "Metalica Concert";
  const price = 20;

  it("returns a 404 if ticket id does not exist", async () => {
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", signin())
      .send({
        title,
        price,
      })
      .expect(404);
  });

  it("returns a 401 if the user is not authenticated", async () => {
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title,
        price,
      })
      .expect(401);
  });

  it("returns a 401 if user does not own the ticket", async () => {
    const response = await request(app)
      .post(`/api/tickets`)
      .set("Cookie", signin())
      .send({
        title,
        price,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", signin())
      .send({
        title: "lajfdslakf",
        price: 10,
      })
      .expect(401);
  });

  it("returns a 404 if invalid title or price provided", async () => {
    const cookie = signin();
    const response = await request(app)
      .post(`/api/tickets`)
      .set("Cookie", cookie)
      .send({
        title,
        price,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 20,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title,
        price: -20,
      })
      .expect(400);
  });

  it("updates ticket if valid title and price provided", async () => {
    const cookie = signin();
    const response = await request(app)
      .post(`/api/tickets`)
      .set("Cookie", cookie)
      .send({
        title,
        price,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "Nirvana Concert",
        price: 15,
      })
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticketResponse.body.title).toEqual("Nirvana Concert");
    expect(ticketResponse.body.price).toEqual(15);
  });
});
