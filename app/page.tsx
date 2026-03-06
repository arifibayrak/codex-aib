import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Discovery workflow for venture dealflow</h1>
      <p className="text-slate-600">
        Intake startup submissions, run structured extraction, QA checks, and investor-facing review.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Founder Portal</h2>
          <p className="text-sm text-slate-600">Submit company info, upload docs, and answer follow-up questions.</p>
          <Link href="/founder/new"><Button>Start new submission</Button></Link>
        </Card>
        <Card className="space-y-3 p-6">
          <h2 className="text-xl font-semibold">Investor Dashboard</h2>
          <p className="text-sm text-slate-600">Review summaries, QA flags, evidence, and missing items.</p>
          <Link href="/investor/submissions"><Button variant="secondary">Open investor view</Button></Link>
        </Card>
      </div>
    </div>
  );
}
