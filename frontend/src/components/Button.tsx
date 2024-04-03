import { ButtonHTMLAttributes, ReactNode } from 'react'
import { TypeButton } from '../type'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  typeVariant: TypeButton
  children: ReactNode
  className?: string
}

const variantButton: Record<TypeButton, string> = {
  primary:
    'bg-teal-500 text-white py-2 px-3 rounded-full hover:bg-teal-600 disabled:bg-gray-600 disabled:text-neutral-400',
  secondary:
    'bg-teal-100 font-semibold text-teal-500 py-2 px-3 rounded-full outline outline-teal-500 hover:bg-teal-200 disabled:bg-gray-600 disabled:outline-neutral-400 disabled:text-neutral-400',
}

export function Button({ typeVariant, children, className, ...props }: Props) {
  const classVariant = `${variantButton[typeVariant]} ${className || ''}`.trim()

  return (
    <button {...props} className={classVariant}>
      {children}
    </button>
  )
}
