/**
 * Film grain over the whole page: a tiled noise texture that shifts a few
 * pixels at a time (`.grain` in globals.css). It is what keeps the page from
 * ever looking perfectly still, and it sits under the route curtain and the
 * cursor. Purely decorative, never interactive.
 */
export default function Grain() {
  return <div className='grain' aria-hidden='true' />;
}
