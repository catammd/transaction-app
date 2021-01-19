import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import { format } from "date-fns";

export default function TransactionItem({
  headerItem,
  transactionData,
  handleDelete,
}) {
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

  return (
    <div>
      {(() => {
        switch (headerItem.prop) {
          case "amount":
            return renderAmount(transactionData);
          case "time":
            return formatDate(transactionData[headerItem.prop]);
          case "iconURL":
            return renderIcon(transactionData[headerItem.prop]);
          case "type":
          case "categoryID":
          case "status":
            return renderChipFormat(transactionData[headerItem.prop]);
          case "delete":
            return (
              <Fab color='secondary' aria-label='delete' size='small'>
                <DeleteIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(transactionData.id);
                  }}
                />
              </Fab>
            );
          default:
            return transactionData[headerItem.prop];
        }
      })()}
    </div>
  );
}
