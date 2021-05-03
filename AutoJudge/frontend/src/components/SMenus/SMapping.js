import React, { Component, useState, useEffect } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Container, FormGroup, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
import Swal from '../Elements/Swal';

const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

const FaCard = ({icon}) => {
    const iconName = icon.split('fa-')[1].substring(0,20)
    return (
        <Col xl={3} lg={4}>
            <div className="card">
                <div className="card-body d-flex align-items-center">
                    <em className={"fa-2x mr-2 "+ icon}></em>
                    <span>{iconName}</span>
                </div>
            </div>
        </Col>
    )
}

class SMapping extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            activePage: 1,
            factorys: [],
            areas: [],
            eqpgrps: [],
            eqps: [],
            BUTTONS_FAB : ['none'],
            BUTTONS_AREA : ['none'],
            BUTTONS_EQPGROUP : ['none'],
            BUTTONS_EQP : ['none'],
            SCENARIOLIST : [],
            SCENARIOINFO : [],

            swalOption3: {
                text: "조회조건을 확인해주세요",
                icon: "warning"
            },
        };

        this.SCENARIO_LIST = [
            // {
            //     key: 'i',
            //     name: 'NO.',
            //     width: 80
            // },
            {
                key: 'FAB_ID',
                name: 'FAB',
                width: 80
            },
            {
                key: 'AREA_ID',
                name: 'AREA_ID',
                width: 80
            },
            {
                key: 'EQP_GRP',
                name: '장비그룹',
                width: 80
            },
            {
                key: 'EQP_ID',
                name: '장비ID',
                width: 80
            },
            {
                key: 'ALARM_ID',
                name: '알람ID',
                sortable: true
            },
            {
                key: 'SNRO_ID',
                name: '시나리오ID',
                sortable: true
            },
            {
                key: 'SNRO_NM',
                name: '시나리오명',
                sortable: true
            },
            {
                key: 'AUTO_FLAG',
                name: 'Auto상태',
                sortable: true
            },
            {
                key: 'CRT_TM',
                name: '생성일시',
                sortable: true
            },
            {
                key: 'CRT_USER_ID',
                name: '생성자',
                sortable: true
            },
            {
                key: 'CHG_TM',
                name: '변경일시',
                sortable: true
            },
            {
                key: 'CHG_USER_ID',
                name: '변경자',
                sortable: true
            }
            // {
            //     key: 'assigned',
            //     name: 'Assigned',
            //     width: 70,
            //     formatter: AssignedImageFormatter
            // },
            // {
            //     key: 'priority',
            //     name: 'Priority',
            //     sortable: true
            // },
            // {
            //     key: 'issueType',
            //     name: 'Issue Type',
            //     sortable: true
            // },
            // {
            //     key: 'complete',
            //     name: '% Complete',
            //     formatter: PercentCompleteFormatter,
            //     sortable: true
            // },
            // {
            //     key: 'startDate',
            //     name: 'Start Date',
            //     sortable: true
            // }
        ];

        this.SCENARIO_Info = [
            {
                key: 'ACTIVITY_ID',
                name: 'ACTIBITY_NM',
                width: 100
            },
            {
                key: 'ACTIVITY_DESC',
                name: 'ACTIBITY_DESC',
                width: 150
            },
        ];
    }

    //_Load
    componentWillMount() {

    }

    //_after
    componentDidMount(){

    }

    getRandomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    };

    getSearchList = async () => {
        if(this.state.BUTTONS_FAB == 'none' || this.state.BUTTONS_AREA == 'none')
        {
            swal( this.state.swalOption3);
        }
        else
        {
            const rScenario_List = await axios.get('http://localhost:8080/ScenarioInfo/getScenarioList?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP + '&' + 'EQP_ID=' + this.state.BUTTONS_EQP)
            this.setState({
                SCENARIOLIST : rScenario_List.data
            })
        }
    }

    onClickRow_SCENARIOLIST = async(rowInfo) => {

        const rScenario_Info = await axios.get('http://localhost:8080/ActivityInfo/getActivityList?' + 'FAB_ID=' + this.state.SCENARIOLIST[rowInfo].FAB_ID + '&' + 'AREA_ID=' + this.state.SCENARIOLIST[rowInfo].AREA_ID
        + '&' + 'SNRO_ID=' + this.state.SCENARIOLIST[rowInfo].SNRO_ID)

        this.setState({
            SCENARIOINFO : rScenario_Info.data
        })
    }


    SCENARIOList_Getter = (i) => this.state.SCENARIOLIST[i]
    SCENARIOInfo_Getter = (i) => this.state.SCENARIOINFO[i]

    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };

        const rows = sortDirection === 'NONE' ? this.stateTable.originalRows.slice(0) : this.stateTable.rows.sort(comparer);

        this.setState({ rows });
    };

    toggle= dd => {
        this.setState({
            [dd]: !this.state[dd]
        })
    }

    handleSelect_FAB = SelectedValue =>  {
        this.setState({
            BUTTONS_FAB : [SelectedValue.factory.FAB_ID]
        })
    }

    handleSelect_AREA = SelectedValue =>  {
        this.setState({
            BUTTONS_AREA : [SelectedValue.area.AREA_ID]
        })
    }

    handleSelect_EQPGROUP = SelectedValue =>  {
        this.setState({
            BUTTONS_EQPGROUP : [SelectedValue.eqpgrp.EQP_GRP]
        })
    }

    handleSelect_EQP = SelectedValue =>  {
        this.setState({
            BUTTONS_EQP : [SelectedValue.eqp.EQP_ID]
        })
    }

    //FAB Combo click
    onClick_FAB = async () => {
    	const response = await axios.get('http://localhost:8080/MasterInfo/getFactoryInfo')
        this.setState({
            factorys : response.data,
            BUTTONS_AREA : ['none'],
            BUTTONS_EQPGROUP : ['none'],
        })
    }

    //Area Combo click
    onClick_AREA = async () => {

        if(this.state.BUTTONS_FAB == 'none')
        {
            swal( this.state.swalOption3);
        }
        else
        {
            const response = await axios.get('http://localhost:8080/MasterInfo/getAreaInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB)
            this.setState({
                areas : response.data
            })
        }
    }

    //EQPGRP Combo click
    onClick_EQPGRP = async () => {

        if(this.state.BUTTONS_FAB == 'none' || this.state.BUTTONS_AREA == 'none')
        {
            swal( this.state.swalOption3);
        }
        else
        {
            const response = await axios.get('http://localhost:8080/MasterInfo/getEqpGrpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA)
            this.setState({
                eqpgrps : response.data
            })
        }
    }

    //EQP Combo click
    onClick_EQP = async () => {
        if(this.state.BUTTONS_FAB == 'none' || this.state.BUTTONS_AREA == 'none' || this.state.BUTTONS_EQPGROUP == 'none')
        {
            swal( this.state.swalOption3);
        }
        else
        {
            const response = await axios.get('http://localhost:8080/MasterInfo/getEqpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
                                            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP)
            this.setState({
                eqps : response.data
            })
        }
    }


    renderDropdown_FAB = (title, i) => {

        return (
            <ButtonDropdown isOpen={this.state[`FAB${i}`]} toggle={() => this.toggle(`FAB${i}`)} key={ i } id={ `dropdown-FAB-${i}`} onClick={this.onClick_FAB} >
                <DropdownToggle caret outline color='inverse'>
                  {title}
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.factorys.map((factory,index) => (<DropdownItem autosize={false} key={index} onClick={() => this.handleSelect_FAB({factory})} >{factory.FAB_ID}</DropdownItem>))}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    renderDropdown_AREA = (title, i) => {
        return (
            <ButtonDropdown isOpen={this.state[`AREA${i}`]} toggle={() => this.toggle(`AREA${i}`)} key={ i } id={ `dropdown-AREA-${i}`} title={'AREA'} onClick={this.onClick_AREA}>
                <DropdownToggle caret outline color='inverse'>
                  {title}
                </DropdownToggle>
                <DropdownMenu>
                {this.state.areas.map((area,index) => <DropdownItem key={index} onClick={() => this.handleSelect_AREA({area})} >{area.AREA_ID}</DropdownItem>)}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    renderDropdown_EQPGROUP = (title, i) => {
        return (
            <ButtonDropdown isOpen={this.state[`EQPGROUP${i}`]} toggle={() => this.toggle(`EQPGROUP${i}`)} key={ i } id={ `dropdown-EQPGROUP-${i}`} onClick={this.onClick_EQPGRP} >
                <DropdownToggle caret outline color='inverse'>
                  {title}
                </DropdownToggle>
                <DropdownMenu>
                {this.state.eqpgrps.map((eqpgrp,index) => <DropdownItem key={index} onClick={() => this.handleSelect_EQPGROUP({eqpgrp})} >{eqpgrp.EQP_GRP}</DropdownItem>)}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    renderDropdown_EQP = (title, i) => {
        return (
            <ButtonDropdown isOpen={this.state[`EQP${i}`]} toggle={() => this.toggle(`EQP${i}`)} key={ i } id={ `dropdown-EQP-${i}`} onClick={this.onClick_EQP}>
                <DropdownToggle caret outline color='inverse'>
                  {title}
                </DropdownToggle>
                <DropdownMenu>
                {this.state.eqps.map((eqp,index) => <DropdownItem key={index} onClick={() => this.handleSelect_EQP({eqp})} >{eqp.EQP_ID}</DropdownItem>)}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    render() {
        // const [users, setUsers] = [''];
        // const CSS = '.content-wrapper div:not(.btn-group)>.btn, .btn-group { margin: 0 4px 4px 0 }'; // space for buttons demo

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>
                        Scenario 조회
                        {/* <small>Subtitle</small> */}
                    </div>
                </div>
                {/* <Row>
                   <Col lg={12}>
                      <p>A row with content</p>
                   </Col>
                </Row> */}
                <Row>
                    <Col md={ 12 }>
                        { /* START Card */ }
                        <CardWithHeader>
                            <FormGroup row>
                                <Col lg={ 4 }>
                                    <div className="card-body d-flex align-items-center">
                                        <i className="far fa-square"></i>
                                        <label className="col-lg-3 col-form-label">FAB</label>
                                        <ButtonToolbar>{ this.state.BUTTONS_FAB.map(this.renderDropdown_FAB) }</ButtonToolbar>
                                    </div>
                                </Col>
                                <Col lg={ 4 }>
                                   <div className="card-body d-flex align-items-center">
                                        <i className="far fa-square"></i>
                                        <label className="col-lg-3 col-form-label">AREA</label>
                                         <ButtonToolbar>{ this.state.BUTTONS_AREA.map(this.renderDropdown_AREA) }</ButtonToolbar>
                                    </div>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                 <Col lg={ 4 }>
                                    <div className="card-body d-flex align-items-center">
                                        <i className="far fa-square"></i>
                                        <label className="col-lg-3 col-form-label">EQP Group</label>
                                        <ButtonToolbar>{ this.state.BUTTONS_EQPGROUP.map(this.renderDropdown_EQPGROUP) }</ButtonToolbar>
                                    </div>
                                </Col>
                                <Col lg={ 4 }>
                                    <div className="card-body d-flex align-items-center">
                                        <i className="far fa-square"></i>
                                        <label className="col-lg-3 col-form-label">EQP</label>
                                        <ButtonToolbar>{ this.state.BUTTONS_EQP.map(this.renderDropdown_EQP) }</ButtonToolbar>
                                    </div>
                                </Col>
                                <Col lg={ 4 }>
                                    <div className="card-body d-flex align-items-center">
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>Search</Button></ButtonToolbar>
                                    </div>
                                </Col>
                            </FormGroup>
                        </CardWithHeader>
                        { /* END Card */ }
                    </Col>
                </Row>
                <Row>
                    <Col xl="8">
                        <Card>
                            <CardHeader><b>시나리오 List</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    name='test'
                                    onGridSort={this.handleGridSort}
                                    columns={this.SCENARIO_LIST}
                                    rowGetter={this.SCENARIOList_Getter}
                                    onRowClick={this.onClickRow_SCENARIOLIST}
                                    rowsCount={this.state.SCENARIOLIST.length}
                                    rowClicked={this.onClickRow_SCENARIOLIST}
                                    minHeight={700} />
                            </Container>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card>
                            <CardHeader><b>시나리오 Info</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    onGridSort={this.handleGridSort}
                                    columns={this.SCENARIO_Info}
                                    rowGetter={this.SCENARIOInfo_Getter}
                                    rowsCount={this.state.SCENARIOINFO.length}
                                    minHeight={700} />
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>

        );
    }

}

export default SMapping;
