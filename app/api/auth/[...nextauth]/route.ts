import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials'
import {prisma} from '@/prisma/prisma'
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                //fetch user email
                const user = await prisma.msUser.findUnique({
                    where: { Email: credentials?.email }
                });

                if (!user || !credentials) {
                    throw new Error("User tidak ditemukan atau kredensial tidak valid");
                }

                //validate password
                const validPassword = await compare(credentials.password, user.Password);
                if (!validPassword) {
                    throw new Error("Password tidak valid");
                }

                return {
                    id: user.UserID,
                    email: user.Email,
                    name: `${user.NamaDepan} ${user.NamaBelakang}`,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({session, token}) {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
