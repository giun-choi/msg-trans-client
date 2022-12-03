import React from 'react'

export default function GroupEmail({ tos: any, setTos }) {
  const handleAddEmail = (): void => {
    setTos((prev: any) => ([...prev, '']))
  }

  const handleRemoveEmail = (removeIndex: number): void => {
    if (tos.length > 1) {
      setTos((prev: any) => ([...prev.filter((to: string, index: number) => (index !== removeIndex))]))
    }
  }

  const handleChange = (addIndex: number, email: string): void => {
    setTos((prev: any) => {
      const newTos = [...prev]
      newTos[addIndex] = email
      return newTos
    })
  }

  return (
    <div>
      <button type='button' onClick={handleAddEmail}>+</button>
      {tos.map((to: string, index: number) => {
        return (
          <div key={index}>
            <input type='email' value={to} onChange={(e) => handleChange(index, e.target.value)} />
            <button type='button' onClick={() => handleRemoveEmail(index)}>-</button>
          </div>
        )
      })}

    </div>
  )
}
