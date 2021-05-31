import React, { Component, useState, useEffect } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Container, FormGroup, Card, CardHeader, CardTitle, CardBody, Button, ButtonGroup, ButtonToolbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
import Combo from '../Combo/Combo';
import Swal from '../Elements/Swal';

const CardWithHeader = props => (
    <Card outline color="info" className="mb-3">
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

class SSearch extends Component {

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
                icon: "warning",
                button: "확인"
            },

            select : "",

        };

        this.comboRef_FAB = React.createRef()
        this.comboRef_AREA = React.createRef()
        this.comboRef_EQPGROUP = React.createRef()
        this.comboRef_EQP = React.createRef()

        this.SCENARIO_LIST = [
            // {
            //     key: 'id',
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
                name: 'AREAID',
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
        ];

        this.SCENARIO_Info = [
            {
                key: 'ACTIVITY_NM',
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

    // getRandomDate = (start, end) => {
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    // };

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
                SCENARIOLIST : rScenario_List.data,
                SCENARIOINFO : []
            })
        }
    }

    onClickRow_SCENARIOLIST = async(rowInfo) => {


        this.state.SCENARIOLIST[rowInfo].isSelected = true;

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

    // rowCheck = (rowIdx) => {
    //     var tableState=this.state.tableState.concat([])
    //     tableState[rowIdx.rowIdx].CHECKED='Y'
    //     this.setState({tableState})
    //   }

    // RowRenderer = ({ renderBaseRow, ...props }) => {
    //     const backsgroundColor = props.SNRO_ID % 2 ? "green" : "blue";
    //     return <div style="background-color: ivory">{renderBaseRow(props)}</div>;
    //   };

    RowRenderer = ({ renderBaseRow, ...props }) => {
        return renderBaseRow({...props, width: 500});
      };

    onSelectionChange = (({ selected }) => {
        this.setState({
            select : selected,
        })
    }, [])

    render() {
        // const [users, setUsers] = [''];
        // const CSS = '.content-wrapper div:not(.btn-group)>.btn, .btn-group { margin: 0 4px 4px 0 }'; // space for buttons demo

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>
                        <b>Scenario 조회</b>
                    </div>
                </div>
                <Row>
                    <Col lg={12} md={12} sm={12}>
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
                                <Col lg={2} md={2} sm={2}>
                                    <div className="d-flex align-items-center">
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>Search</Button></ButtonToolbar>
                                    </div>
                                </Col>
                            </FormGroup>
                        </CardWithHeader>
                        { /* END Card */ }
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} md={8} sm={8} xl={8}>
                        <Card outline color="info" className="mb-3">
                            <CardHeader className="text-white bg-info"><b>시나리오 List</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    // onGridSort={this.handleGridSort}
                                    columns={this.SCENARIO_LIST}
                                    rowGetter={this.SCENARIOList_Getter}
                                    onRowClick={this.onClickRow_SCENARIOLIST}
                                    rowsCount={this.state.SCENARIOLIST.length}
                                    rowRenderer={this.RowRenderer}
                                    // onSelectionChange={this.onSelectionChange}
                                    minHeight={700} />
                            </Container>
                        </Card>
                    </Col>
                    <Col lg={4} md={4} sm={4} xl={4}>
                    <Card outline color="info" className="mb-3">
                            <CardHeader className="text-white bg-info"><b>시나리오 Info</b></CardHeader>
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

export default SSearch;
