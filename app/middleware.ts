import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { error } from 'console';

const SECRET_KEY = process.env.JWT_SECRET || "kpIX+FG5sD6ehvImT2AaJDAK9+dko/7dFjhujOgXig6WpALzdo8Uh3nuHVsjW4wAL6ZW5V1BFmvcevnXuRG5yA==";

export function middleware(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Akses tidak valid' }, { status: 401 });
    }

    try {
        jwt.verify(token, SECRET_KEY);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
    }
}

export const config = {
    matcher: [
        '/api/user/:path*',
        '/api/portfolio/:path*',
    ],
}
