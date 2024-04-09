import { option } from './ComboBox'

interface Props {
  options: option[]
  onSelect: (option: option) => void
  dropdownPosition: 'top' | 'bottom'
}
export function OptionComboBox({ options, onSelect, dropdownPosition }: Props) {
  const dropdownStyle =
    dropdownPosition === 'top' ? { bottom: '100%' } : { top: '100%' }

  options.sort((a, b) => a.value.localeCompare(b.value))

  return (
    <div
      style={dropdownStyle}
      className='absolute overflow-hidden border border-neutral-900 z-40 w-full rounded-3xl'
    >
      {options.map((option, index) => {
        const { image } = option
        return (
          <div className='relative' key={index}>
            {image != null && (
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <img
                  className='rounded-md object-contain'
                  width={26}
                  height={26}
                  src={image}
                  alt={`${option.alt}`}
                />
              </div>
            )}
            <div
              onClick={() => onSelect(option)}
              className={`pl-12 py-2 bg-neutral-50 hover:bg-primary-100`}
            >
              {option.value}
            </div>
            {index !== options.length - 1 && (
              <hr className='border-t border-primary-900' />
            )}
          </div>
        )
      })}
    </div>
  )
}
