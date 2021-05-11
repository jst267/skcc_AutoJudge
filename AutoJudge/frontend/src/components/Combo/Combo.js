import React, { Component } from 'react';
import classNames from 'classnames';
import { Col, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

class Combo extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            key : [],
            datas: []
        }
    }

    handleData = result => {
        this.setState({
            datas : result.data,
        })
    }


    onClick = async () => {
        let url = this.props.url;
    	const response = await axios.get(url)
        this.setState({
            datas : response.data,
        })
    }

    toggle= dd => {
        this.setState({
            [dd]: !this.state[dd]
        })
    }

    // handleSelect = SelectedValue =>  {

    //     let key = Object.keys(SelectedValue.data);

    //     this.setState({
    //         this.props.button : [SelectedValue.data[key]]
    //     })

    //     console.log(this.state.BUTTONS);
    // }

    renderDropdown = (title, i) => {

        const ddClass = classNames('animated', 'fadeIn');
        return (
            <ButtonDropdown isOpen={this.state[`${this.props.name}${i}`]} toggle={() => this.toggle(`${this.props.name}${i}`)} key={`${this.props.name}${i}`} id={ `dropdown-${this.props.name}-${i}`}
            onClick={this.props.defaultYN ? this.onClick:this.props.onClick} >
                <DropdownToggle caret outline color='inverse'>
                  {title}
                </DropdownToggle >
                <DropdownMenu className={ddClass}>
                  {this.state.datas.map((data,i) =>
                  (
                    <DropdownItem key={`${this.state.datas}${i}`} id={ `dropdownItem-${this.state.datas}-${i}`} onClick={() => this.props.handleSelect({data})} >{data[Object.keys(data)]}</DropdownItem>)
                  )}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    render() {

        return (
                <div className="d-flex align-items-center">
                    <Col lg={1}>
                    <i className="fas fa-cube"></i>
                    </Col>
                    <Col lg={5}>
                    <label className="col col-form-label">{this.props.name}</label>
                    </Col>
                    <Col lg={6}>
                    <ButtonToolbar>{ this.props.button.map(this.renderDropdown) }</ButtonToolbar>
                    </Col>
                </div>
        );

    }


}

export default Combo;