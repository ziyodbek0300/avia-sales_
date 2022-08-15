-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'agent', 'client');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "adminId" TEXT,
    "fullName" TEXT,
    "city" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "nameCompany" TEXT,
    "doc" TEXT,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
