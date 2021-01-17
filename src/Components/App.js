import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Box, Paper } from "@material-ui/core";
import SearchBar from "./SearchBar";
import Table from "./TransactionTable";

class App extends React.Component {
  state = {
    loading: true,
    transactions: [],
    filteredTransactions: [],
    searchInput: "",
  };

  async componentDidMount() {
    const url = "data.json"; //Normally this would be an external API url
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const jsonResponse = await response.json();
    this.setState({
      transactions: jsonResponse.data.transactions,
      loading: false,
    });
  }

  handleSetFilteredData = (filteredTransactions) => {
    this.setState({ filteredTransactions });
  };

  handleSetSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };

  render() {
    if (this.state.loading) {
      return <div>Retrieving data...</div>;
    }

    if (!this.state.transactions.length) {
      return <div>No transactions</div>;
    }
    let { transactions, filteredTransactions, searchInput } = this.state;
    const dataToDisplay = searchInput.length
      ? filteredTransactions
      : transactions;
    return (
      <Container maxWidth='lg' className='App'>
        <Paper>
          <Typography variant='h4' component='h1' gutterBottom>
            Transactions Web Interface
          </Typography>
          <SearchBar
            data={this.state.transactions}
            handleSetFilteredData={this.handleSetFilteredData}
            handleSetSearchInput={this.handleSetSearchInput}
          />

          <Table
            data={dataToDisplay}
            header={[
              {
                name: "Transaction name",
                prop: "localizableTitle",
              },
              {
                name: "Transaction amount",
                prop: "amount",
              },
              {
                name: "Category",
                prop: "categoryID",
              },
              {
                name: "Status",
                prop: "status",
              },
              {
                name: "Date",
                prop: "time",
              },
            ]}
          />
        </Paper>
      </Container>
    );
  }
}

export default App;
