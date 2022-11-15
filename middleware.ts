import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const jwtAccessToken: any = request.cookies.get("accessToken");
  const jwtRefreshToken: any = request.cookies.get("refreshToken");
  if (!jwtAccessToken && !jwtRefreshToken) {
    console.log("No Token");
  }
  try {
    const jwtAccess = await jwtVerify(
      jwtAccessToken?.value,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );
    request?.headers.set("Author", "sdfgukgdf");
    console.log(request?.headers);

    console.log("response");
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    response.headers.set("authorization", `Bearer ${jwtAccessToken?.value}`);
    console.log(response);
    // Set a new response header `x-hello-from-middleware2`
    return NextResponse.next();
    //
    //
    //
    //
    //
    //
    //
    //
    //
  } catch (error: any) {
    if (error.name === "JWTExpired") {
      try {
        const jwtRefresh = await jwtVerify(
          jwtRefreshToken?.value,
          new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)
        );
        console.log({ jwtRefresh });
        await fetch("http://127.0.0.1:5000/auth/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: jwtRefreshToken?.value,
          }),
        })
          .then((res: any) => res.json())
          .then((ans: any) => {
            console.log("agfuiadgiaug", ans);
          })
          .catch((err: any) => console.log("err"));
      } catch (err: any) {
        if (err.name === "JWTExpired") {
          console.log("Refresh token has expired");
          // await fetch("http://127.0.0.1:5000/auth/refresh-token", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //     // 'Content-Type': 'application/x-www-form-urlencoded',
          //   },
          //   body: JSON.stringify({
          //     refreshToken: process.env.REFRESH_TOKEN_SECRET,
          //   }),
          // })
          //   .then((res: any) => res.json())
          //   .then((ans: any) => console.log(ans))
          //   .catch((err: any) => console.log("err"));
        }
      }
    }
  }
  // );
}
export const config = {
  matcher: ["/"],
};
