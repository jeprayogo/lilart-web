import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import {NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { hash } from "bcryptjs";



export async function GET(request: NextRequest, {params} : { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect("api/auth/signin");
    }

    try {
        const user = await prisma.msUser.findUnique({
            where: {
                UserID: params.id
            },
            select: {
                UserID: true,
                Email: true,
                NamaDepan: true,
                NamaBelakang: true,
                NoHP: true,
                bAktif: true,
            }
        });

        if (!user) {
            return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(user);
        
    } catch (error) {
        return NextResponse.json({ message: "Error saat mengambil data user" }, { status: 500 });
    }
};

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect("api/auth/signin");
    }

    const body = await request.json();
    const {NamaDepan, NamaBelakang, NoHP, Password, bAktif} = body;

    try {
        const userEmail = session.user?.email ?? 'system';
        const hashPassword = await hash(Password, 10);
        
        const user =  await prisma.msUser.update({
            where: {UserID:params.id},
            data:{
                NamaDepan: NamaDepan,
                NamaBelakang: NamaBelakang,
                NoHP: NoHP,
                bAktif: bAktif,
                Password: hashPassword,
                DiubahOleh: userEmail,
                WaktuDiubah: new Date(),
            }
        });

        const response = NextResponse.json({ message: "User berhasil diupdate" }, { status: 200 });
        return NextResponse.json(user, response);
    } catch (error) {
        return NextResponse.json({ message: "Error mengupdate user" }, { status: 500 });
    }
};

