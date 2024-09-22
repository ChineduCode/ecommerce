export { default } from 'next-auth/middleware'

export const config = { 
    matcher: [
        '/admin/:path*', 
        '/checkout/:path*',
        '/shipping-address/:path*',
        '/profile/:path*',
        '/cart'
    ]
}
