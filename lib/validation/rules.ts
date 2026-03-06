import { Extraction, QAFlag } from '@/lib/schemas/extraction';
import { SubmissionRecord } from '@/types/domain';

export function detectMissingFields(record: SubmissionRecord, extraction: Extraction): QAFlag[] {
  const flags: QAFlag[] = [];

  if (!record.files.some((f) => f.type === 'deck')) {
    flags.push(makeFlag('missing', 'high', 'Pitch deck is required.', 'documents.deck_present'));
  }
  if (!record.startup.website) {
    flags.push(makeFlag('missing', 'high', 'Website URL is required.', 'company.website'));
  }
  if (!record.founder.email) {
    flags.push(makeFlag('missing', 'high', 'Founder email is required.', 'founder.email'));
  }
  if (!record.submission.raise_amount_usd) {
    flags.push(makeFlag('missing', 'high', 'Raise amount is required.', 'fundraise.round_target_usd'));
  }
  if (!record.submission.stage) {
    flags.push(makeFlag('missing', 'high', 'Fundraise stage is required.', 'fundraise.stage'));
  }

  const hasTraction = [extraction.traction.revenue_usd, extraction.traction.mrr_usd, extraction.traction.users, extraction.traction.customers].some((v) => v !== null);
  if (hasTraction && !extraction.traction.as_of_date) {
    flags.push(makeFlag('missing', 'medium', 'Traction exists but as_of_date is missing.', 'traction.as_of_date'));
  }

  return flags;
}

export function detectContradictions(record: SubmissionRecord, extraction: Extraction): QAFlag[] {
  const flags: QAFlag[] = [];
  if (
    extraction.company.name &&
    record.startup.name &&
    extraction.company.name.toLowerCase() !== record.startup.name.toLowerCase()
  ) {
    flags.push(makeFlag('conflict', 'high', 'Company name in form does not match extracted document name.', 'company.name'));
  }
  return flags;
}

export function detectUrlIssues(record: SubmissionRecord, extraction: Extraction): QAFlag[] {
  const value = extraction.company.website || record.startup.website;
  if (!value) return [makeFlag('invalid_url', 'high', 'Missing website URL.', 'company.website')];
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return [makeFlag('invalid_url', 'high', 'Website URL must be HTTP/HTTPS.', 'company.website')];
    }
    return [];
  } catch {
    return [makeFlag('invalid_url', 'high', 'Website URL appears invalid or broken.', 'company.website')];
  }
}

export function detectStaleDeck(record: SubmissionRecord): QAFlag[] {
  const deck = record.files.find((f) => f.type === 'deck');
  if (!deck) return [];
  const uploadedAt = new Date(deck.uploaded_at).getTime();
  const threshold = Date.now() - 1000 * 60 * 60 * 24 * 365;
  return uploadedAt < threshold
    ? [makeFlag('stale', 'low', 'Pitch deck may be stale (>12 months old).', 'documents.deck_present')]
    : [];
}

function makeFlag(type: QAFlag['type'], severity: QAFlag['severity'], message: string, fieldPath: string): QAFlag {
  return { id: crypto.randomUUID(), type, severity, message, fieldPath };
}
