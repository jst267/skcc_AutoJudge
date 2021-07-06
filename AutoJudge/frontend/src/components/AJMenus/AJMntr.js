import React, { Component, useState, useEffect } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Container, FormGroup, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
import Combo from '../Combo/Combo';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Swal from '../Elements/Swal';

const CardWithHeader = props => (
    <Card outline color="info" className="mb-3">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

class AJMntr extends Component {

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
            BUTTONS_STATUS : ['none'],
            SCENARIOLIST : [],
            SCENARIOINFO : [],

            swalOption3: {
                text: "조회조건을 확인해주세요",
                icon: "warning"
            },

            toTime : []
        };

        this.comboRef_FAB = React.createRef()
        this.comboRef_AREA = React.createRef()
        this.comboRef_EQPGROUP = React.createRef()
        this.comboRef_EQP = React.createRef()

        this.comboRef_FAB_MODAL = React.createRef()
        this.comboRef_AREA_MODAL = React.createRef()
        this.comboRef_EQPGROUP_MODAL = React.createRef()
        this.comboRef_EQP_MODAL = React.createRef()

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
        // if(this.state.BUTTONS_FAB == 'none' || this.state.BUTTONS_AREA == 'none')
        // {
        //     swal( this.state.swalOption3);
        // }
        // else
        // {
        //     const rScenario_List = await axios.get('http://localhost:8080/ScenarioInfo/getScenarioList?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
        //     + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP + '&' + 'EQP_ID=' + this.state.BUTTONS_EQP)
        //     this.setState({
        //         SCENARIOLIST : rScenario_List.data
        //     })
        // }

        console.log(this.state.toTime);

        const rScenario_Info = await axios.get('http://localhost:8080/JobInfo/getJobList?' + 'START_TM=' + this.state.toTime)



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
                console.log(response);
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

    changeToTime= (e) => {
        this.setState({
              toTime: moment(e).format()
          });
     }

    render() {
        // const [users, setUsers] = [''];
        // const CSS = '.content-wrapper div:not(.btn-group)>.btn, .btn-group { margin: 0 4px 4px 0 }'; // space for buttons demo

        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

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
                                <Col>
                                    <Combo button={this.state.BUTTONS_FAB} name='FAB' handleSelect={this.handleSelect} ref={this.comboRef_FAB} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getFactoryInfo')}} defaultYN={false}></Combo>
                                </Col>
                                <Col>
                                    <Combo button={this.state.BUTTONS_AREA} name='AREA' handleSelect={this.handleSelect} ref={this.comboRef_AREA} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getAreaInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB)}} defaultYN={false}></Combo>
                                </Col>
                                <Col>
                                    <Combo button={this.state.BUTTONS_EQPGROUP} name='EQP GRP' handleSelect={this.handleSelect} ref={this.comboRef_EQPGROUP} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getEqpGrpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA)}} defaultYN={false}></Combo>
                                </Col>
                                <Col>
                                    <Combo button={this.state.BUTTONS_EQP} name='EQP' handleSelect={this.handleSelect} ref={this.comboRef_EQP} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getEqpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
                                            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP)}} defaultYN={false}></Combo>
                                </Col>
                                <Col lg={2}>
                                    <div className="d-flex align-items-center">
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>조회</Button></ButtonToolbar>
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>중지</Button></ButtonToolbar>
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>강제종료</Button></ButtonToolbar>
                                    </div>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <div className="d-flex align-items-center">
                                        <Col lg={1}>
                                            <i className="fas fa-cube"></i>
                                        </Col>
                                        <Col lg={5}>
                                            <label className="col col-form-label">Date</label>
                                        </Col>
                                        <Col lg={6}>
                                            <Datetime inputProps={{className: 'form-control'}} onChange={this.changeToTime} />
                                        </Col>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="d-flex align-items-center">
                                        <Col lg={6}>
                                            <Datetime inputProps={{className: 'form-control'}} onChange={this.changeToTime} />
                                        </Col>
                                        <Col lg={1}>
                                          {/* <label className="col col-form-label"><b>~</b></label> */}
                                        </Col>
                                        <Col lg={5}>
                                        </Col>
                                    </div>
                                </Col>
                                <Col>
                                    <Combo button={this.state.BUTTONS_AREA} name='STATUS' handleSelect={this.handleSelect} ref={this.comboRef_AREA} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getAreaInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB)}} defaultYN={false}></Combo>
                                </Col>
                                <Col>
                                </Col>
                                <Col lg={2}>
                                </Col>
                            </FormGroup>

                        </CardWithHeader>
                        { /* END Card */ }
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Card outline color="info" className="mb-3">
                            <CardHeader className="text-white bg-info"><b>Job List</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    name='test'
                                    onGridSort={this.handleGridSort}
                                    columns={this.SCENARIO_LIST}
                                    rowGetter={this.SCENARIOList_Getter}
                                    onRowClick={this.onClickRow_SCENARIOLIST}
                                    rowsCount={this.state.SCENARIOLIST.length}
                                    rowClicked={this.onClickRow_SCENARIOLIST}
                                    minHeight={400} />
                            </Container>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Card outline color="info" className="mb-3">
                            <CardHeader className="text-white bg-info"><b>상세 Activity</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    onGridSort={this.handleGridSort}
                                    columns={this.SCENARIO_Info}
                                    rowGetter={this.SCENARIOInfo_Getter}
                                    rowsCount={this.state.SCENARIOINFO.length}
                                    minHeight={300} />
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>

        );
    }

}

export default AJMntr;
