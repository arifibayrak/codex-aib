import { FollowupService } from '@/lib/services/interfaces';
import { FollowupQuestion, QAFlag } from '@/lib/schemas/extraction';
import { SubmissionRecord } from '@/types/domain';

export class MockFollowupService implements FollowupService {
  async generate(_record: SubmissionRecord, flags: QAFlag[]): Promise<FollowupQuestion[]> {
    // TODO: replace with LLM-generated, personalized follow-up drafting.
    return flags.map((flag) => ({
      id: crypto.randomUUID(),
      question: `Please clarify: ${flag.message}`,
      reason: `QA flag (${flag.type}) on ${flag.fieldPath}`,
      answered: false
    }));
  }
}
