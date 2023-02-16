import React from 'react'

export default function TableRow({user, columns, handleDelete}) {
  return (
    <>
    <tr key={user.id}>
      {columns.map((col, i) => (
        <td key={i}>{user[col]}</td>
      ))}
      <td>
        <button onClick={() => handleDelete(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  </>
  )
}
