import { Extraction, FollowupQuestion, QAFlag } from '@/lib/schemas/extraction';
import { SubmissionRecord } from '@/types/domain';

export type ExtractionResult = {
  extraction: Extraction;
  confidences: Record<string, number>;
  evidence: Record<string, string[]>;
};

export interface ExtractionService {
  extractFromSubmission(record: SubmissionRecord): Promise<ExtractionResult>;
}

export interface ValidationService {
  run(record: SubmissionRecord, extractionResult: ExtractionResult): Promise<{ flags: QAFlag[]; extraction: Extraction }>;
}

export interface FollowupService {
  generate(record: SubmissionRecord, flags: QAFlag[]): Promise<FollowupQuestion[]>;
}

export interface SummaryService {
  summarize(record: SubmissionRecord): Promise<string>;
}
