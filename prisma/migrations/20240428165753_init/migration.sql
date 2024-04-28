-- CreateTable
CREATE TABLE "User_settings" (
    "id" SERIAL NOT NULL,
    "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "theme" TEXT NOT NULL,

    CONSTRAINT "User_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registerEvent" BOOLEAN NOT NULL,
    "editEvent" BOOLEAN NOT NULL,
    "editUser" BOOLEAN NOT NULL,
    "deleteUser" BOOLEAN NOT NULL,
    "viewLogs" BOOLEAN NOT NULL,
    "viewEvents" BOOLEAN NOT NULL,
    "viewMap" BOOLEAN NOT NULL,

    CONSTRAINT "User_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userSettingsId" INTEGER NOT NULL,
    "userRolSettingsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "User_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRolSettingsId_fkey" FOREIGN KEY ("userRolSettingsId") REFERENCES "User_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
