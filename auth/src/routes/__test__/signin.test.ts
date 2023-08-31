import request from "supertest";
import { app } from "../../app";

describe("Signin Route", () => {
  it("returns 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "lasfjdaslf",
        password: "password",
      })
      .expect(400);
  });

  it("returns 400 with an empty password", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
      })
      .expect(400);
  });

  it("fails when non-existant email supplied", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  it("fails when an incorrect password is supplied", async () => {
    await request(app).post("/api/users/signup").send({
      email: "test@test.com",
      password: "password",
    });

    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password1",
      })
      .expect(400);
  });

  it("responds with a cookie when valid credential provided", async () => {
    await request(app).post("/api/users/signup").send({
      email: "test@test.com",
      password: "password",
    });

    const response = await request(app).post("/api/users/signin").send({
      email: "test@test.com",
      password: "password",
    });
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
