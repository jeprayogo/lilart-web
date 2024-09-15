import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { hash } from "bcryptjs";

//POST
export async function POST(req: Request) {
    const {email, password, namaDepan, namaBelakang, noHP} = await req.json();

    //cek apakah email sudah terdaftar
    const existingUser = await prisma.msUser.findUnique({
        where: {
            Email: email
        }
    });

    if (existingUser) {
        return NextResponse.json({message: "Email sudah terdaftar"}, {status: 400});
    }

    //hash password
    const hashPassword = await hash(password, 10);

    //buat user baru
    try {
        const newUser = await prisma.msUser.create({
            data: {
                Email: email,
                Password: hashPassword,
                NamaDepan: namaDepan,
                NamaBelakang: namaBelakang,
                NoHP: noHP,
                bAktif: true,
                DibuatOleh: "system",
                WaktuDiubah: new Date(),
                DiubahOleh: "system",
                WaktuDibuat: new Date()
            }
        });

        return NextResponse.json({message: "User berhasil dibuat"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Terjadi kesalahan"}, {status: 500});
    }
}