import { SubmissionRecord } from '@/types/domain';

const now = new Date().toISOString();

export const mockSubmissions: SubmissionRecord[] = [
  {
    startup: { id: 's1', name: 'HelioGrid', website: 'https://heliogrid.ai', hq_country: 'US', created_at: now },
    founder: { id: 'f1', startup_id: 's1', name: 'Maya Chen', email: 'maya@heliogrid.ai' },
    submission: { id: 'sub1', startup_id: 's1', founder_id: 'f1', status: 'needs_followup', stage: 'Seed', raise_amount_usd: 2500000, created_at: now },
    files: [{ id: 'file1', submission_id: 'sub1', type: 'deck', file_path: 'decks/heliogrid.pdf', uploaded_at: now }],
    extraction: {
      company: { name: 'HelioGrid', website: 'https://heliogrid.ai', hq_country: 'US', founded_year: 2023, sector: 'Climate', subsector: 'Grid analytics' },
      fundraise: { stage: 'Seed', round_target_usd: 2500000, instrument: 'SAFE', use_of_funds: 'Sales + engineering hiring' },
      team: { founders: ['Maya Chen', 'Luis Romero'], team_size: 8 },
      product: { summary: 'AI forecasting for distributed energy resources.', customer_type: 'Utilities', problem: 'Grid congestion and volatility', solution: 'Predictive load balancing platform' },
      traction: { revenue_usd: 120000, mrr_usd: 10000, growth_rate_pct: 18, users: null, customers: 4, as_of_date: '' },
      market: { tam_claim: '$18B TAM in grid software', geography: 'North America', competitors: ['AutoGrid', 'Uplight'] },
      documents: { deck_present: true, financials_present: false, cap_table_present: false, data_room_present: false },
      quality: { completeness_score: 0, consistency_score: 0, confidence_score: 0 }
    },
    qaFlags: [{ id: 'q1', type: 'missing', severity: 'medium', message: 'Traction date missing for stated revenue metrics.', fieldPath: 'traction.as_of_date' }],
    followups: [{ id: 'fu1', question: 'Please provide the as-of date for the traction metrics in your deck.', reason: 'Traction data lacks temporal context.', answered: false }],
    investorSummary: 'HelioGrid is a climate software startup targeting utility load forecasting with early pilot revenue.'
  },
  {
    startup: { id: 's2', name: 'CarePulse', website: 'https://carepulse.health', hq_country: 'UK', created_at: now },
    founder: { id: 'f2', startup_id: 's2', name: 'Aisha Khan', email: 'aisha@carepulse.health' },
    submission: { id: 'sub2', startup_id: 's2', founder_id: 'f2', status: 'ready_for_review', stage: 'Pre-Seed', raise_amount_usd: 1000000, created_at: now },
    files: [{ id: 'file2', submission_id: 'sub2', type: 'deck', file_path: 'decks/carepulse.pdf', uploaded_at: now }, { id: 'file3', submission_id: 'sub2', type: 'financials', file_path: 'financials/carepulse.xlsx', uploaded_at: now }],
    extraction: {
      company: { name: 'CarePulse', website: 'https://carepulse.health', hq_country: 'UK', founded_year: 2022, sector: 'HealthTech', subsector: 'Remote diagnostics' },
      fundraise: { stage: 'Pre-Seed', round_target_usd: 1000000, instrument: 'Equity', use_of_funds: 'Regulatory and GTM' },
      team: { founders: ['Aisha Khan'], team_size: 6 },
      product: { summary: 'Remote triage AI copilot for primary clinics.', customer_type: 'Clinics', problem: 'Long patient wait times', solution: 'Automated pre-consult triage' },
      traction: { revenue_usd: 80000, mrr_usd: 7000, growth_rate_pct: 11, users: 3500, customers: 12, as_of_date: '2024-11-30' },
      market: { tam_claim: '$9B digital triage market', geography: 'UK + EU', competitors: ['Babylon', 'Ada'] },
      documents: { deck_present: true, financials_present: true, cap_table_present: false, data_room_present: false },
      quality: { completeness_score: 0, consistency_score: 0, confidence_score: 0 }
    },
    qaFlags: [],
    followups: [],
    investorSummary: 'CarePulse serves clinics with AI triage and has active pilots with measurable user growth.'
  }
];
