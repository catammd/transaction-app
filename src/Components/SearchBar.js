import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      searchInput: "",
    };
  }

  handleChange = (event) => {
    const val = event.target.value;
    this.setState({ searchInput: val }, () => this.globalSearch());
    this.props.handleSetSearchInput(val);
  };

  globalSearch = () => {
        const { searchInput } = this.state;
        let filteredData = this.props.data.filter((value) => {
        return (
            value.type.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.localizableTitle
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
            value.status
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
    });

    this.props.handleSetFilteredData(filteredData);
  };

  render() {

    return (
      <>
        <br />
        <TextField
          name='searchInput'
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          label='Search'
        />
      </>
    );
  }
}
