import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TransactionDetails from "./TransactionDetails";
import TransactionItem from "./TransactionItem";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
  },
}))(TableRow);

class TransactionRow extends React.Component {
  state = { open: false };

  render() {
    const { transaction, header, handleDelete } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <StyledTableRow
          key={transaction.id}
          onClick={() => this.setState(({ open }) => ({ open: !open }))}
        >
          {header.map((headerItem, index) => {
            return (
              <TableCell key={`trc-${index}`}>
                <TransactionItem
                  headerItem={headerItem}
                  transactionData={transaction}
                  handleDelete={handleDelete}
                />
              </TableCell>
            );
          })}
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <TransactionDetails details={transaction} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

export default TransactionRow;
