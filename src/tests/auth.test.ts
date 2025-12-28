import request from "supertest";
import { app } from "./setup";

describe("AUTH FLOW (E2E)", () => {
  const user = {
    email: "testuser@mail.com",
    password: "Test@12345"
  };

  let accessToken = "";
  let resetToken = "";

  // =========================
  // REGISTER
  // =========================
  it("registers a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(user.email);
  });

  it("rejects duplicate registration", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(user);

    expect(res.status).toBe(409);
  });

  // =========================
  // LOGIN
  // =========================
  it("logs in successfully", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(user);

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();

    accessToken = res.body.accessToken;
  });

  it("rejects invalid password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: "wrong"
      });

    expect(res.status).toBe(401);
  });

  // =========================
  // FORGOT PASSWORD
  // =========================
  it("generates password reset token", async () => {
    const res = await request(app)
      .post("/auth/forgot-password")
      .send({ email: user.email });

    expect(res.status).toBe(200);
    expect(res.body.resetToken).toBeDefined();

    resetToken = res.body.resetToken;
  });

  it("resets password", async () => {
    const res = await request(app)
      .post("/auth/reset-password")
      .send({
        token: resetToken,
        newPassword: "New@12345"
      });

    expect(res.status).toBe(200);
  });

  it("logs in with new password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: "New@12345"
      });

    expect(res.status).toBe(200);
  });
});
