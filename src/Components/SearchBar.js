import React from "react";
import TextField from "@material-ui/core/TextField";

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
    const localizedSearchInput = searchInput.toLowerCase();
    let filteredData = this.props.data.filter((value) => {
      return (
        value.type.toLowerCase().includes(localizedSearchInput) ||
        value.localizableTitle.toLowerCase().includes(localizedSearchInput) ||
        value.status.toLowerCase().includes(localizedSearchInput) ||
        value.time.toLowerCase().includes(localizedSearchInput) ||
        value.categoryID.toLowerCase().includes(localizedSearchInput)
      );
    });

    this.props.handleSetFilteredData(filteredData);
  };

  render() {
    return (
      <>
        <br />
        <form noValidate autoComplete='off'>
          <TextField
            id='outlined-size-small'
            variant='outlined'
            fullWidth
            size='small'
            type='search'
            name='searchInput'
            value={this.state.searchInput || ""}
            onChange={this.handleChange}
            label='Search'
          />
        </form>
      </>
    );
  }
}
