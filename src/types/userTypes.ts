import { Users } from '@prisma/client'

export type userInput = Omit<Users, "id">;

export interface IuserBody extends Omit<Users, "id"> {
    confirmation: string        
}