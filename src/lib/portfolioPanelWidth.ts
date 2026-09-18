// Maps viewport height -> portfolio project panel width via piecewise-linear
// interpolation between explicit anchor points. Width is also clamped to the
// available viewport width so wide-but-short windows can't overflow.

const ANCHORS: ReadonlyArray<readonly [number, number]> = [
  [600, 680],
  [720, 900],
  [900, 1150],
  [1080, 1280],
  [1440, 1550],
  [1800, 1700],
  [2160, 1830],
  [2400, 1920],
];

const HARD_CAP = 2000;
const WIDTH_PADDING = 80;
const SHORT_VIEWPORT_THRESHOLD = 760;

export function computePanelWidth(height: number, width: number): number {
  let raw: number;

  if (height <= ANCHORS[0][0]) {
    raw = ANCHORS[0][1];
  } else if (height >= ANCHORS[ANCHORS.length - 1][0]) {
    // Linear extrapolation from the last segment
    const [h0, w0] = ANCHORS[ANCHORS.length - 2];
    const [h1, w1] = ANCHORS[ANCHORS.length - 1];
    const slope = (w1 - w0) / (h1 - h0);
    raw = w1 + slope * (height - h1);
  } else {
    raw = ANCHORS[0][1];
    for (let i = 0; i < ANCHORS.length - 1; i++) {
      const [h0, w0] = ANCHORS[i];
      const [h1, w1] = ANCHORS[i + 1];
      if (height >= h0 && height <= h1) {
        const t = (height - h0) / (h1 - h0);
        raw = w0 + (w1 - w0) * t;
        break;
      }
    }
  }

  const capped = Math.min(raw, HARD_CAP);
  const widthClamped = Math.min(capped, Math.max(0, width - WIDTH_PADDING));
  return Math.round(widthClamped);
}

export function isShortViewport(height: number): boolean {
  return height < SHORT_VIEWPORT_THRESHOLD;
}
