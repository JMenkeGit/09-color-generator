import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const NewSingleColor = ({ index, rgb, weight, hexColor, type }) => {
  const [alert, setAlert] = useState('')
  const bcg = rgb.join(',')
  const hex = rgbToHex(...rgb)
  const hexValue = `#${hexColor}`
  const copyColor = () => {
    setAlert(true)
    navigator.clipboard.writeText(hexValue)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 6000)
    return () => clearTimeout(timeout)
  }, [alert])

  return (
    <article
      className={`color ${type === 'shade' && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={copyColor}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexValue}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default NewSingleColor
