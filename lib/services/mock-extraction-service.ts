import { ExtractionService, ExtractionResult } from '@/lib/services/interfaces';
import { SubmissionRecord } from '@/types/domain';

export class MockExtractionService implements ExtractionService {
  async extractFromSubmission(record: SubmissionRecord): Promise<ExtractionResult> {
    // TODO: replace with model-backed parsing + citation extraction.
    const extraction = {
      ...record.extraction,
      company: { ...record.extraction.company, name: record.startup.name, website: record.startup.website },
      documents: {
        ...record.extraction.documents,
        deck_present: record.files.some((f) => f.type === 'deck'),
        financials_present: record.files.some((f) => f.type === 'financials')
      }
    };

    return {
      extraction,
      confidences: {
        'company.name': 0.96,
        'company.website': 0.98,
        'fundraise.round_target_usd': 0.87,
        'traction.revenue_usd': 0.75
      },
      evidence: {
        'company.name': ['deck:slide1:title'],
        'fundraise.round_target_usd': ['deck:slide9:fundraising'],
        'traction.revenue_usd': ['deck:slide12:traction']
      }
    };
  }
}
