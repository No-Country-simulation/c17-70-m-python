import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react'

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  placeholder: string
  className?: string
}
// pasar propiedades para el tipo como con los botones
export const InputText = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { placeholder, className, ...rest } = props

  const inputClass =
    'rounded-full border-neutral-900 border px-2 py-2 text-black focus:outline-none focus:border-primary-500 shadow-sm focus:ring-primary-500 focus:ring-2 focus:caret-primary-500 pl-5 disabled:bg-neutral-100 disabled:placeholder:text-neutral:300 disabled:border-neutral-300'
  const variantInputClass = `${inputClass} ${className || ''}`.trim()

  return (
    <input
      ref={ref}
      className={variantInputClass}
      placeholder={placeholder}
      type='text'
      {...rest}
    />
  )
})
