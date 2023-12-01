import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { useAuth } from './login/AuthProvider';

function App() {
  const { logout } = useAuth();
  const columnDefs = [
    { headerName: "Column 1", field: "col1", editable: true },
    { headerName: "Column 2", field: "col2", editable: true },
    { headerName: "Column 3", field: "col3", editable: true },
    { headerName: "Column 4", field: "col4", editable: true }
  ];

  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/rows')
      .then(response => response.json())
      .then(data => {
        const convertedData = data.map(item => ({
          col1: item.name,
          col2: item.address,
          col3: item.phone_number,
          col4: item.age
        }));
        console.log(convertedData)
        setRowData(convertedData);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <nav>
        <ul>
          <button onClick={() => logout()}>Logout</button>
        </ul>
      </nav>
      <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;