import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          const userBuffer = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const user = await userBuffer.json();

          if (user.logedIn) {
            // console.log("From Authorize Function: ", user);
            return user;
          } else {
            throw new Error("Invalid Credential!");
          }
        } catch (err) {
          throw new Error("Invalid Credential!");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial login: attach tokens
      if (user) {
        if (account.provider === "credentials") {
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            accessTokenExpires: Date.now() + 1 * 60 * 60 * 1000,
            user: user.user,
            provider: "credentials",
          };
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        console.log("token valid");
        return token;
      }

      if (token.provider === "credentials") {
        console.log("token invalid");
        // return await refreshAccessTokenForCredentials(token);
        return null;
      }
    },

    async session({ session, token }) {
      // Attach access token to the session
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.provider = token.provider;
      session.user = {
        name: token.user?.name,
        username: token.user?.username,
        email: token.user?.email,
        showcase: token.user?.showcase,
      };

      return session;
    },
  },
});
