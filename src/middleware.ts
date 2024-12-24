import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./lib/routes";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath:boolean = path === "/login" || path === "/register";

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
        if (user.role === "SUPER_ADMIN") {
            console.log("Access in SUPER_ADMIN");
            if (!PROTECTED_ROUTES.some((route) => path.startsWith(route))) {
                return NextResponse.redirect(
                    new URL(PROTECTED_ROUTES[0], request.nextUrl)
                );
            }
        } else {
            if (userRoutes.length <= 0)
                return NextResponse.redirect(new URL("/", request.nextUrl));
            else if (
                !userRoutes.some((route: string) => path.startsWith(route))
            ) {
                console.log("Access in ADMIN");
                return NextResponse.redirect(
                    new URL(userRoutes[0] || "/", request.nextUrl)
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
        "/role"
    ],
};
