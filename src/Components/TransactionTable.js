import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { format } from "date-fns";

const renderAmount = (transaction) => {
    return `${transaction.transactionAmount ? transaction.transactionAmount.amount : 0} ${transaction.transactionAmount ? transaction.transactionAmount.currency : ''}`;
}

const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yy kk:mm');
}

const row = (transaction, header) => (
  <TableRow key={transaction.id}>
    {header.map((headerItem, index) => {
        return (
          <TableCell key={`trc-${index}`}>
            {headerItem.prop === "amount"
              ? renderAmount(transaction)
              : headerItem.prop === "time"
              ? formatDate(transaction[headerItem.prop])
              : transaction[headerItem.prop]}
          </TableCell>
        );
    })}
  </TableRow>
);

const TransactionTable = ({ data, header }) => (
  <TableContainer>
    <Table aria-label="simple table">
        <TableHead>
            <TableRow>
                {header.map((x, i) => (
                    <TableCell  key={`thc-${i}`}>{x.name}</TableCell >
                ))}
            </TableRow>
        </TableHead>
        <TableBody>{data.map(transaction => {
            return row(transaction, header);
        })}</TableBody>
    </Table>
  </TableContainer>
);

export default TransactionTable;