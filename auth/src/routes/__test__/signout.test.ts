import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app).post("/api/users/signout").expect(200);

  expect(response.body).toEqual({});
  expect(response.get("Set-Cookie")).toBeDefined();
  expect(response.get("Set-Cookie").length).toBe(1);
});
