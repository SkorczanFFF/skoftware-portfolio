import React from 'react';

export type ArrowColor = 'white' | 'blue' | 'raspberry';

/**
 * The chevron that lets the section above "drip" into this one. It sits at
 * the top edge of the lower section, so its colour is the background of the
 * section ABOVE — change a section's background and the arrow below it must
 * follow. Colour classes live in globals.css (`.arrow-down.white` etc.).
 */
export default function SectionArrow({ color }: { color: ArrowColor }) {
  return (
    <div
      className={`arrow-down ${color} absolute -top-[2px] left-0 right-0 mx-auto`}
      aria-hidden='true'
    />
  );
}
