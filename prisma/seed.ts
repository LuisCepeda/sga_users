const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userRolesInit = [
    {
        name: 'Administrador',
        registerEvent: true,
        editEvent: true,
        editUser: true,
        deleteUser: true,
        viewLogs: true,
        viewEvents: true,
        viewMap: true
    },
    {
        name: 'Moderador de Eventos',
        registerEvent: true,
        editEvent: true,
        editUser: false,
        deleteUser: false,
        viewLogs: false,
        viewEvents: true,
        viewMap: false
    },
    {
        name: 'Moderador de Usuarios',
        registerEvent: false,
        editEvent: false,
        editUser: true,
        deleteUser: true,
        viewLogs: false,
        viewEvents: false,
        viewMap: false
    },
    {
        name: 'Observador',
        registerEvent: false,
        editEvent: false,
        editUser: false,
        deleteUser: false,
        viewLogs: true,
        viewEvents: true,
        viewMap: true
    },
];

const userSettingsInit = [
    { id: 1, notificationsEnabled: true, theme: 'light' },
    { id: 2, notificationsEnabled: true, theme: 'dark' },
    { id: 3, notificationsEnabled: false, theme: 'light' },
    { id: 4, notificationsEnabled: true, theme: 'dark' },
    { id: 5, notificationsEnabled: false, theme: 'dark' },
];

async function main() {
    // Crear roles de usuario
    await prisma.user_roles.createMany({ data: userRolesInit });

    await prisma.user_settings.createMany({ data: userSettingsInit });

    const hashedPassword = await bcrypt.hash("talentotech", 10);
    // Crear usuario
    await prisma.user.create({
        data: {
            firstname: "admin",
            lastname: "admin",
            username: "admin",
            email: "admin@admin.com",
            password: hashedPassword,
            userSettingsId: 1,
            userRolSettingsId: 1,
            createdAt: new Date(),
            updateAt: new Date(),
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
