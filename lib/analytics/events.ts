export function trackEvent(name: string, payload: Record<string, unknown>) {
  // TODO: wire to PostHog/Segment or data warehouse.
  console.info(`[analytics] ${name}`, payload);
}
