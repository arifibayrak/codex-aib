import { MockExtractionService } from '@/lib/services/mock-extraction-service';
import { MockFollowupService } from '@/lib/services/mock-followup-service';
import { MockSummaryService } from '@/lib/services/mock-summary-service';
import { MockValidationService } from '@/lib/services/mock-validation-service';

export const extractionService = new MockExtractionService();
export const validationService = new MockValidationService();
export const followupService = new MockFollowupService();
export const summaryService = new MockSummaryService();
