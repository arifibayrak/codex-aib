import { Extraction, FollowupQuestion, QAFlag } from '@/lib/schemas/extraction';

export type Startup = {
  id: string;
  name: string;
  website: string;
  hq_country?: string;
  created_at: string;
};

export type Founder = {
  id: string;
  startup_id: string;
  name: string;
  email: string;
};

export type Submission = {
  id: string;
  startup_id: string;
  founder_id: string;
  status: 'draft' | 'uploaded' | 'processing' | 'needs_followup' | 'ready_for_review';
  stage: string;
  raise_amount_usd: number;
  notes?: string;
  created_at: string;
};

export type SubmissionFile = {
  id: string;
  submission_id: string;
  type: 'deck' | 'financials' | 'cap_table' | 'other';
  file_path: string;
  uploaded_at: string;
};

export type SubmissionRecord = {
  startup: Startup;
  founder: Founder;
  submission: Submission;
  files: SubmissionFile[];
  extraction: Extraction;
  qaFlags: QAFlag[];
  followups: FollowupQuestion[];
  investorSummary: string;
};
