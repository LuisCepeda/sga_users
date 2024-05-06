import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    private static instance: PrismaService


    public static getInstance(): PrismaService {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaService
        }
        return PrismaService.instance
    }

    async onModuleInit() {
        console.log('Conexión creada')
        await this.$connect()
    }
    async onModuleDestroy() {
        console.log('Conexión terminada')
        await this.$disconnect()
    }
}
