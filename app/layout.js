import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
})

export const metadata = {
	title: 'Todo Test',
	description: 'Simple todo app with Supabase',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={manrope.variable}>
			<body>{children}</body>
		</html>
	)
}
