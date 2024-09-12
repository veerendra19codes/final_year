import CredentialsProvider from 'next-auth/providers/credentials';

export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials) {
                console.log("credentials:", credentials);

                //check this credentials exist in the db or not and send null if not and send user details in session if exists
              return {
                  id: "user1",
                  name: credentials.email,
                  userId: "asd",
                  email: credentials.email,
              };
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }) => {
        if (user) {
            token.uid = user.id;
        }
        return token;
        },
      session: ({ session, token, user }) => {
          if (session.user) {
              session.user.id = token.uid
          }
          return session
      }
    },
    pages: {
        signIn: "/login",
    }
  }