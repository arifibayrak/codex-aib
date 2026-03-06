import { SubmissionRecord } from '@/types/domain';
import { Card } from '@/components/ui/card';

export function MissingItemsPanel({ record }: { record: SubmissionRecord }) {
  const missing = record.qaFlags.filter((f) => f.type === 'missing');
  return (
    <Card className="p-5">
      <h4 className="mb-2 font-semibold">Missing items</h4>
      <ul className="space-y-2 text-sm text-slate-700">
        {missing.length ? missing.map((f) => <li key={f.id}>• {f.message}</li>) : <li>None.</li>}
      </ul>
    </Card>
  );
}
