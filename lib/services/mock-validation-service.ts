import { extractionSchema, QAFlag } from '@/lib/schemas/extraction';
import { ExtractionResult, ValidationService } from '@/lib/services/interfaces';
import { SubmissionRecord } from '@/types/domain';
import { calculateCompleteness, calculateConfidence, calculateConsistency } from '@/lib/validation/scoring';
import { detectContradictions, detectMissingFields, detectUrlIssues, detectStaleDeck } from '@/lib/validation/rules';

export class MockValidationService implements ValidationService {
  async run(record: SubmissionRecord, extractionResult: ExtractionResult): Promise<{ flags: QAFlag[]; extraction: typeof record.extraction }> {
    const flags: QAFlag[] = [
      ...detectMissingFields(record, extractionResult.extraction),
      ...detectContradictions(record, extractionResult.extraction),
      ...detectUrlIssues(record, extractionResult.extraction),
      ...detectStaleDeck(record)
    ];

    const nextExtraction = extractionSchema.parse({
      ...extractionResult.extraction,
      quality: {
        completeness_score: calculateCompleteness(extractionResult.extraction),
        consistency_score: calculateConsistency(flags),
        confidence_score: calculateConfidence(extractionResult.confidences)
      }
    });

    return { flags, extraction: nextExtraction };
  }
}
