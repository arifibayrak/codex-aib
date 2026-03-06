import { SubmissionRecord } from '@/types/domain';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SummaryCard({ record }: { record: SubmissionRecord }) {
  const q = record.extraction.quality;
  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{record.startup.name}</h3>
        <Badge>{record.submission.status}</Badge>
      </div>
      <p className="text-sm text-slate-600">{record.investorSummary || 'Summary pending.'}</p>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>Completeness: <strong>{q.completeness_score}</strong></div>
        <div>Consistency: <strong>{q.consistency_score}</strong></div>
        <div>Confidence: <strong>{q.confidence_score}</strong></div>
      </div>
    </Card>
  );
}
