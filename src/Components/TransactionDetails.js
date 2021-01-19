import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles({
  paper: {
    width: "auto",
    backgroundColor: "#f5f5f5",
  },
});

const formatTransactionAmount = (transaction) => {
  return `${
    transaction.transactionAmount ? transaction.transactionAmount.amount : "N/A"
  } ${
    transaction.transactionAmount ? transaction.transactionAmount.currency : ""
  }`;
};

export default function TransactionDetails(props) {
  const classes = useStyles();
  const { details } = props;
  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography variant='h6' component='h2' gutterBottom>
        Transaction details
      </Typography>
      <List className={classes.root}>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Category Icon' src={details.categoryIconUrl} />
          </ListItemAvatar>
          <ListItemText primary='Title' secondary={details.localizableTitle} />
          <ListItemText primary='Category' secondary={details.categoryID} />
          <ListItemText primary='Status' secondary={details.status} />
          <ListItemText primary='Type' secondary={details.type} />
          <ListItemText
            primary='Transaction amount'
            secondary={formatTransactionAmount(details)}
          />
          <ListItemText
            primary='Billing amount'
            secondary={`${details.billingAmount?.amount} ${details.billingAmount?.currency}`}
          />
        </ListItem>
        <Divider variant='inset' component='li' />
      </List>
    </Paper>
  );
}
