import authConfig from "./app/(auth)/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export default auth((req)=>{
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const profilePg = [
        "/"
    ]
    const AuthPg = [
        "/login",
        "/register"
    ]

    // const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isProfileRoute = profilePg.includes(nextUrl.pathname)
    const isAuthPage = AuthPg.includes(nextUrl.pathname)

    if(isProfileRoute){
        if(!isLoggedIn){
            return Response.redirect(new URL("/register", nextUrl))
        }
    }

    if(isAuthPage){
        if(isLoggedIn){
            return Response.redirect(new URL("/", nextUrl))
        }
    }
})

export const config = {
    matcher: [
        "/login",
        "/register",
        "/"
    ]
}