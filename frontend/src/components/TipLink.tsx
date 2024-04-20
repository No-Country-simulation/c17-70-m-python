import { ReactNode } from 'react'

type ButtonType = 'primary' | 'secondary'

interface Props {
  children: ReactNode
  type: ButtonType
  classname?: string
}

export function TipLink({ children, type, classname }: Props) {
  const variantButton: Record<ButtonType, string> = {
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100'
  }

  const selectColor = variantButton[type]

  const className = `${selectColor} ${
    classname != null ? classname : ''
  } rounded-lg text-secondary-700 font-bold text-sm px-6 py-5 shadow-md flex items-center justify-center`

  return <div className={`${className}`}>{children}</div>
}
