import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { flexRender } from '@tanstack/react-table';
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

  const columns = React.useMemo(() => {
    if (assessments.length === 0) {
      return [];
    }
    return Object.keys(assessments[0]).map((key) => ({
      accessor: key,
      Header: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }, [ assessments ]);

  const data = React.useMemo(() => assessments, [ assessments ]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = tableInstance;

  return <table {...getTableProps()} className="table">
    <thead>
      {headerGroups.map((headerGroup) =>
        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
          {headerGroup.headers.map((column) =>
            <th {...column.getHeaderProps()} key={column.id}>
              {column.columnDef && flexRender(column.columnDef.header, column.getContext())}
            </th>)}
        </tr>)}
    </thead>
    <tbody>
      {rows.map((row) => {
        prepareRow(row);
        return <tr {...row.getRowProps()} key={row.id}>
          {row.cells.map((cell) =>
            <td {...cell.getCellProps()} key={cell.id}>
              {cell.columnDef && flexRender(cell.columnDef.cell, cell.getContext())}
            </td>)}
        </tr>;
      })}
    </tbody>
  </table>;
};
