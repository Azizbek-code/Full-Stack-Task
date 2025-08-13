import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [DatabaseModule, ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ['.env', '.env.development', '.env.production']
    }), JwtModule.registerAsync({
        global: true,
        useFactory: (ConfigService: ConfigService) => ({
            secret: ConfigService.get<string>('JWT_SECRET')
        }),
        inject: [ConfigService]
    })],
    providers: [],
    exports: []
})
export class CoreModule { }