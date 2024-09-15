-- CreateEnum
CREATE TYPE "Kategori" AS ENUM ('WEBDEV', 'DESIGN');

-- CreateTable
CREATE TABLE "MsUser" (
    "UserID" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "NamaDepan" TEXT NOT NULL,
    "NamaBelakang" TEXT NOT NULL,
    "NoHP" TEXT NOT NULL,
    "bAktif" BOOLEAN NOT NULL,
    "DibuatOleh" TEXT NOT NULL,
    "WaktuDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DiubahOleh" TEXT NOT NULL,
    "WaktuDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MsUser_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "MsTech" (
    "Id" SERIAL NOT NULL,
    "Kategori" "Kategori" NOT NULL,
    "Nama" TEXT NOT NULL,
    "Component" TEXT,
    "DibuatOleh" TEXT NOT NULL,
    "WaktuDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DiubahOleh" TEXT NOT NULL,
    "WaktuDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MsTech_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MsPortfolio" (
    "Id" SERIAL NOT NULL,
    "Nama" TEXT NOT NULL,
    "Judul" TEXT NOT NULL,
    "Deskripsi" TEXT NOT NULL,
    "Kategori" "Kategori" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "DibuatOleh" TEXT NOT NULL,
    "WaktuDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DiubahOleh" TEXT NOT NULL,
    "WaktuDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MsPortfolio_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "MsPortfolioDtlTech" (
    "PortoId" INTEGER NOT NULL,
    "NoUrut" INTEGER NOT NULL,
    "TechId" INTEGER NOT NULL,
    "DibuatOleh" TEXT NOT NULL,
    "WaktuDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DiubahOleh" TEXT NOT NULL,
    "WaktuDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MsPortfolioDtlTech_pkey" PRIMARY KEY ("PortoId","TechId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MsUser_Email_key" ON "MsUser"("Email");

-- AddForeignKey
ALTER TABLE "MsPortfolioDtlTech" ADD CONSTRAINT "MsPortfolioDtlTech_PortoId_fkey" FOREIGN KEY ("PortoId") REFERENCES "MsPortfolio"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MsPortfolioDtlTech" ADD CONSTRAINT "MsPortfolioDtlTech_TechId_fkey" FOREIGN KEY ("TechId") REFERENCES "MsTech"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
