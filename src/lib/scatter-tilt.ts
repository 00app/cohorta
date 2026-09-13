// Per-card offset/rotation so grids read as scattered and hand-placed
// rather than a rigid row — the "breaking the grid" look used across
// several pages. Each page keeps its own list of Tailwind classes (the
// rotation/offset values genuinely differ per layout); this just picks
// one by index, cycling if there are more cards than entries in the list.
//
// Plain module, not part of components/ui.tsx: that file is "use client",
// and every one of its exports becomes a client-component reference as a
// result — a Server Component page can render a client component from
// there, but can't call a plain function export directly during render.
// This one has no React/browser dependency at all, so it doesn't need to
// be client-side to begin with.
export function scatterTilt(offsets: readonly string[], index: number): string {
  return offsets[index % offsets.length];
}
