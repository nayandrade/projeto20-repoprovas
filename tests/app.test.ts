import { prisma } from "../src/database";
import supertest from "supertest";
import app from "../src/app";
import userFactory from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
  await prisma.$executeRaw`TRUNCATE TABLE categories CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE teachers CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE terms CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE disciplines CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE teachers_disciplines CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`;
});

describe("Authorization tests", () => {
  it("Creates a new user and must return 201", async () => {
    const newUser = await userFactory();

    const result = await supertest(app).post("/signup").send(newUser);

    const userCreated = await prisma.users.findFirst({
      where: { email: newUser.email },
    });

    expect(userCreated).not.toBeNull();
    expect(result.status).toBe(201);
  });

  it("Try to create a new user but with unmatched passwords, must return 409", async () => {
    const newUser = await userFactory();

    const result = await supertest(app)
      .post("/signup")
      .send({ ...newUser, confirmation: "000000" });

    const userCreated = await prisma.users.findFirst({
      where: { email: newUser.email },
    });

    expect(userCreated).toBeNull();
    expect(result.status).toBe(409);
  });

  it("Try to create a new user but user is already registered, must return 409", async () => {
    const newUser = await userFactory();

    await supertest(app).post("/signup").send(newUser);
    const result = await supertest(app).post("/signup").send(newUser);

    expect(result.status).toBe(409);
  });

  it("Connect user and must return 200", async () => {
    const newUser = await userFactory();

    const result = await supertest(app).post("/signin").send(newUser);

    const { token } = result.body;

    expect(token).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
