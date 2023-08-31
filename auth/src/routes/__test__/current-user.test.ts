import request from "supertest";
import { app } from "../../app";

describe("CurrentUser Route", () => {
  it("responds with details about the current user", async () => {
    const cookie = await signup();
    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send();

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });

  it("returns current user as null if not authenticated", async () => {
    const response = await request(app).get("/api/users/currentuser").send();

    expect(response.body.currentUser).toEqual(null);
  });
});
