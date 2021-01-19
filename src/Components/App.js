import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import SearchBar from "./SearchBar";
import Table from "./TransactionTable";

class App extends React.Component {
  state = {
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
    });
  }

  handleSetFilteredData = (filteredTransactions) => {
    this.setState({ filteredTransactions });
  };

  handleSetSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };

  handleDelete = (transactionId) => {
    this.setState((state) => ({
      transactions: state.transactions.filter(
        (item) => item.id !== transactionId
      ),
    }));
  };

  render() {
    let { transactions, filteredTransactions, searchInput } = this.state;
    const tableData = searchInput.length ? filteredTransactions : transactions;

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
          {/* TODO: cleanup empty name property left after removin column headers */}
          <Table
            data={tableData}
            handleDelete={this.handleDelete}
            header={[
              {
                name: "",
                prop: "iconURL",
              },
              {
                name: "",
                prop: "type",
              },
              {
                name: "",
                prop: "localizableTitle",
              },
              {
                name: "",
                prop: "amount",
              },
              {
                name: "",
                prop: "time",
              },
              {
                name: "",
                prop: "categoryID",
              },
              {
                name: "",
                prop: "status",
              },
              {
                name: "",
                prop: "delete",
              },
            ]}
          />
        </Paper>
      </Container>
    );
  }
}

export default App;
