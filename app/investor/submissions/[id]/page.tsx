import { SummaryCard } from '@/components/investor/summary-card';
import { MissingItemsPanel } from '@/components/investor/missing-items-panel';
import { QAFlagsPanel } from '@/components/investor/qa-flags-panel';
import { EvidencePanel } from '@/components/investor/evidence-panel';
import { formatEvidenceMap } from '@/lib/utils/evidence';
import { extractionService, summaryService } from '@/lib/services';
import { submissionRepository } from '@/lib/db/repository';

export default async function InvestorSubmissionDetailPage({ params }: { params: { id: string } }) {
  const record = submissionRepository.getById(params.id);
  if (!record) return <p>Submission not found.</p>;

  const extraction = await extractionService.extractFromSubmission(record);
  record.investorSummary = await summaryService.summarize(record);
  const evidence = formatEvidenceMap(extraction.evidence);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Submission review</h1>
      <SummaryCard record={record} />
      <div className="grid gap-4 md:grid-cols-3">
        <MissingItemsPanel record={record} />
        <QAFlagsPanel record={record} />
        <EvidencePanel evidence={evidence} />
      </div>
    </div>
  );
}
