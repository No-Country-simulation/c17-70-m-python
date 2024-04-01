interface Props {
  placeholder: string
  className?: string
}
export function InputText({ placeholder, className }: Props) {
  const inputClass = 'rounded-full border-neutral-400 px-2 py-2'
  const variantInputClass = `${inputClass} ${className || ''}`.trim()
  return (
    <input
      className={variantInputClass}
      placeholder={placeholder}
      type='text'
    />
  )
}
