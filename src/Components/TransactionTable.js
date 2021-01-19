import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TransactionRow from "./TransactionRow";

const TransactionTable = ({ data, header, handleDelete }) => (
  <TableContainer>
    <Table aria-label='Transactions table' size='small'>
      <TableHead>
        <TableRow>
          {header.map((headItem, i) => (
            <TableCell key={`thc-${i}`}>{headItem.name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((transaction, index) => (
          <TransactionRow
            transaction={transaction}
            header={header}
            key={index}
            handleDelete={handleDelete}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TransactionTable;
