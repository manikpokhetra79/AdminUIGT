import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { userApi } from '../helpers/urls';
function Table() {
  const [columns, setColumns] = useState([
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name', sorting: false },
    { title: 'Email', field: 'email', sorting: false },
    { title: 'Role', field: 'role', sorting: false },
  ]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(userApi)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      {' '}
      <div className="App">
        <h1 align="center">React-App</h1>
        <h4 align="center">Material Table</h4>
        <MaterialTable
          minRows={10}
          title="Employee Data"
          data={data}
          columns={columns}
          options={{
            selection: false,
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF',
            },
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    </div>
  );
}
export default Table;
