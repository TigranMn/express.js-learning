import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableHead from "./TableHead";
import "./index.css";
import TableRow from "./TableRow";

function Table() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [keySortDir, setKeySortDir] = useState({});
  const navigate = useNavigate();
  const columns = users[0] ? Object.keys(users[0]) : [];

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSort = (key) => {
    for (const objKey in keySortDir) {
      if (key != objKey) keySortDir[objKey] = "";
    }
    const sorted = users.sort((a, b) => {
      if (keySortDir[key] === "descend") {
        setKeySortDir({ ...keySortDir, [key]: "ascend" });
        if (a[key] > b[key]) return 1;
        else if (a[key] === b[key]) return 0;
        return -1;
      }
      setKeySortDir({ ...keySortDir, [key]: "descend" });
      if (b[key] > a[key]) return 1;
      else if (a[key] === b[key]) return 0;
      return -1;
    });
	 setUsers(sorted)
  };

  const handleDelete = (id) => {
    fetch(`/api/user/${id}`, {
      method: "DELETE",
    }).then((res) => {
      setUsers(users.filter((el) => el.id != id));
    });
  };

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSearch = (value) => {
   setQuery(value.trim());
  };

  return (
    <>
      <input
        type={"text"}
        name="search"
        placeholder="Search by name"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button onClick={() => navigate("/form	")}>Create user</button>
      <table className="styled-table">
        <TableHead
          columns={columns}
          handleSort={handleSort}
          keySortDir={keySortDir}
        />
        <tbody>
          {filtered.map((user) => (
            <TableRow
              key={user.id}
              columns={columns}
              user={user}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
