import './globals.css';

export const metadata = {
  title: 'Dua & Ruqyah',
  description: 'Islamic Dua and Ruqyah Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-amber-100">
        {children}
      </body>
    </html>
  );
}
