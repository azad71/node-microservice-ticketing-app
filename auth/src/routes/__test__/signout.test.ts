import request from "supertest";
import { app } from "../../app";

describe("Signout Route", () => {
  it("clears auth cookie after signing out", async () => {
    await request(app).post("/api/users/signup").send({
      email: "test@test.com",
      password: "password",
    });

    await request(app).post("/api/users/signin").send({
      email: "test@test.com",
      password: "password",
    });

    const response = await request(app).post("/api/users/signout").send({});
    expect(response.get("Set-Cookie")[0]).toEqual(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
