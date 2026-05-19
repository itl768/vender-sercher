import { useEffect, useState } from "react";

function App() {

  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");

  const loadData = async (search = "") => {

    const response = await fetch(
      `/api/search?keyword=${search}`
    );

    const data = await response.json();

    setItems(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      <h1>CSV Search Demo</h1>

      <input
        type="text"
        placeholder="Search item..."
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          loadData(e.target.value);
        }}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Vendor</th>
            <th>Price</th>
            <th>Currency</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.item}</td>
              <td>{item.vendor}</td>
              <td>{item.price}</td>
              <td>{item.currency}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default App;