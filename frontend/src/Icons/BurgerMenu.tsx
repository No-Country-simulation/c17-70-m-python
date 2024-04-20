interface Props {
  className: string
  type?: string
}
export function BurgerMenu({ className, type }: Props) {
  const color = type != null && type === 'secondary' ? '#EDF0F0' : '#49BAB3'
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M4 18L20 18'
          stroke={color}
          strokeWidth='2'
          stroke-linecap='round'
        ></path>{' '}
        <path
          d='M4 12L20 12'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
        ></path>{' '}
        <path
          d='M4 6L20 6'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
        ></path>
      </g>
    </svg>
  )
}
