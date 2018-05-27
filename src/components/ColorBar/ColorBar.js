import React from 'react';
import './styles.css';

const colors = [
    "black",
    "red",
    "green",
    "blue",
    "yellow",
  ]

export default ({onColorUpdate}) => <div className="colors">
{
  colors.map((color, index) =>
    <div
      key={index}
      className={`color ${color}`}
      onClick={onColorUpdate} />
  )
}
</div>
