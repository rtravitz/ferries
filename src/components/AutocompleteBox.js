import React, { useState } from 'react'
import { useCombobox } from 'downshift'
import arrowDown from '../assets/arrow-thick-down.svg'
import closeIcon from '../assets/close.svg'

function AutocompleteBox({ items, label, setSelected, selected }) {
  const [inputItems, setInputItems] = useState(items)
  const [inputValueLength, setInputValueLength] = useState(0)

  const {
    isOpen,
    selectItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    selectedItem: selected,
    onSelectedItemChange: ({ selectedItem }) => setSelected(selectedItem),
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
      setInputValueLength(inputValue.length)
    },
  })

  const dynamicBorder = isOpen ? 'border-solid' : 'border-none'
  const aboveOverlay = isOpen ? 'z-40' : ''

  return (
    <>
      <div className={`${aboveOverlay} relative inline-block mb-2`} {...getComboboxProps()}>
        {/* <label className="absolute top-2" {...getLabelProps()}>FROM</label> */}
        <input
          className="bg-gray-200 py-1 pl-4 pr-8 border-solid border-2 border-green-700 shadow-lg"
          placeholder={label}
          {...getInputProps()} />
        {
          inputValueLength > 0 &&
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-12"
            onClick={() => selectItem(null)}
            type="button"
            aria-label={'clear menu'} >
            <img alt="x" className="h-3 w-3" src={closeIcon} />
          </button>
        }
        <button
          className="absolute top-1/2 transform -translate-y-1/2 right-4"
          type="button"
          {...getToggleButtonProps()}
          aria-label={'toggle menu'} >
          <img alt="down arrow" className="h-4 w-4" src={arrowDown} />
        </button>
        <ul className={`fixed bg-gray-200 ${dynamicBorder} border-1 border-green-700 inset-x-0 mx-auto top-36 mx-4 max-h-48 z-40 rounded-lg shadow-lg overflow-y-scroll`} {...getMenuProps()}>
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                className="text-center py-2 border-solid border-b border-green-light"
                style={
                  highlightedIndex === index ? { backgroundColor: '#9AB0A6' } : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
      {isOpen && <div className="fixed inset-0 bg-gray-transparent-600 z-30"></div>}
    </>
  )
}

export default AutocompleteBox
