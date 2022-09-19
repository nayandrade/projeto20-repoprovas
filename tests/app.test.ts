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

  it("Try to create a new user but with unmatched passwords, must return 422", async () => {
    const newUser = await userFactory();
    const confirmation = await passwordFactory();

    const result = await supertest(app)
      .post("/signup")
      .send({ ...newUser, confirmation });

    const userCreated = await prisma.users.findFirst({
      where: { email: newUser.email },
    });

    expect(userCreated).toBeNull();
    expect(result.status).toBe(422);
  });

  it("Try to create a new user but user is already registered, must return 409", async () => {
    const newUser = await userFactory();

    await supertest(app).post("/signup").send(newUser);
    const result = await supertest(app).post("/signup").send(newUser);

    expect(result.status).toBe(409);
  });

  it("Connect user and must return 200", async () => {
    const newUser = await userFactory();

    await supertest(app).post("/signup").send(newUser);
    const result = await supertest(app)
      .post("/signin")
      .send({ email: newUser.email, password: newUser.password });

    const token = result.text;

    expect(result.status).toBe(200);
    expect(token).not.toBeNull();
  });

  it("Try to connect user but user is not found, must return 404", async () => {
    const newUser = await userFactory();

    const result = await supertest(app)
      .post("/signin")
      .send({ email: newUser.email, password: newUser.password });

    const message = result.text;

    expect(result.status).toBe(404);
    expect(message).toBe(
      "User not found, please create an account to continue"
    );
  });

  it("Try to connect user but user password is incorrect, must return 401", async () => {
    const newUser = await userFactory();
    const password = await passwordFactory();

    await supertest(app).post("/signup").send(newUser);

    const result = await supertest(app)
      .post("/signin")
      .send({ email: newUser.email, password });

    const message = result.text;

    expect(result.status).toBe(401);
    expect(message).toBe("Unauthorized, please login to continue");
  });
});

// describe("Tests tests", () => {
//   it("Post a new test and must return 200", async () => {
//     const newTest = await testsFactory(2, 1, 1);
//     const newUser = await userFactory();
//     const newUserResult = await supertest(app).post("/signup").send(newUser);
//     const newUserLogin = await supertest(app)
//       .post("/signin")
//       .send({ email: newUser.email, password: newUser.password });

//     const result = await supertest(app)
//       .post("/tests")
//       .send(newTest)
//       .set({ Authorization: newUserLogin.text });

//     expect(newUserResult.status).toBe(201);
//     expect(newUserLogin.status).toBe(200);
//     expect(newUserLogin.text).not.toBeNull();
//     expect(result.status).toBe(201);
//   });

//   it("Try to post a new test but user is unauthorized, must return 401", async () => {
//     const newTest = await testsFactory(2, 1, 1);
//     const token = await tokenFactory();

//     const result = await supertest(app)
//       .post("/tests")
//       .send(newTest)
//       .set({ Authorization: token });

//     expect(result.body.message).toBe("Failed to authenticate token.");
//     expect(result.status).toBe(401);
//   });

//   it("Get all tests grouped by discipine, must return 200", async () => {
//     const newUser = await userFactory();
//     const newUserResult = await supertest(app).post("/signup").send(newUser);
//     const newUserLogin = await supertest(app)
//       .post("/signin")
//       .send({ email: newUser.email, password: newUser.password });

//     const result = await supertest(app)
//       .get("/tests/termsview")
//       .set({ Authorization: newUserLogin.text });

//     expect(newUserResult.status).toBe(201);
//     expect(newUserLogin.status).toBe(200);
//     expect(newUserLogin.text).not.toBeNull();
//     expect(result.status).toBe(200);
//     expect(result.body).not.toBeNull();
//   });

//   it("Get all tests grouped by teacher, must return 200", async () => {
//     const newUser = await userFactory();
//     const newUserResult = await supertest(app).post("/signup").send(newUser);
//     const newUserLogin = await supertest(app)
//       .post("/signin")
//       .send({ email: newUser.email, password: newUser.password });

//     const result = await supertest(app)
//       .get("/tests/teachersview")
//       .set({ Authorization: newUserLogin.text });

//     expect(newUserResult.status).toBe(201);
//     expect(newUserLogin.status).toBe(200);
//     expect(newUserLogin.text).not.toBeNull();
//     expect(result.status).toBe(200);
//     expect(result.body).not.toBeNull();
//   });
// });

afterAll(async () => {
  await prisma.$disconnect();
});
