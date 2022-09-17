import { Tests } from "@prisma/client";

export type testInput = Omit<Tests, "id">;

export interface ItestBody extends Omit<Tests, "id" | "teacherDisciplineId"> {
  teacherId: number;
  disciplineId: number;
}
