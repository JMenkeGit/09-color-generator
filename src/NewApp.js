import React, { useState } from 'react'
import NewSingleColor from './NewSingleColor'
import Values from 'values.js'

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#f15025').all(10))
  const [amount, setAmount] = useState(10)
  const [amountErr, setAmountErr] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      setError(false)
      setAmountErr(false)
      if (!amount) {
        setAmountErr(true)
        throw new Error('No amount value')
      }
      const number = 100 / amount
      let colors = new Values(color).all(number)
      setList(colors)
    } catch (error) {
      if (!color) {
        setError(true)
      }
      console.log(error)
    }
  }
  return (
    <>
      <section className='container'>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='color'
            id='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder='#f15025'
            className={error ? 'error' : null}
          />
          <input
            type='number'
            name='amount'
            id='amount'
            value={amount}
            placeholder={10}
            onChange={(e) => setAmount(e.target.value)}
            className={`input-amount ${amountErr ? 'error' : null}`}
          />
          <button className='btn' type='submit'>
            submit
          </button>
        </form>
      </section>
      <section className='colors'>
        {list.map((color, index) => {
          return (
            <NewSingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
              type={color.type}
            />
          )
        })}
      </section>
    </>
  )
}

export default App
