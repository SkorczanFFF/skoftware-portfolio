import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href='/'
      className='font-unica font-bold select-none relative'
      aria-label='SKOFTware - Back to home'
    >
      <span className='text-2xl relative'>
        <span
          className='absolute right-[-1px] bottom-[-3px] text-white pointer-events-none'
          aria-hidden='true'
        >
          SKOFTware
        </span>
        <span className='relative'>
          <span className='text-orange'>SKO</span>
          <span className='text-raspberry'>FT</span>
          <span className='text-primary-blue'>ware</span>
        </span>
      </span>
    </Link>
  );
}
