import React from "react";
import Collapse from "@material-ui/core/Collapse";
import TransactionDetails from "./TransactionDetails";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

const renderAmount = (transaction) => {
  return `${transaction.billingAmount.amount} ${transaction.billingAmount.currency}`;
};

// TODO: use css text-transform: capitalize; instead of JS capitalization
const capitalizeString = (string) => {
  if (typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (date) => {
  return format(new Date(date), "dd/MM/yy kk:mm");
};

const renderIcon = (iconUrl) => {
  return <Avatar alt='Category Icon' src={iconUrl} />;
};

const renderChipFormat = (type) => {
  return <Chip size='small' color='primary' label={capitalizeString(type)} />;
};

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

    // TODO: refactor this
    return (
      <React.Fragment>
        <StyledTableRow
          key={transaction.id}
          onClick={() => this.setState(({ open }) => ({ open: !open }))}
        >
          {header.map((headerItem, index) => {
            return (
              <TableCell key={`trc-${index}`}>
                {headerItem.prop === "amount" ? (
                  renderAmount(transaction)
                ) : headerItem.prop === "time" ? (
                  formatDate(transaction[headerItem.prop])
                ) : headerItem.prop === "iconURL" ? (
                  renderIcon(transaction[headerItem.prop])
                ) : headerItem.prop === "type" ||
                  headerItem.prop === "categoryID" ||
                  headerItem.prop === "status" ? (
                  renderChipFormat(transaction[headerItem.prop])
                ) : headerItem.prop === "delete" ? (
                  <Fab color='secondary' aria-label='delete' size='small'>
                    <DeleteIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(transaction.id);
                      }}
                    />
                  </Fab>
                ) : (
                  transaction[headerItem.prop]
                )}
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
