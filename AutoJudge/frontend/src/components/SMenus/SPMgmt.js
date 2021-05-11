import React, { Component, useState, useEffect } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Container, FormGroup, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
import Combo from '../Combo/Combo';
import Swal from '../Elements/Swal';

const CardWithHeader = props => (
    <Card className="card-default">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)


class SPMgmt extends Component {

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
            EQPGRPLIST : [],
            SCENARIOPOOL : [],
            ALLSCENARIOLIST : [],
            SCENARIOINFO : [],

            gFactory : [],
            gArea :[],
            gEqpGrp :[],

            swalOption2: {
                text: "조회조건을 확인해주세요",
                icon: "warning"
            },

            swalOption3: {
                text: "조회조건을 확인해주세요",
                icon: "warning"
            },

            SNROPool_selectedRow : [],
            ALLSNRO_selectedRow : [],

        };

        this.comboRef_FAB = React.createRef()
        this.comboRef_AREA = React.createRef()
        this.comboRef_EQPGROUP = React.createRef()
        this.comboRef_EQP = React.createRef()

        this.EQPGRP_LIST = [
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
                name: 'AREA',
                width: 80
            },
            {
                key: 'EQP_GRP',
                name: '장비그룹',
                width: 80
            },
            {
                key: 'SNRO_CNT',
                name: 'SNRO COUNT',
                width: 120
            }
        ];

        this.SCENARIO_POOL = [
            {
                key: 'SNRO_ID',
                name: 'SNRO ID',
                width: 100
            },
            {
                key: 'SNRO_NM',
                name: 'SNRO NM',
                width: 150
            },
            {
                key: 'SNRO_DESC',
                name: 'DESC',
                width: 150
            },
            {
                key: 'TRY_LIMIT_CNT',
                name: 'TRY LIMIT',
                width: 150
            }
        ];

        this.ALL_SCENARIO_LIST = [
            {
                key: 'SNRO_ID',
                name: '시나리오 ID',
                width: 100
            },
            {
                key: 'SNRO_NM',
                name: '시나리오 이름',
                width: 100
            },
            {
                key: 'SNRO_DESC',
                name: '시나리오 설명',
                width: 100
            },
            {
                key: 'TRY_LIMIT_CNT',
                name: 'TRY LIMIT',
                width: 80
            }
        ];

        this.SCENARIO_INFO = [
            {
                key: 'ACTIVITY_NM',
                name: 'ACTIBITY_NM',
                width: 150
            },
            {
                key: 'ACTIVITY_DESC',
                name: 'ACTIBITY_DESC',
                width: 150
            }
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
        if(this.state.BUTTONS_FAB == 'none')
        {
            swal( this.state.swalOption3);
        }
        else
        {
            const rEqpGrp_List = await axios.get('http://localhost:8080/ScenarioInfo/getEqpGrpListForSNROCNT?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP)
            this.setState({
                EQPGRPLIST : rEqpGrp_List.data,
                SCENARIOPOOL : [],
                ALLSCENARIOLIST : [],
                SCENARIOINFO : []
            })
        }
    }

    addSCNRO =  async (rowInfo) => {

        const isSuccess = await axios.get('http://localhost:8080/ScenarioInfo/addScenarioPool?' + 'FAB_ID=' + this.state.gFactory + '&' + 'AREA_ID=' + this.state.gArea
        + '&' + 'EQP_GRP=' + this.state.gEqpGrp + '&' + 'SNRO_ID=' + this.state.ALLSCENARIOLIST[this.state.ALLSNRO_selectedRow].SNRO_ID)

    }

    removeSCNRO =  async () => {

        const isSuccess = await axios.get('http://localhost:8080/ScenarioInfo/removeScenarioPool?' + 'FAB_ID=' + this.state.gFactory + '&' + 'AREA_ID=' + this.state.gArea
        + '&' + 'EQP_GRP=' + this.state.gEqpGrp + '&' + 'SNRO_ID=' + this.state.SCENARIOPOOL[this.state.SNROPool_selectedRow].SNRO_ID)

    }

    onClickRow_EQPGRP_LIST = async(rowInfo) => {

        const rScenario_Pool = await axios.get('http://localhost:8080/ScenarioInfo/getScenarioFromEqpGrp?' + 'FAB_ID=' + this.state.EQPGRPLIST[rowInfo].FAB_ID + '&' + 'AREA_ID=' + this.state.EQPGRPLIST[rowInfo].AREA_ID
        + '&' + 'EQP_GRP=' + this.state.EQPGRPLIST[rowInfo].EQP_GRP)

        const rALL_Scenario_List = await axios.get('http://localhost:8080/ScenarioInfo/getAllScenarioList?' + 'FAB_ID=' + this.state.EQPGRPLIST[rowInfo].FAB_ID + '&' + 'AREA_ID=' + this.state.EQPGRPLIST[rowInfo].AREA_ID
        + '&' + 'EQP_GRP=' + this.state.EQPGRPLIST[rowInfo].EQP_GRP)

        this.setState({
            SCENARIOPOOL : rScenario_Pool.data,
            ALLSCENARIOLIST : rALL_Scenario_List.data,
            gFactory : [this.state.EQPGRPLIST[rowInfo].FAB_ID],
            gArea : [this.state.EQPGRPLIST[rowInfo].AREA_ID],
            gEqpGrp : [this.state.EQPGRPLIST[rowInfo].EQP_GRP]
        })
    }

    onClickRow_SCENARIOPool = async(rowInfo) => {

        const rActivity_List = await axios.get('http://localhost:8080/ActivityInfo/getActivityList?' + 'FAB_ID=' + this.state.gFactory+ '&' + 'AREA_ID=' + this.state.gArea
        + '&' + 'SNRO_ID=' + this.state.SCENARIOPOOL[rowInfo].SNRO_ID)

        this.setState({
            SCENARIOINFO : rActivity_List.data,
            SNROPool_selectedRow : rowInfo
        })
    }

    onClickRow_ALLSCENARIOLIST = async(rowInfo) => {

        const rActivity_List = await axios.get('http://localhost:8080/ActivityInfo/getActivityList?' + 'FAB_ID=' + this.state.gFactory+ '&' + 'AREA_ID=' + this.state.gArea
        + '&' + 'SNRO_ID=' + this.state.ALLSCENARIOLIST[rowInfo].SNRO_ID)

        this.setState({
            SCENARIOINFO : rActivity_List.data,
            ALLSNRO_selectedRow : rowInfo
        })
    }


    EQPGRPLIST_Getter = (i) => this.state.EQPGRPLIST[i]
    SCENARIOPool_Getter = (i) => this.state.SCENARIOPOOL[i]
    ALLSCENARIOLIST_Getter = (i) => this.state.ALLSCENARIOLIST[i]
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

    handleSelect = (SelectedValue) =>  {

        let key = Object.keys(SelectedValue.data);

        if(key == 'FAB_ID')
        {
            this.setState({
                BUTTONS_FAB : [SelectedValue.data[key]]
            })
        }
        else if(key=='AREA_ID')
        {
            this.setState({
                BUTTONS_AREA : [SelectedValue.data[key]]
            })
        }
        else if(key=='EQP_GRP')
        {
            this.setState({
                BUTTONS_EQPGROUP : [SelectedValue.data[key]]
            })
        }
        else if(key=='EQP_ID')
        {
            this.setState({
                BUTTONS_EQP : [SelectedValue.data[key]]
            })
        }
    }

    //FAB Combo click
    onClick = async (url) => {
    	const response = await axios.get(url)

        if(url.includes('getFactory'))
        {
            this.comboRef_FAB.current.handleData(response);
            this.setState({
                BUTTONS_AREA : ['none'],
                BUTTONS_EQPGROUP : ['none'],
                BUTTONS_EQP : ['none'],
            })
        }
        else if(url.includes('getAreaInfo'))
        {
            if(this.state.BUTTONS_FAB == 'none')
            {
                swal( this.state.swalOption3);
            }
            else
            {
                this.comboRef_AREA.current.handleData(response);
                this.setState({
                    BUTTONS_EQPGROUP : ['none'],
                    BUTTONS_EQP : ['none'],
                })
            }
        }
        else if(url.includes('getEqpGrpInfo'))
        {
            if(this.state.BUTTONS_FAB == 'none' || this.state.BUTTONS_AREA == 'none')
            {
                swal(this.state.swalOption3);
            }
            else
            {
                this.comboRef_EQPGROUP.current.handleData(response);
                this.setState({
                    BUTTONS_EQP : ['none'],
                })
            }
        }
        else if(url.includes('getEqpInfo'))
        {
            if(this.state.BUTTONS_FAB == 'none' || this.state.BUTTONS_AREA == 'none' || this.state.BUTTONS_EQPGROUP == 'none')
            {
                swal( this.state.swalOption3);
            }
            else
            {
                this.comboRef_EQP.current.handleData(response);
            }
        }

    }

    render() {
        // const [users, setUsers] = [''];
        const CSS = '.content-wrapper div:not(.btn-group)>.btn, .btn-group { margin: 0 4px 4px 0 }'; // space for buttons demo

        return (
            <ContentWrapper>
                <style>{CSS}</style>
                <div className="content-heading">
                    <div>
                        <b>Scenario Pool 관리</b>
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
                            {/* <FormGroup row>
                                <Col lg={ 4 }>
                                    <Combo button={this.state.BUTTONS_FAB} name='FAB' handleSelect={this.handleSelect} ref={this.comboRef_FAB} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getFactoryInfo')}} defaultYN={false}></Combo>
                                </Col>
                                <Col lg={ 4 }>
                                    <Combo button={this.state.BUTTONS_AREA} name='AREA' handleSelect={this.handleSelect} ref={this.comboRef_AREA} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getAreaInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB)}} defaultYN={false}></Combo>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col lg={ 4 }>
                                    <Combo button={this.state.BUTTONS_EQPGROUP} name='EQP GRP' handleSelect={this.handleSelect} ref={this.comboRef_EQPGROUP} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getEqpGrpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA)}} defaultYN={false}></Combo>
                                </Col>
                                <Col lg={ 4 }>
                                    <Combo button={this.state.BUTTONS_EQP} name='EQP' handleSelect={this.handleSelect} ref={this.comboRef_EQP} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getEqpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
                                            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP)}} defaultYN={false}></Combo>
                                </Col>
                                <Col lg={ 1 }>
                                    <div className="card-body d-flex">
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>Search</Button></ButtonToolbar>
                                    </div>
                                </Col>
                                <Col lg={ 3 }>
                                    <div className="card-body d-flex">
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>Save</Button></ButtonToolbar>
                                    </div>
                                </Col>
                            </FormGroup> */}
                            <FormGroup row>
                                <Col>
                                    <Combo button={this.state.BUTTONS_FAB} name='FAB' handleSelect={this.handleSelect} ref={this.comboRef_FAB} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getFactoryInfo')}} defaultYN={false}></Combo>
                                </Col>
                                <Col>
                                    <Combo button={this.state.BUTTONS_AREA} name='AREA' handleSelect={this.handleSelect} ref={this.comboRef_AREA} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getAreaInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB)}} defaultYN={false}></Combo>
                                </Col>
                                <Col>
                                    <Combo button={this.state.BUTTONS_EQPGROUP} name='EQP GRP' handleSelect={this.handleSelect} ref={this.comboRef_EQPGROUP} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getEqpGrpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA)}} defaultYN={false}></Combo>
                                </Col>
                                {/* <Col>
                                    <Combo button={this.state.BUTTONS_EQP} name='EQP' handleSelect={this.handleSelect} ref={this.comboRef_EQP} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getEqpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
                                            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP)}} defaultYN={false}></Combo>
                                </Col> */}
                                <Col lg={2}>
                                    <div className="d-flex align-items-center">
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>Search</Button></ButtonToolbar>
                                        {/* <ButtonToolbar><Button color="info" onClick={this.getSearchList}>Save</Button></ButtonToolbar> */}
                                        {/* <ButtonToolbar><Button color="info" onClick={this.getSearchList}>SAVE</Button></ButtonToolbar> */}
                                    </div>
                                </Col>
                            </FormGroup>
                        </CardWithHeader>
                        { /* END Card */ }
                    </Col>
                </Row>
                <Row>
                    <Col xl="4">
                        <Card>
                            <CardHeader><b>장비 그룹 List</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    onGridSort={this.handleGridSort}
                                    columns={this.EQPGRP_LIST}
                                    rowGetter={this.EQPGRPLIST_Getter}
                                    onRowClick={this.onClickRow_EQPGRP_LIST}
                                    rowsCount={this.state.EQPGRPLIST.length}
                                    minHeight={765} />
                            </Container>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card>
                            <CardHeader><b>시나리오 Pool</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    onGridSort={this.handleGridSort}
                                    columns={this.SCENARIO_POOL}
                                    rowGetter={this.SCENARIOPool_Getter}
                                    onRowClick={this.onClickRow_SCENARIOPool}
                                    rowsCount={this.state.SCENARIOPOOL.length}
                                    minHeight={765} />
                            </Container>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Row>
                            <Col xl="2">
                                <Row className="align-items-center">
                                    <div className="card-body d-flex">
                                        <Button color="warning" onClick={this.addSCNRO} size="lg">
                                                <i className="fa fa-arrow-left"></i>
                                        </Button>
                                    </div>
                                    <div className="card-body d-flex">
                                        <Button color="warning" onClick={this.removeSCNRO} size="lg">
                                            <i className="fa fa-arrow-right"></i>
                                        </Button>
                                    </div>
                                </Row>
                            </Col>
                            <Col xl="10">
                                <Card>
                                        <CardHeader><b>전체 시나리오 List</b></CardHeader>
                                        <Container fluid>
                                            <ReactDataGrid
                                                onGridSort={this.handleGridSort}
                                                columns={this.ALL_SCENARIO_LIST}
                                                rowGetter={this.ALLSCENARIOLIST_Getter}
                                                onRowClick={this.onClickRow_ALLSCENARIOLIST}
                                                rowsCount={this.state.ALLSCENARIOLIST.length}
                                                minHeight={350} />
                                        </Container>
                                    </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl="12">
                                <Card>
                                    <CardHeader><b>시나리오 Info</b></CardHeader>
                                    <Container fluid>
                                        <ReactDataGrid
                                            onGridSort={this.handleGridSort}
                                            columns={this.SCENARIO_INFO}
                                            rowGetter={this.SCENARIOInfo_Getter}
                                            rowsCount={this.state.SCENARIOINFO.length}
                                            minHeight={350} />
                                    </Container>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ContentWrapper>

        );
    }

}

export default SPMgmt;
