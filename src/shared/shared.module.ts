import { Module } from '@nestjs/common';
import { PrismaService } from './Prisma/prisma.instance';

@Module({
    exports:[PrismaService]
})
export class SharedModule {}
