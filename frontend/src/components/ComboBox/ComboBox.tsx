import { useRef, useState } from 'react'
import { DownArrow } from '../../Icons/DownArrow'
import { UpArrow } from '../../Icons/UpArrow'
import { OptionComboBox } from './OptionComboBox'

export interface option {
  image?: string
  alt?: string
  value: string
}

interface Props {
  isCapitalized?: boolean
  options: option[]
  className?: string
  placeholder: string
  readonly?: boolean
  selected?: option
  iconShow?: boolean
  flagShow?: boolean
  handleCountryChange?: (countryName: string) => void
}

export function ComboBox({
  isCapitalized,
  options,
  className,
  placeholder,
  readonly,
  selected,
  iconShow,
  flagShow,
  handleCountryChange
}: Props) {
  const [isActive, setIsActive] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedImage, setSelectedImage] = useState<option | null>()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>(
    'bottom'
  )

  const handleFocus = () => {
    setIsActive(true)
  }

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
    }, 100)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setIsActive(true)
    if (isCapitalized === true) {
      const newValue = value.charAt(0).toUpperCase() + value.slice(1)
      setInputValue(newValue)
      if (handleCountryChange != null) {
        handleCountryChange(newValue)
      }
      const findCountryFlag = options.find(
        country => country.value === newValue
      )
      setSelectedImage(findCountryFlag)
      return
    }
    const findCountryFlag = options.find(country => country.value === value)
    setSelectedImage(findCountryFlag)
    setInputValue(value)
    if (handleCountryChange != null) {
      handleCountryChange(value)
    }
  }

  const handleOptionClick = (option: option) => {
    const { image, value } = option
    if (image != null) {
      setSelectedImage(option)
    }
    if (handleCountryChange != null) {
      handleCountryChange(value)
    }
    setInputValue(value)
    setIsActive(false)
  }

  const handleContainerClick = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
  }

  const calculateDropdownPosition = () => {
    if (inputRef.current) {
      const { top, bottom } = inputRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const spaceBelow = windowHeight - bottom
      const spaceAbove = top

      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }
    }
  }

  const filteredOptions = options.filter(option =>
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && filteredOptions.length > 0) {
      const value = filteredOptions[0].value
      setInputValue(value)
      if (handleCountryChange != null) {
        handleCountryChange(value)
      }
      if (filteredOptions[0]) setSelectedImage(filteredOptions[0])
      setIsActive(false)
    }
  }

  return (
    <div
      className={`${className ? className : ''} relative`}
      onClick={handleContainerClick}
    >
      {iconShow != null && iconShow !== false && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          {readonly !== true && isActive ? <UpArrow /> : <DownArrow />}
        </div>
      )}

      {selected != null && (
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <img
            className='rounded-md object-contain'
            width={26}
            height={26}
            src={selected.image}
            alt={`${selected.alt}`}
          />
        </div>
      )}
      {selected == null && selectedImage && (
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <img
            className='rounded-md object-contain'
            width={26}
            height={26}
            src={selectedImage.image}
            alt={`${selectedImage.alt}`}
          />
        </div>
      )}
      <input
        readOnly={readonly}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        type='text'
        value={selected == null ? inputValue : selected.value}
        onChange={handleInputChange}
        onFocus={() => {
          handleFocus()
          calculateDropdownPosition()
        }}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${className ? className : ''} rounded-full mb-2 mt-2 ${
          iconShow != null && iconShow !== false ? 'pr-12' : ''
        } ${
          flagShow != null && flagShow !== false ? 'pl-12' : 'pl-5'
        } border-neutral-900 border px-2 py-2 text-black focus:outline-none focus:border-primary-500 shadow-sm focus:ring-primary-500 focus:ring-2 focus:caret-primary-500 disabled:bg-neutral-100 disabled:placeholder:text-neutral:300 disabled:border-neutral-300`}
      />
      {readonly !== true && isActive && (
        <OptionComboBox
          options={filteredOptions}
          onSelect={handleOptionClick}
          dropdownPosition={dropdownPosition}
        />
      )}
    </div>
  )
}
