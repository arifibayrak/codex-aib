import Link from 'next/link';
import { Card } from '@/components/ui/card';

async function getSubmissions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/investor/submissions`, { cache: 'no-store' });
  const data = await res.json();
  return data.submissions ?? [];
}

export default async function InvestorSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Investor submissions</h1>
      <div className="grid gap-3">
        {submissions.map((record: any) => (
          <Card key={record.submission.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{record.startup.name}</p>
              <p className="text-sm text-slate-600">{record.submission.stage} · ${record.submission.raise_amount_usd.toLocaleString()}</p>
            </div>
            <Link className="text-blue-700 underline" href={`/investor/submissions/${record.submission.id}`}>Review</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
