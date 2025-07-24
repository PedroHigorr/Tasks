import { TaskStatus } from "@prisma/client";


export class TaskDto{
    id: string;
    tittle: string;
    description: string;
    status?: TaskStatus;
    expirationDate: Date;
    userId: number;
}

