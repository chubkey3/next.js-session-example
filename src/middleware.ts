import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    let session = request.cookies.get("session")

    if (session){
      return NextResponse.next()
    } else {
      console.log(request.url)
      return NextResponse.redirect(new URL('/login', request.url))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/protected',
}