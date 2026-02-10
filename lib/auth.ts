import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { Adapter } from "next-auth/adapters";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt", // Credentials provider requires JWT
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) return null;

                // ensure college exists
                // if (!user.collegeId) return null;

                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    collegeId: user.collegeId,
                };
            }
        })
    ],

    // secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.collegeId = user.collegeId;
            }
            return token;
        },
        // Now this callback works perfectly because we are using Database sessions
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as "STUDENT" | "RECRUITER" | "ADMIN";
                session.user.collegeId = token.collegeId as string;
            }
            return session;
        },
    },
};
