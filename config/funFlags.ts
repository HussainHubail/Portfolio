// Fun feature flags - toggle any whimsical effect without breaking core functionality
export const funFlags = {
  // Master switch - turns off ALL fun features at once
  masterToggle: true,
  
  // Individual feature flags
  sparkleTrail: true,
  rubberDuck: true,
  easterEggs: true,
  gravityToggle: true,
  moodRing: true,
  retroCRT: false, // Off by default to preserve readability
  tinyPet: true,
  screenshotShake: true,
  complimentGenerator: true,
  portalTransitions: true,
};

// Helper to check if a fun feature is enabled
export function isFunEnabled(feature: keyof typeof funFlags): boolean {
  if (feature === 'masterToggle') return funFlags.masterToggle;
  return funFlags.masterToggle && funFlags[feature];
}
