import { Terms } from "@prisma/client";

export type termsInput = Omit<Terms, "id">;