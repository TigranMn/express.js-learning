import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Table() {
   const [users, setUsers] = useState([]);
   const [query, setQuery] = useState('');
	const navigate = useNavigate()
   const columns = users[0] ? Object.keys(users[0]) : [];

   const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
   );

   const handleDelete = (id) => {
      fetch(`/api/user/${id}`, {
         method: 'DELETE',
      }).then((res) => {
         setUsers(users.filter((el) => el.id != id));
      });
   };

   useEffect(() => {
      fetch('/api/users')
         .then((res) => res.json())
         .then((data) => setUsers(data));
   }, []);

   const handleSearch = (value) => {
      if (value.trim()) setQuery(value.trim());
   };

   return (
      <>
         <input
            type={'text'}
            name='search'
            placeholder='Search by name'
            onChange={(e) => handleSearch(e.target.value)}
         />
			<button onClick={() => navigate('/form	')}>Create user</button>
         <table className='styled-table'>
            <thead>
               <tr>
                  {columns.map((el, i) => (
                     <th key={i}>{el}</th>
                  ))}
                  <th>Delete</th>
               </tr>
            </thead>
            <tbody>
               {filtered.map((user) => {
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
                  );
               })}
            </tbody>
         </table>
      </>
   );
}

export default Table;
