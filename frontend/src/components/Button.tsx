import { ButtonHTMLAttributes, ReactNode } from 'react'
import { TypeButton } from '../type'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  typeVariant: TypeButton
  children: ReactNode
  className?: string
}

export function Button({ typeVariant, children, className, ...props }: Props) {
  const variantButton: Record<TypeButton, string> = {
    primary:
      'bg-primary-600 text-white py-2 px-3 rounded-full hover:bg-primary-700 disabled:bg-primary-100 disabled:text-primary-300',
    secondary:
      'bg-primary-100 text-primary-600 py-2 px-3 rounded-full outline outline-primary-600 hover:bg-primary-200 font-semibold outline-1 disabled:bg-primary-100 disabled:outline-primary-300 disabled:text-primary-300'
  }

  const classVariant = `${variantButton[typeVariant]} ${className || ''}`.trim()

  return (
    <button {...props} className={classVariant}>
      {children}
    </button>
  )
}
