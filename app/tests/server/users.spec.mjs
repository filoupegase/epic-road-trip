"use strict";
import fetch from "node-fetch";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname.split("tests/server")[0] + ".env.local" });
let token;

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host:
    process.env.NODE_ENV === "production"
      ? process.env.POSTGRES_HOST_PROD
      : process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://roadtrip.icaro.fr"
    : "http://localhost:3000";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function deleteUser(email) {
  pool.query("DELETE FROM users WHERE email = $1", [email]);
}

deleteUser("email@fakemail.com");

describe("POST - /api/user/register", () => {
  it("Try to feed the request with missing data.", async () => {
    const request = await fetch(`${baseUrl}/api/user/register`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        email: "email@fakemail.com",
        password: "testTest!1",
      }),
    });
    const response = await request.json();
    expect(request.status).toBe(400);
    expect(response.message).toBe("Not all fields have been entered.");
  });

  it("Create a new user.", async () => {
    const request = await fetch(`${baseUrl}/api/user/register`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        email: "email@fakemail.com",
        password: "testTest!1",
        passwordCheck: "testTest!1",
      }),
    });
    const response = await request.json();
    expect(request.status).toBe(200);
    expect(response.message).toBe("Registration successful.");
  });
});

describe("POST - /api/user/login", () => {
  it("Try to feed the request with false data.", async () => {
    const request = await fetch(`${baseUrl}/api/user/login`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        email: "idontexist@fakeemail.id",
        password: "FakePassword",
      }),
    });
    const response = await request.json();
    expect(request.status).toBe(401);
    expect(response.message).toBe("No account with this email.");
  });

  it("Should return a 400 error if email or password is missing", async () => {
    const request = await fetch(`${baseUrl}/api/user/login`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        email: "email@fakemail.com",
      }),
    });
    const response = await request.json();
    expect(request.status).toBe(400);
    expect(response.message).toBe("Not all fields have been entered.");

    const request2 = await fetch(`${baseUrl}/api/user/login`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        password: "test",
      }),
    });
    const response2 = await request2.json();
    expect(request2.status).toBe(400);
    expect(response2.message).toBe("Not all fields have been entered.");
  });

  it("Login with a valid user.", async () => {
    const request = await fetch(`${baseUrl}/api/user/login`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        email: "email@fakemail.com",
        password: "testTest!1",
      }),
    });
    const response = await request.json();
    expect(request.status).toBe(200);
    token = response.token;
    expect(response.token).toBeTruthy();
  });
});

describe("DELETE - /api/user", () => {
  it("Flush temporary user.", async () => {
    const request = await fetch(`${baseUrl}/api/user`, {
      headers: {
        cookie: `token=${token}`,
      },
      method: "DELETE",
    });
    const response = await request.json();
    expect(request.status).toBe(200);
    expect(response.message).toBe("User deleted.");
  });
});

deleteUser("email@fakemail.com");
