interface Props {
  width?: number
  height?: number
}
export function UpArrow({ width, height }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={`${width == null ? '24' : width}`}
      height={`${height == null ? '24' : height}`}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M6 15l6 -6l6 6' />
    </svg>
  )
}
