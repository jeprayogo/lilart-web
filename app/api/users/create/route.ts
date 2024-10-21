import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import {NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prisma";
import { hash } from "bcryptjs";

//POST
export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect("api/auth/signin");
    }

    const body = await  request.json();
    const {UserID, Email, Password, NamaDepan, NamaBelakang, NoHP, DibuatOleh, DiubahOleh} = body;

    if (!UserID || !Email || !Password || !NamaDepan || !NamaBelakang || !NoHP) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.msUser.findUnique({
        where: {
            Email: Email
        }
    });

    if (user) {
        return NextResponse.json({ message: "Email telah terdaftar" }, { status: 400 });
    }

    //buat user baru
    try {
        const userEmail = session.user?.email ?? 'system';

        //hash password
        const hashPassword = await hash(Password, 10);

        const newUser = await prisma.msUser.create({
            data: {
                UserID: UserID,
                Email: Email,
                Password: hashPassword,
                NamaDepan: NamaDepan,
                NamaBelakang: NamaBelakang,
                NoHP: NoHP,
                bAktif: true,
                DibuatOleh: userEmail,
                WaktuDiubah: new Date(),
                DiubahOleh: userEmail,
                WaktuDibuat: new Date()
            }
        });
        return NextResponse.json({message: "User berhasil ditambahkan", redirectUrl: "/dashboard/master/user"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Terjadi kesalahan"}, {status: 500});
    }
}