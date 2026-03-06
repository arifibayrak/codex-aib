import { Extraction, QAFlag } from '@/lib/schemas/extraction';

export function calculateCompleteness(extraction: Extraction): number {
  const checks = [
    Boolean(extraction.company.website),
    Boolean(extraction.company.name),
    Boolean(extraction.fundraise.stage),
    Boolean(extraction.fundraise.round_target_usd),
    extraction.documents.deck_present,
    !hasTractionWithoutDate(extraction)
  ];
  const score = (checks.filter(Boolean).length / checks.length) * 100;
  return Math.round(score);
}

function hasTractionWithoutDate(extraction: Extraction): boolean {
  const hasTraction =
    extraction.traction.revenue_usd !== null ||
    extraction.traction.mrr_usd !== null ||
    extraction.traction.users !== null ||
    extraction.traction.customers !== null;
  return hasTraction && !extraction.traction.as_of_date;
}

export function calculateConsistency(flags: QAFlag[]): number {
  const conflictPenalty = flags.filter((f) => f.type === 'conflict').length * 20;
  const stalePenalty = flags.filter((f) => f.type === 'stale').length * 10;
  const invalidUrlPenalty = flags.filter((f) => f.type === 'invalid_url').length * 15;
  return Math.max(0, 100 - conflictPenalty - stalePenalty - invalidUrlPenalty);
}

export function calculateConfidence(confidences: Record<string, number>): number {
  const values = Object.values(confidences);
  if (!values.length) return 0;
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100);
}
