import React, { useState } from 'react'
import { useCombobox } from 'downshift'
import arrowDown from '../assets/arrow-thick-down.svg'

function AutocompleteBox({ items, label, setSelected }) {
  const [inputItems, setInputItems] = useState(items)

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
    },
  })

  const dynamicBorder = isOpen ? 'border-solid' : 'border-none'

  return (
    <div className="relative inline-block mb-2" {...getComboboxProps()}>
      {/* <label className="absolute top-2" {...getLabelProps()}>FROM</label> */}
      <input
        onChange={(e) => { setSelected(e) }}
        className="bg-gray-200 rounded-l-full py-1 pl-4 pr-8 border-solid border-2 border-green-700 shadow-lg"
        placeholder={label}
        {...getInputProps()} />
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-4"
        type="button"
        {...getToggleButtonProps()}
        aria-label={'toggle menu'}
      >
        <img alt="down arrow" className="h-4 w-4" src={arrowDown} />
      </button>
      <ul className={`fixed bg-gray-200 ${dynamicBorder} border-1 border-green-700 inset-x-0 mx-auto top-28 w-48 max-h-48 z-40 rounded-lg shadow-lg overflow-y-scroll`} {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className="text-center py-1"
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default AutocompleteBox
