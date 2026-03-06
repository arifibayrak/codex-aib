export function formatEvidenceMap(evidence: Record<string, string[]>) {
  return Object.entries(evidence).map(([field, sources]) => ({
    field,
    sources: sources.join(', ')
  }));
}
