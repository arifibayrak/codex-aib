import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'VC Discovery Agent',
  description: 'Discovery-stage startup intake and investor review dashboard.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="font-semibold text-blue-700">VC Discovery Agent</Link>
            <nav className="flex gap-4 text-sm text-slate-600">
              <Link href="/founder/new">Founder</Link>
              <Link href="/investor/submissions">Investor</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
