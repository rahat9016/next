import { NextRequest, NextResponse } from "next/server";
import { PROTECTED_ROUTES } from "./lib/routes";
import { links } from "./components/ui/sideNavbar/DashboardSidebar";

export const PUBLIC_ROUTES = ["/login", "/register"];

export const middleware = (request: NextRequest) => {
    const { cookies, nextUrl } = request;
    // const isPublicRoute = PUBLIC_ROUTES.find((route) =>
    //     nextUrl.pathname.startsWith(route)
    // );
    
    // Checking -> token has in cookie and token is valid or not
    const tokenValue = cookies.get("token")?.value;
    const user = tokenValue ? JSON.parse(tokenValue) : null;
    
    if (!user) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    try {
        const allowedRoutes =
            user?.role === "SUPER_ADMIN" ? PROTECTED_ROUTES : user?.routes;

        const requestedRoute = nextUrl.pathname;
        // Check if requested route is allowed
        if (!!user && !allowedRoutes.includes(requestedRoute)) {
            console.log("checking");
            return NextResponse.redirect(new URL("/", nextUrl));
        }

        return NextResponse.next();
    } catch (err) {
        console.error("Error", err);
        return NextResponse.redirect(new URL("/login", nextUrl));
    }
};

export const config = {
    matcher: ["/dashboard/:path*", "/user/:path*", "/category/:path*", "/subcategory/:path*"],
};
