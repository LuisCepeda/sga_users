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
    // Verificar si los roles de usuario ya existen
    const rolesCount = await prisma.user_roles.count();
    if (rolesCount === 0) {
        // Crear roles de usuario
        await prisma.user_roles.createMany({ data: userRolesInit });
    }

    // Verificar si las configuraciones de usuario ya existen
    const settingsCount = await prisma.user_settings.count();
    if (settingsCount === 0) {
        await prisma.user_settings.createMany({ data: userSettingsInit });
    }

    // Verificar si el usuario administrador ya existe
    const userCount = await prisma.user.count();
    if (userCount === 0) {
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
