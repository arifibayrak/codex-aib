import { submissionInputSchema } from '@/lib/schemas/extraction';
import { mockSubmissions } from '@/lib/db/mock-data';
import { SubmissionRecord } from '@/types/domain';

export class SubmissionRepository {
  private records: SubmissionRecord[] = mockSubmissions;

  list() {
    return this.records;
  }

  getById(id: string) {
    return this.records.find((r) => r.submission.id === id) || null;
  }

  create(input: unknown) {
    const parsed = submissionInputSchema.parse(input);
    const ts = new Date().toISOString();
    const id = crypto.randomUUID();
    const startupId = crypto.randomUUID();
    const founderId = crypto.randomUUID();

    const record: SubmissionRecord = {
      startup: { id: startupId, name: parsed.startupName, website: parsed.website, created_at: ts },
      founder: { id: founderId, startup_id: startupId, name: parsed.founderName, email: parsed.founderEmail },
      submission: {
        id,
        startup_id: startupId,
        founder_id: founderId,
        status: 'draft',
        stage: parsed.stage,
        raise_amount_usd: parsed.raiseAmountUsd,
        notes: parsed.notes,
        created_at: ts
      },
      files: [],
      extraction: {
        company: { name: parsed.startupName, website: parsed.website, hq_country: '', founded_year: null, sector: '', subsector: '' },
        fundraise: { stage: parsed.stage, round_target_usd: parsed.raiseAmountUsd, instrument: '', use_of_funds: '' },
        team: { founders: [parsed.founderName], team_size: null },
        product: { summary: '', customer_type: '', problem: '', solution: '' },
        traction: { revenue_usd: null, mrr_usd: null, growth_rate_pct: null, users: null, customers: null, as_of_date: '' },
        market: { tam_claim: '', geography: '', competitors: [] },
        documents: { deck_present: false, financials_present: false, cap_table_present: false, data_room_present: false },
        quality: { completeness_score: 0, consistency_score: 0, confidence_score: 0 }
      },
      qaFlags: [],
      followups: [],
      investorSummary: ''
    };

    this.records = [record, ...this.records];
    return record;
  }

  update(record: SubmissionRecord) {
    this.records = this.records.map((r) => (r.submission.id === record.submission.id ? record : r));
    return record;
  }
}

export const submissionRepository = new SubmissionRepository();
