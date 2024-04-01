import { ReactNode } from 'react'
import { TypeButton } from '../type'

interface Props {
  typeVariant: TypeButton
  children: ReactNode
  className?: string
}

const variantButton: Record<TypeButton, string> = {
  primary: 'bg-neutral-400 text-white py-2 px-3 rounded-full',
  secondary:
    'bg-white text-neutral-400 py-2 px-3 rounded-full border-2 border-neutral-400',
}

export function Button({ typeVariant, children, className }: Props) {
  const classVariant = `${variantButton[typeVariant]} ${className || ''}`.trim()

  return <button className={classVariant}>{children}</button>
}
