import { prisma } from "../database";
import { testInput } from "../types/testTypes";

export async function create(newTestData: testInput) {
  await prisma.tests.create({
    data: newTestData,
  });
}

export async function getTestsByTerms() {
  return prisma.terms.findMany({
    include: {
      Disciplines: {
        include: {
          TeacherDisciplines: {
            include: {
              teachers: true,
              Tests: {
                include: {
                  categories: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getTestsByTeacher() {
  return prisma.teachers.findMany({
    include: {
      TeachersDisciplines: {
        select: {
          disciplines: {
            select: {
              terms: {
                include: {
                  Disciplines: {
                    select: {
                      name: true,
                      TeacherDisciplines: {
                        select: {
                          Tests: {
                            include: {
                              categories: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

// export async function getTestsByTeacher() {
//   return prisma.teachers.findMany({
//     include: {
//       TeachersDisciplines: {
//         select: {
//           disciplines: {
//             select: {
//               terms: {
//                 include: {
//                   Disciplines: {
//                     select: {
//                       TeacherDisciplines: {
//                         select: {
//                           Tests: {
//                             include: {
//                               categories: true,
//                             },
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
// }

// export async function getTestsByTeachers() {
//   return prisma.teachers.findMany({
//     include: {
//       TeachersDisciplines: {
//         select: {
//           disciplines: {
//             include: {
//               terms: true,
//               TeacherDisciplines: {
//                 include: {
//                   Tests: {
//                     include: {
//                       categories: true,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
// }
