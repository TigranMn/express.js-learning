import React from 'react'

export default function TableHead({columns, handleSort, keySortDir}) {
  return (
    <thead>
    <tr>
      {columns.map((el, i) => (
        <th onClick={() => handleSort(el)} key={i}>
          {el}
          {keySortDir[el] === 'ascend' || !keySortDir[el] ? '▲' : '▼'}
        </th>
      ))}
      <th>Delete</th>
    </tr>
  </thead>
  )
}
