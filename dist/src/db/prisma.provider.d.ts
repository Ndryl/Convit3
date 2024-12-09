import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaProvider extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): void;
    onModuleDestroy(): void;
}
