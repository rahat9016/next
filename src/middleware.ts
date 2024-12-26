import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./lib/routes";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath: boolean = path === "/login" || path === "/register";

    const token = request.cookies.get("token")?.value;
    const user = token ? JSON.parse(token) : null;
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if (user) {
        const userRoutes = user?.routes || [];
        console.log({userRoutes})
        if (user.role === "SUPER_ADMIN") {
            console.log("Access SUPER_ADMIN gets all routes");
            if (!PROTECTED_ROUTES.some((route) => path.startsWith(route))) {
                return NextResponse.redirect(
                    new URL(PROTECTED_ROUTES[0], request.nextUrl)
                );
            }
        } else {
            if (userRoutes.length === 0 && path !== "/") {
                // Routes is empty so redirect to root
                console.log('routes is empty so redirect to root')
                return NextResponse.redirect(new URL("/", request.nextUrl));
            }
            if (userRoutes.length > 0 && !userRoutes.some((route: string) => path.startsWith(route))) {
                // Access the allowed routes
                console.log("Access in ADMIN");
                return NextResponse.redirect(
                    new URL(userRoutes[0], request.nextUrl)
                );
            }
        }
    }
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/dashboard/:path*",
        "/",
        "/user",
        "/role",
    ],
};
