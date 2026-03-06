import { Card } from '@/components/ui/card';

export function EvidencePanel({ evidence }: { evidence: Array<{ field: string; sources: string }> }) {
  return (
    <Card className="p-5">
      <h4 className="mb-2 font-semibold">Source evidence</h4>
      <ul className="space-y-2 text-sm">
        {evidence.length ? evidence.map((entry) => (
          <li key={entry.field}>
            <span className="font-medium">{entry.field}:</span> {entry.sources}
          </li>
        )) : <li>Evidence not generated yet.</li>}
      </ul>
    </Card>
  );
}
