import CredentialsProvider from 'next-auth/providers/credentials';
import models from "@/lib/models";
import { NextResponse } from 'next/server';
const User = models.User;

export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials) {

              try {
                console.log("credentials:", credentials);

                // //check this credentials exist in the db or not and send null if not and send user details in session if exists
                const exists = await User.findOne({email: credentials.email});
                console.log("exists: ", exists);

                if(!exists) {
                  return NextResponse.json({message: "User does not exists", status: 411})
                }

                return {
                    id: exists._id,
                    email: credentials.email,
                    firstname: credentials.firstname,
                    lastname: credentials.lastname
                };
              } catch (error) {
                console.log("error in login: ", error);
                return {
                  id: exists._id,
                  email: credentials.email,
                  firstname: credentials.firstname,
                  lastname: credentials.lastname
                };
              }
              
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }) => {
        if (user) {
            token.uid = user.id;
            token.firstname = user.firstname,
            token.lastname = user.lastname
        }
        return token;
        },
      session: ({ session, token, user }) => {
          if (session.user) {
              session.user.id = token.uid,
              session.firstname = token.firstname,
              session.lastname = token.lastname
          }
          return session
      }
    },
    pages: {
        signIn: "/login",
        // signUp: "/signup",
    }
  }