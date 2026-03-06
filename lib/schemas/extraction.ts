import { z } from 'zod';

export const extractionSchema = z.object({
  company: z.object({
    name: z.string().default(''),
    website: z.string().default(''),
    hq_country: z.string().default(''),
    founded_year: z.number().nullable().default(null),
    sector: z.string().default(''),
    subsector: z.string().default('')
  }),
  fundraise: z.object({
    stage: z.string().default(''),
    round_target_usd: z.number().nullable().default(null),
    instrument: z.string().default(''),
    use_of_funds: z.string().default('')
  }),
  team: z.object({
    founders: z.array(z.string()).default([]),
    team_size: z.number().nullable().default(null)
  }),
  product: z.object({
    summary: z.string().default(''),
    customer_type: z.string().default(''),
    problem: z.string().default(''),
    solution: z.string().default('')
  }),
  traction: z.object({
    revenue_usd: z.number().nullable().default(null),
    mrr_usd: z.number().nullable().default(null),
    growth_rate_pct: z.number().nullable().default(null),
    users: z.number().nullable().default(null),
    customers: z.number().nullable().default(null),
    as_of_date: z.string().default('')
  }),
  market: z.object({
    tam_claim: z.string().default(''),
    geography: z.string().default(''),
    competitors: z.array(z.string()).default([])
  }),
  documents: z.object({
    deck_present: z.boolean().default(false),
    financials_present: z.boolean().default(false),
    cap_table_present: z.boolean().default(false),
    data_room_present: z.boolean().default(false)
  }),
  quality: z.object({
    completeness_score: z.number().min(0).max(100).default(0),
    consistency_score: z.number().min(0).max(100).default(0),
    confidence_score: z.number().min(0).max(100).default(0)
  })
});

export type Extraction = z.infer<typeof extractionSchema>;

export const submissionInputSchema = z.object({
  startupName: z.string().min(1),
  website: z.string().url(),
  founderName: z.string().min(1),
  founderEmail: z.string().email(),
  stage: z.string().min(1),
  raiseAmountUsd: z.number().positive(),
  notes: z.string().optional().default('')
});

export const qaFlagSchema = z.object({
  id: z.string(),
  type: z.enum(['missing', 'conflict', 'stale', 'invalid_url']),
  severity: z.enum(['low', 'medium', 'high']),
  message: z.string(),
  fieldPath: z.string()
});

export type QAFlag = z.infer<typeof qaFlagSchema>;

export const followupQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  reason: z.string(),
  answered: z.boolean().default(false),
  answer: z.string().optional()
});

export type FollowupQuestion = z.infer<typeof followupQuestionSchema>;
