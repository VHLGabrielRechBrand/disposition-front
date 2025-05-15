import React from 'react'
import Select from 'react-select'

const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#1a1a1a',
        borderColor: state.isFocused ? '#646cff' : '#444',
        color: 'white',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#646cff'
        },
        minHeight: '40px',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#1a1a1a',
        color: 'white',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#646cff'
            : state.isFocused
                ? '#2a2a2a'
                : '#1a1a1a',
        color: 'white',
        cursor: 'pointer',
    }),
    singleValue: (base) => ({
        ...base,
        color: 'white',
    }),
    input: (base) => ({
        ...base,
        color: 'white',
    }),
    placeholder: (base) => ({
        ...base,
        color: '#aaa',
    }),
}

export default function CustomSelect(props) {
    return <Select styles={customStyles} {...props} />
}