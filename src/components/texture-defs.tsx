// Global, shared SVG <pattern> defs for the "ink & blush" illustration
// style — mounted once in layout.tsx (a hidden 0x0 <svg>, same trick
// GrainOverlay and LinocutIllustration's own filters use to avoid paying
// for anything visible) so every icon and the hero illustration can
// reference the same pattern ids instead of each carrying its own copy
// of the same <image> tiles.
//
// Two scales of the same two PNGs (public/textures/crosshatch.png,
// crosshatch-light.png): the "-sm" variants exist because the base
// 64x64-unit tile was sized for the hero illustration's 824x1464 viewBox
// — dropped straight into a 24x24 icon viewBox, a single tile repeat
// would dwarf the entire icon and just look like a flat colour, not a
// texture. The tile geometry is identical, just declared at icon scale.
export function TextureDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <pattern id="lc-hatch-dark" width="64" height="64" patternUnits="userSpaceOnUse">
          <image href="/textures/crosshatch.png" width="64" height="64" />
        </pattern>
        <pattern id="lc-hatch-light" width="64" height="64" patternUnits="userSpaceOnUse">
          <image href="/textures/crosshatch-light.png" width="64" height="64" />
        </pattern>
        <pattern id="lc-hatch-dark-sm" width="5" height="5" patternUnits="userSpaceOnUse">
          <image href="/textures/crosshatch.png" width="5" height="5" />
        </pattern>
        <pattern id="lc-hatch-light-sm" width="5" height="5" patternUnits="userSpaceOnUse">
          <image href="/textures/crosshatch-light.png" width="5" height="5" />
        </pattern>
      </defs>
    </svg>
  );
}
