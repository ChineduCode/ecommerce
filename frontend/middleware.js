export { default } from 'next-auth/middleware'

export const config = { 
    matcher: [
        '/dashboard/:path*', 
        '/admin/:path*', 
        '/checkout/:path*',
        '/shipping-address/:path*',
        '/profile/:path*'
    ]
}
