import React, {Component} from 'react';
import TableGrid from '../components/TableGrid';
import DeleteDialog from '../components/DeleteDialog'
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          name: 'name',
          title: 'Name'
        }, {
          name: 'sex',
          title: 'Sex'
        }, {
          name: 'city',
          title: 'City'
        }, {
          name: 'car',
          title: 'Car'
        }
      ],
      rows: [
        {
          id: 1,
          sex: "Female",
          name: "Sandra",
          city: "Las Vegas",
          car: "Audi A4"
        }, {
          id: 2,
          sex: "Male",
          name: "Paul",
          city: "Paris",
          car: "Nissan Altima"
        }, {
          id: 3,
          sex: "Male",
          name: "Mark",
          city: "Paris",
          car: "Honda Accord"
        }, {
          id: 4,
          sex: "Male",
          name: "Paul",
          city: "Paris",
          car: "Nissan Altima"
        }, {
          id: 5,
          sex: "Female",
          name: "Linda",
          city: "Austin",
          car: "Toyota Corolla"
        }, {
          id: 6,
          sex: "Male",
          name: "Robert",
          city: "Las Vegas",
          car: "Chevrolet Cruze"
        }, {
          id: 7,
          sex: "Female",
          name: "Lisa",
          city: "London",
          car: "BMW 750"
        }, {
          id: 8,
          sex: "Male",
          name: "Mark",
          city: "Chicago",
          car: "Toyota Corolla"
        }, {
          id: 9,
          sex: "Male",
          name: "Thomas",
          city: "Rio de Janeiro",
          car: "Honda Accord"
        }, {
          id: 10,
          sex: "Male",
          name: "Robert",
          city: "Las Vegas",
          car: "Honda Civic"
        }, {
          id: 11,
          sex: "Female",
          name: "Betty",
          city: "Paris",
          car: "Honda Civic"
        }, {
          id: 12,
          sex: "Male",
          name: "Robert",
          city: "Los Angeles",
          car: "Honda Accord"
        }, {
          id: 13,
          sex: "Male",
          name: "William",
          city: "Los Angeles",
          car: "Honda Civic"
        }, {
          id: 14,
          sex: "Male",
          name: "Mark",
          city: "Austin",
          car: "Nissan Altima"
        }
      ],
      deletingRows: []
    };
    this.commitChanges = ({added, changed, deleted}) => {
      let rows = this.state.rows;
      if (added) {
        const startingAddedId = (rows.length - 1) > 0
          ? rows[rows.length - 1].id + 1
          : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row
          }))
        ];
      }
      this.cancelDelete = () => this.setState({deletingRows: []});
      if (changed) {
        rows = rows.map(row => (changed[row.id]
          ? {
            ...row,
            ...changed[row.id]
          }
          : row));
      }
      this.setState({
        rows,
        deletingRows: deleted || this.state.deletingRows
      });
    };

    this.deleteRows = () => {
      const rows = this
        .state
        .rows
        .slice();
      this
        .state
        .deletingRows
        .forEach((rowId) => {
          const index = rows.findIndex(row => row.id === rowId);
          if (index > -1) {
            rows.splice(index, 1);
          }
        });
      this.setState({rows, deletingRows: []});
    };
    this.cancelDelete = () => this.setState({deletingRows: []});
  }
  render() {
    const {rows, columns, deletingRows} = this.state;

    return (
      <div>
        <TableGrid rows={rows} columns={columns} commitChanges={this.commitChanges}/>
        <DeleteDialog
          rows={rows}
          columns={columns}
          deletingRows={deletingRows}
          deleteRows={this.deleteRows}
          cancelDelete={this.cancelDelete}/>
      </div>
    );
  }
}
export default Table;
