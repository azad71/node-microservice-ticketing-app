import request from "supertest";
import { app } from "../../app";

describe("Signup Route", () => {
  it("returns a 201 on successfull signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  });

  it("returns 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "lasfjdaslf",
        password: "password",
      })
      .expect(400);
  });

  it("returns 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "lasfjdaslf",
        password: "p",
      })
      .expect(400);
  });

  it("returns 400 with no email and password", async () => {
    return request(app).post("/api/users/signup").send({}).expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  it("sets auth cookie after successfull signup", async () => {
    const response = await request(app).post("/api/users/signup").send({
      email: "test@test.com",
      password: "password",
    });

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
