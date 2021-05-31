import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Container, FormGroup, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import { Editors } from "react-data-grid-addons";

const { DropDownEditor } = Editors;


const rows = [
  { id: 0, title: "Task 1", issueType: "Bug", complete: 20 },
  { id: 1, title: "Task 2", issueType: "Story", complete: 40 },
  { id: 2, title: "Task 3", issueType: "Epic", complete: 60 }
];

class AJCerti extends React.Component {

    state = {
        rows,
        issueType : [
            { id: "bug", value: "Bug" },
            { id: "epic", value: "Epic" },
            { id: "story", value: "Story" }
        ],
    };

    IssueTypeEditor = <DropDownEditor options={this.state.issueType} />
    columns = [
        { key: "id", name: "ID" },
        { key: "title", name: "Title" },
        { key: "complete", name: "Complete" },
        { key: "issueType", name: "Task Type", editor: this.IssueTypeEditor }
    ]

    //IssueTypeEditor = <DropDownEditor options={this.state.issueType} />

  SAVE = () => {
    console.log(this.state.issueType)
    this.setState({
        IssueTypeEditor : <DropDownEditor options={[
            { id: "bug", value: "Bug2" },
            { id: "epic", value: "Epic2" },
            { id: "story", value: "Story2" }
          ]} />
        // issueType : [
        //     { id: "bug", value: "Bug2" },
        //     { id: "epic", value: "Epic2" },
        //     { id: "story", value: "Story2" }
        //   ]
    })
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    console.log(fromRow)
    console.log(toRow)
    console.log(updated)
    this.setState(state => {
      const rows = state.rows.slice();

      console.log(state.rows)
      console.log(rows[0]["title"])
      for (let i = 0; i < rows.length; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={3}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
        <ButtonToolbar><Button color="info" onClick={this.SAVE}>Save</Button></ButtonToolbar>
      </div>
    );
  }
}

export default AJCerti;
