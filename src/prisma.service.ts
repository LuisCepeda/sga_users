import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    private static instance: PrismaService
    private instanceId: string;


    public static getInstance(): PrismaService {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaService
        }
        return PrismaService.instance
    }
    constructor() {
        super(); this.instanceId = uuidv4();
    }

    getInstanceId(): string {
        return this.instanceId;
    }

    async onModuleInit() {
        console.log('Conexión creada')
        console.log('PrismaService instance created with ID:', this.instanceId);
        await this.$connect()
    }
    async onModuleDestroy() {
        console.log('Conexión terminada')
        await this.$disconnect()
    }
}
