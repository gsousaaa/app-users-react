interface InputProps {
    type: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    disabled?: boolean

}

export const Input: React.FC<InputProps> = ({ type, disabled, placeholder, value, onChange, name }) => {
    return (
        <input disabled={disabled} className='text-sm text-black w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 font-semibold' type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} />
    )
}