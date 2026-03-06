import { SummaryService } from '@/lib/services/interfaces';
import { SubmissionRecord } from '@/types/domain';

export class MockSummaryService implements SummaryService {
  async summarize(record: SubmissionRecord): Promise<string> {
    // TODO: replace with structured summary prompt + rationale chain.
    return `${record.startup.name} is raising ${record.submission.raise_amount_usd.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    })} at ${record.submission.stage}. Sector: ${record.extraction.company.sector || 'TBD'}. ` +
      `Current QA score blend: C${record.extraction.quality.completeness_score}/K${record.extraction.quality.consistency_score}/F${record.extraction.quality.confidence_score}.`;
  }
}
