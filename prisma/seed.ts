import { prisma } from "../src/database";

async function main() {
  const categories = ["Projeto", "Prática", "Recuperação"];
  const teachers = ["Diego Pinho", "Bruna Hamori"];
  const disciplines = [
    { name: "HTML e CSS", id: 1 },
    { name: "JavaScript", id: 2 },
    { name: "React", id: 3 },
    { name: "Humildade", id: 3 },
    { name: "Planejamento", id: 2 },
    { name: "Autoconfiança", id: 3 },
  ];
  const teachersDisciplines = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
  ];

  console.log("insere terms");
  for (let i = 1; i <= 6; i++) {
    await prisma.terms.upsert({
      where: { number: i },
      update: {},
      create: { number: i },
    });
  }

  console.log("insere categories");
  categories.forEach(async (e) => {
    await prisma.categories.upsert({
      where: { name: e },
      update: {},
      create: { name: e },
    });
  });

  console.log("insere teachers");
  teachers.forEach(async (e) => {
    await prisma.teachers.upsert({
      where: { name: e },
      update: {},
      create: { name: e },
    });
  });

  console.log("insere disciplines");
  disciplines.forEach(async (e) => {
    await prisma.disciplines.upsert({
      where: { name: e.name },
      update: {},
      create: { name: e.name, termId: e.id },
    });
  });

  console.log("insere teachersDisciplines");
  teachersDisciplines.forEach(async (e, index) => {
    await prisma.teachersDisciplines.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        id: index + 1,
        teacherId: e.teacherId,
        disciplineId: e.disciplineId,
      },
    });
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
