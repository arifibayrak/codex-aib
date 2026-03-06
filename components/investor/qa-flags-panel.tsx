import { SubmissionRecord } from '@/types/domain';
import { Card } from '@/components/ui/card';

export function QAFlagsPanel({ record }: { record: SubmissionRecord }) {
  return (
    <Card className="p-5">
      <h4 className="mb-2 font-semibold">QA flags</h4>
      <ul className="space-y-2 text-sm">
        {record.qaFlags.length ? record.qaFlags.map((flag) => (
          <li key={flag.id} className="rounded border p-2">
            <p className="font-medium">[{flag.severity}] {flag.message}</p>
            <p className="text-slate-500">{flag.fieldPath}</p>
          </li>
        )) : <li>No QA flags.</li>}
      </ul>
    </Card>
  );
}
