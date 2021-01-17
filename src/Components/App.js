import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import SearchBar from './SearchBar';
import Table from './TransactionTable';

class App extends React.Component {

  state = {
    loading: true,
    transactions: []
  };

  async componentDidMount(){
    const url = 'data.json'; //Normally this would be an external API url
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const jsonResponse =  await response.json();
    this.setState({ transactions: jsonResponse.data.transactions, loading: false });
  }

  render() {
    if(this.state.loading){
      return <div>Retrieving data...</div>
    }

    if (!this.state.transactions.length) {
      return <div>No transactions</div>;
    }
    return (
      <Container maxWidth='xl' className='App'>
        <Paper>
          <Typography variant='h4' component='h1' gutterBottom>
            Transactions Web Interface
          </Typography>
          <SearchBar />
          <Table
            data={this.state.transactions}
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