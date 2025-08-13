import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService implements OnModuleInit{
    public prisma: PrismaClient
    private logger :Logger

    constructor() {
        this.prisma = new PrismaClient()
        this.logger = new Logger(PrismaService.name)
    }

    async onModuleInit() {
        try {
            this.prisma.$connect()
            this.logger.log('Database connected');
        } catch (error) {
            this.logger.error('db connection error', error)
            process.exit(1)
        }
    }
}