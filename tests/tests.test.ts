import { prisma } from "../src/database";
import supertest from "supertest";
import app from "../src/app";
import userFactory from "./factories/userFactory";
import passwordFactory from "./factories/passwordFactory";
import testsFactory from "./factories/testsFactory";
import tokenFactory from "./factories/tokenFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`;
});

describe("Tests tests", () => {
  it("Post a new test and must return 200", async () => {
    const newTest = await testsFactory(2, 1, 1);
    const newUser = await userFactory();
    const newUserResult = await supertest(app).post("/signup").send(newUser);
    const newUserLogin = await supertest(app)
      .post("/signin")
      .send({ email: newUser.email, password: newUser.password });

    const result = await supertest(app)
      .post("/tests")
      .send(newTest)
      .set({ Authorization: newUserLogin.text });

    expect(newUserResult.status).toBe(201);
    expect(newUserLogin.status).toBe(200);
    expect(newUserLogin.text).not.toBeNull();
    expect(result.status).toBe(201);
  });

  it("Try to post a new test but user is unauthorized, must return 401", async () => {
    const newTest = await testsFactory(2, 1, 1);
    const token = await tokenFactory();

    const result = await supertest(app)
      .post("/tests")
      .send(newTest)
      .set({ Authorization: token });

    expect(result.body.message).toBe("Failed to authenticate token.");
    expect(result.status).toBe(401);
  });

  it("Get all tests grouped by discipine, must return 200", async () => {
    const newUser = await userFactory();
    const newUserResult = await supertest(app).post("/signup").send(newUser);
    const newUserLogin = await supertest(app)
      .post("/signin")
      .send({ email: newUser.email, password: newUser.password });

    const result = await supertest(app)
      .get("/tests/termsview")
      .set({ Authorization: newUserLogin.text });

    expect(newUserResult.status).toBe(201);
    expect(newUserLogin.status).toBe(200);
    expect(newUserLogin.text).not.toBeNull();
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });

  it("Get all tests grouped by teacher, must return 200", async () => {
    const newUser = await userFactory();
    const newUserResult = await supertest(app).post("/signup").send(newUser);
    const newUserLogin = await supertest(app)
      .post("/signin")
      .send({ email: newUser.email, password: newUser.password });

    const result = await supertest(app)
      .get("/tests/teachersview")
      .set({ Authorization: newUserLogin.text });

    expect(newUserResult.status).toBe(201);
    expect(newUserLogin.status).toBe(200);
    expect(newUserLogin.text).not.toBeNull();
    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
