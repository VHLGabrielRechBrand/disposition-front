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
    multiValue: (base) => ({
        ...base,
        backgroundColor: '#2a2a2a',
        borderRadius: '4px',
    }),
    multiValueLabel: (base) => ({
        ...base,
        color: 'white',
    }),
    multiValueRemove: (base) => ({
        ...base,
        color: '#aaa',
        ':hover': {
            backgroundColor: '#444',
            color: 'white',
        },
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
};

export default function CustomSelect({ label, id, ...props }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {label && (
                <label
                    htmlFor={id}
                    style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        userSelect: 'none',
                    }}
                >
                    {label}
                </label>
            )}
            <Select
                inputId={id}
                styles={customStyles}
                {...props}
            />
        </div>
    )
}