import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ConfigService } from "@nestjs/config";
import bcrypt from "bcrypt"

@Injectable()
export class SeederService implements OnModuleInit {
    private logger: Logger;
    constructor(private db: PrismaService, private configService: ConfigService) {
        this.logger = new Logger(SeederService.name)
    }

    async onModuleInit() {
        await this.seedAdmin()
    }

    async seedAdmin() {
        try {
            const password = this.configService.get<string>('ADMIN_PASSWORD') as string;
            const email = this.configService.get<string>('ADMIN_EMAIL') as string;
            const username = this.configService.get<string>('ADMIN_USERNAME') as string;

            const existsAdmin = await this.db.prisma.user.findUnique({
                where: { email }
            })
            if (existsAdmin && existsAdmin.role === 'ADMIN') {
                this.logger.warn('Admin user already exists');
                return;
            }
            const hashedPassword: string = await bcrypt.hash(password, 12)
            await this.db.prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    role: 'ADMIN'
                }
            })
            this.logger.log('Admin user seeded successfully');
            return true
        } catch (error) {
            this.logger.error('could not seed admin user', error);
        }
    }
}