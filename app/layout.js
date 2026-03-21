import './globals.css'

export const metadata = {
	title: 'Todo Test',
	description: 'Simple todo app with Supabase',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
