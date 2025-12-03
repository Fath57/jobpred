import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Définir les routes qui nécessitent une authentification
const protectedRoutes = ['/onboarding', '/dashboard']
// Définir les routes publiques
const publicRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const path = request.nextUrl.pathname

  // Si l'utilisateur est sur une route protégée et n'est pas authentifié
  if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à une route publique
  if (publicRoutes.includes(path) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
