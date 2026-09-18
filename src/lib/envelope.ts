function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

// Smooth attack/release envelope on normalized lifetime t ∈ [0, 1); 0 outside.
export function pulseEnvelope(t: number): number {
  if (t < 0 || t >= 1) return 0;
  const attack = smoothstep(0, 0.08, t);
  const release = 1 - smoothstep(0.5, 1.0, t);
  return attack * release;
}
