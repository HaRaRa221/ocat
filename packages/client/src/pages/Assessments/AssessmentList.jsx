import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import {
  useReactTable,
} from '@tanstack/react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);
  console.log(assessments);

  const columns = React.useMemo(
    () => [
      {
        accessor: `id`,
        Header: `ID`,
      },
      {
        accessor: `catName`,
        Header: `Cat Name`,
      },
      {
        accessor: `catDateOfBirth`,
        Header: `Cat Date of Birth`,
      },
      {
        accessor: `instrumentType`,
        Header: `Instrument Type`,
      },
      {
        accessor: `riskLevel`,
        Header: `Risk Level`,
      },
      {
        accessor: `score`,
        Header: `Score`,
      },
    ],
    [],
  );
  const data = React.useMemo(() => assessments, [ assessments ]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = tableInstance;

  return <div>
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) =>
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) =>
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render(`Header`)}
              </th>)}
          </tr>)}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell) =>
              <td {...cell.getCellProps()} key={cell.id}>
                {cell.render(`Cell`)}
              </td>)}
          </tr>;
        })}
      </tbody>
    </table>
  </div>;
};
