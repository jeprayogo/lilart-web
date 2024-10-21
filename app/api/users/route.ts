import { getServerSession } from "next-auth";
import prisma from "@/prisma/prisma";
import {NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect("api/auth/signin");
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    const user = searchParams.get('user') ? JSON.parse(searchParams.get('user') as string) : null;

    try {
        const users = await prisma.msUser.findMany({
            skip: offset,
            take: limit,
            select: {
                UserID: true,
                Email: true,
                Password: true,
                NamaDepan: true,
                NamaBelakang: true,
                NoHP: true,
                bAktif: true,
                DibuatOleh: true,
                WaktuDibuat: true,
                DiubahOleh: true,
                WaktuDiubah: true,
            },
        });

        const userData = users.map((user) => ({
            userId: user.UserID,
            email: user.Email,
            password: user.Password,
            name: `${user.NamaDepan} ${user.NamaBelakang}`, // Combine NamaDepan and NamaBelakang
            noHP: user.NoHP,
            isActive: user.bAktif ? 'Ya' : 'Tidak',
            createdBy: user.DibuatOleh,
            createdAt: user.WaktuDibuat,
            updatedBy: user.DiubahOleh,
            updatedAt: user.WaktuDiubah
        }));

        if (!users) {
            return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
        }
    
        const totalUser = await prisma.msUser.count();
    
        return NextResponse.json({
            data: userData,
            total: totalUser,
            page,
            pageCount: Math.ceil(totalUser / limit),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal fetching data user' }, { status: 500 });
    }
}