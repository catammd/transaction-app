import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import App from './Components/App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// See a list of transactions with the most relevant data for the customer

/**
 * TODO:
 * Get the transactions from the API https://cdn.prod.lunarway.com/voyager/transactions_test_dev.json
 * Render a list with items from api list
 * Style the list a little bit
 */

// Clicking on a item list will show details for that transaction

// The list can be filtered. For example, only see transactions with a specific status, type, etc.

// Add posibility to delete a transaction- it's fine if the transaction re-appears on page load. 