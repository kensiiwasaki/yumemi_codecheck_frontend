import { FC, useEffect, useState } from 'react'

type CheckboxType = {
  prefCode: number
  label: string
  onChange: (e: { prefCode: number; isChecked: boolean }) => void
}

export const Checkbox: FC<CheckboxType> = (props) => {
  const { label, onChange, prefCode } = props
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = () => {
    setIsChecked((prevIsChecked) => {
      return !prevIsChecked
    })
  }

  useEffect(() => {
    onChange({
      prefCode,
      isChecked,
    })
  }, [isChecked, onChange, prefCode])

  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <p>{label}</p>
      </label>
    </div>
  )
}
