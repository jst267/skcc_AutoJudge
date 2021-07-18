import React, { Component, useState, useEffect } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Container, FormGroup, Card, CardHeader, CardTitle, CardBody, Button,  ButtonToolbar,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import Combo from '../Combo/Combo';
import axios from 'axios';
import swal from 'sweetalert';
import { Editors } from "react-data-grid-addons";


const { DropDownEditor } = Editors;

const AutoFlagValue = [
    { id: "Y", value: "Y" },
    { id: "N", value: "N" }
]

const AutoFlagValueEditor = <DropDownEditor options={AutoFlagValue} />;

const CardWithHeader = props => (
    <Card outline color="info" className="mb-3">
        <CardHeader><CardTitle tag="h3">{props.header}</CardTitle></CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
)

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
            // BUTTONS_EQP : ['none'],
            BUTTONS_FAB_MODAL : ['none'],
            BUTTONS_AREA_MODAL : ['none'],
            BUTTONS_EQPGROUP_MODAL : ['none'],
            BUTTONS_EQP_MODAL : ['none'],
            EQPLIST : [],
            ALARMLIST : [],
            SCENARIOLIST : [],
            ACTIVITYLIST : [],
            modal: false,

            gFactory : [],
            gArea :[],
            gEqpGrp :[],

            swalOption_Confirm: {
                title: 'Are you sure?',
                text: 'Your will not be able to recover this imaginary file!',
                icon: 'warning',
                buttons: {
                    cancel: {
                        text: 'No, cancel plx!',
                        value: null,
                        visible: true,
                        className: "",
                        closeModal: false
                    },
                    confirm: {
                        text: 'Success',
                        value: true,
                        visible: true,
                        className: "bg-danger",
                        closeModal: false
                    }
                }
            },

            swalOption3: {
                text: "조회조건을 확인해주세요",
                icon: "warning",
                button: "확인"
            },

            swalOption4: {
                text: "누락된 값이 있습니다",
                icon: "warning",
                button: "확인"
            },

            swalOption_ALARM: {
                text: "알람을 선택해주세요",
                icon: "warning",
                button: "확인"
            },

            swalOption_EQP: {
                text: "장비를 선택해주세요",
                icon: "warning",
                button: "확인"
            },

            swalOption_SCNRO: {
                text: "시나리오를 선택해주세요",
                icon: "warning",
                button: "확인"
            },

            swalOption_ERROR: {
                text: "Alarm에 맞는 Scenario를 맞춰주세요",
                icon: "warning"
            },

            swalOption_REQUIRED: {
                text: "Alarm과 SCENARIO는 필수 값입니다.",
                icon: "warning"
            },

            EQPList_selectedRow : "",
            ALARMList_selectedRow : "",
            SCENARIOList_selectRow : ""
        };

        // this.IssueTypeEditor = <DropDownEditor options={this.state.AREA_ID} />;
        this.comboRef_FAB = React.createRef()
        this.comboRef_AREA = React.createRef()
        this.comboRef_EQPGROUP = React.createRef()
        this.comboRef_EQP = React.createRef()

        this.comboRef_FAB_MODAL = React.createRef()
        this.comboRef_AREA_MODAL = React.createRef()
        this.comboRef_EQPGROUP_MODAL = React.createRef()
        this.comboRef_EQP_MODAL = React.createRef()

        this.EQP_LIST = [
            {
                key: 'id',
                name: 'id',
                width: 50
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
                key: 'EQP_ID',
                name: '장비ID',
                width: 80
            },
            {
                key: 'ALARM_ID',
                name: 'ALARM ID',
                width: 80
            },
            {
                key: 'SNRO_ID',
                name: '시나리오 ID',
                width: 100
            },
            {
                key: 'AUTO_FLAG',
                name: 'Auto Flag',
                editor: AutoFlagValueEditor,
                width: 120
            },
        ];

        this.ALARM_LIST = [
            {
                key: 'ALARM_ID',
                name: 'Alarm ID',
                width: 80
            },
            {
                key: 'ALARM_CODE',
                name: 'Alarm Code',
                width: 80
            },
            {
                key: 'ALARM_DESC',
                name: 'DESC',
                width: 150
            }
        ];

        this.SCENARIO_LIST = [
            {
                key: 'SNRO_ID',
                name: 'SNRO ID',
                width: 90
            },
            {
                key: 'SNRO_NM',
                name: 'SNRO NM',
                width: 90
            },
            {
                key: 'SNRO_DESC',
                name: 'DESC',
                width: 100
            },
            {
                key: 'TRY_LIMIT_CNT',
                name: 'TRY LIMIT',
                width: 80
            }
        ];

        this.ACTIVITY_LIST = [
            {
                key: 'ACTIVITY_NM',
                name: 'ACTIBITY_NM',
                width: 100
            },
            {
                key: 'ACTIVITY_DESC',
                name: 'ACTIBITY_DESC',
                width: 120
            }
        ];
    }


    getSearchList = async () => {
        if(this.state.BUTTONS_FAB == 'none' || this.state.BUTTONS_AREA == 'none')
        {
            swal( this.state.swalOption3);
        }
        else
        {
            const rEqp_List = await axios.get('http://localhost:8080/ScenarioInfo/getScenarioList?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP + '&' + 'EQP_ID=' + this.state.BUTTONS_EQP)

            // const rAlarm_List = await axios.get('http://localhost:8080/MasterInfo/getAlarmInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA)

            this.setState({
                EQPLIST : rEqp_List.data,
                ALARMList_selectedRow : "",
                SCENARIOList_selectRow : "",
                ALARMLIST : [],
                SCENARIOLIST : [],
                ACTIVITYLIST : []
            })
        }
    }

    Save = async() => {

        if(!this.state.EQPList_selectedRow[0].ALARM_ID || !this.state.EQPList_selectedRow[0].SNRO_ID || !this.state.EQPList_selectedRow[0].AUTO_FLAG)
        {
            swal( this.state.swalOption_REQUIRED);
        }
        else
        {
            const isSuccess = await axios.get('http://localhost:8080/ScenarioInfo/setScenarioForEQP?'+ 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.EQPList_selectedRow[0].AREA_ID
            + '&' + 'EQP_GRP=' + this.state.EQPList_selectedRow[0].EQP_GRP + '&' + 'EQP_ID=' + this.state.EQPList_selectedRow[0].EQP_ID + '&' + 'ALARM_ID=' + this.state.EQPList_selectedRow[0].ALARM_ID
            + '&' + 'SNRO_ID=' + this.state.EQPList_selectedRow[0].SNRO_ID + '&' + 'AUTO_FLAG=' + this.state.EQPList_selectedRow[0].AUTO_FLAG)
            if(isSuccess.data)
            {
                swal("SUCCESS", {
                    icon: "success",
                });
            }
            else
            {
                swal( this.state.swalOption_ERROR);
            }
        }
    }

    Delete = async() => {

        // console.log(this.state.EQPLIST);

        if(!this.state.EQPList_selectedRow[0].ALARM_ID || !this.state.EQPList_selectedRow[0].SNRO_ID || !this.state.EQPList_selectedRow[0].AUTO_FLAG)
        {
            swal( this.state.swalOption_REQUIRED);
        }
        else
        {
            const isSuccess = await axios.get('http://localhost:8080/ScenarioInfo/removeScenarioForEQP?'+ 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.EQPList_selectedRow[0].AREA_ID
            + '&' + 'EQP_GRP=' + this.state.EQPList_selectedRow[0].EQP_GRP + '&' + 'EQP_ID=' + this.state.EQPList_selectedRow[0].EQP_ID + '&' + 'ALARM_ID=' + this.state.EQPList_selectedRow[0].ALARM_ID
            + '&' + 'SNRO_ID=' + this.state.EQPList_selectedRow[0].SNRO_ID + '&' + 'AUTO_FLAG=' + this.state.EQPList_selectedRow[0].AUTO_FLAG)

            // if(isSuccess.data)
            // {
                swal("SUCCESS", {
                    icon: "success",
                });
            // }
            // else
            // {
            //     swal( this.state.swalOption_ERROR);
            // }
        }

    }

    addEQP = () => {

        if(this.state.BUTTONS_FAB_MODAL == 'none' || this.state.BUTTONS_AREA_MODAL == 'none' || this.state.BUTTONS_EQPGROUP_MODAL == 'none' || this.state.BUTTONS_EQP_MODAL == 'none')
        {
            swal( this.state.swalOption4);
        }
        else
        {
            console.log(this.state.EQPLIST)
            let row = {
                        "id" : this.state.EQPLIST.length,
                        "AREA_ID" : this.state.BUTTONS_AREA_MODAL,
                        "EQP_GRP" : this.state.BUTTONS_EQPGROUP_MODAL,
                        "EQP_ID" : this.state.BUTTONS_EQP_MODAL,
                        "AUTO_FLAG" : "N"};

            const rows = this.state.EQPLIST.slice();
            rows.push(row);

            this.setState({
                EQPLIST : rows,
                modal: !this.state.modal

            });
        }
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onEQPLIST_RowsSelected = async(rows) => {

        const rAlarm_List = await axios.get('http://localhost:8080/MasterInfo/getAlarmInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + rows[0].AREA_ID)

        this.setState({
            EQPList_selectedRow : rows,
            ALARMLIST : rAlarm_List.data,
        });

        // console.log(this.state.EQPList_selectedRow);
    };

    onALARMLIST_RowsSelected = async (rows) => {

        const rScenario_List = await axios.get('http://localhost:8080/ScenarioInfo/getScenarioFromAlarm?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
        + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP + '&' + 'ALARM_ID=' + rows[0].ALARM_ID)

        this.setState({
            ALARMList_selectedRow : rows,
            SCENARIOLIST : rScenario_List.data
        });

    };

    onSCENARIOLIST_RowsSelected = async (rows) => {

        const rActivity_List = await axios.get('http://localhost:8080/ActivityInfo/getActivityList?' + 'FAB_ID=' + this.state.BUTTONS_FAB+ '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
        + '&' + 'SNRO_ID=' + rows[0].SNRO_ID)

        this.setState({
            SCENARIOList_selectRow : rows,
            ACTIVITYLIST : rActivity_List.data
        })

    };

    addALARM = () => {

        if(this.state.ALARMList_selectedRow.length == 0)
        {
            swal( this.state.swalOption_ALARM);
        }
        else if(this.state.EQPList_selectedRow.length == 0)
        {
            swal( this.state.swalOption_EQP);
        }
        else
        {
            let ALRAM = {"ALARM_ID" : this.state.ALARMList_selectedRow[0].ALARM_ID}
            const rows = this.state.EQPLIST.slice();
            let selectedRow = [];

            for (let i = 0; i < rows.length; i++) {
                if(rows[i]["EQP_ID"] == this.state.EQPList_selectedRow[0]["EQP_ID"])
                {
                    rows[i] = { ...rows[i], ...ALRAM };
                    selectedRow.push(rows[i]);
                }
            }

            this.setState({
                EQPLIST : rows,
                EQPList_selectedRow : selectedRow
            });
        }

    }

    addSCNRO = () => {

        if(this.state.SCENARIOList_selectRow.length == 0)
        {
            swal( this.state.swalOption_SCNRO);
        }
        else if(this.state.EQPList_selectedRow.length == 0)
        {
            swal( this.state.swalOption_EQP);
        }
        else
        {
            let SCNRO = {"SNRO_ID" : this.state.SCENARIOList_selectRow[0].SNRO_ID}
            const rows = this.state.EQPLIST.slice();
            let selectedRow = [];

            for (let i = 0; i < rows.length; i++) {
                if(rows[i]["EQP_ID"] == this.state.EQPList_selectedRow[0]["EQP_ID"])
                {
                    rows[i] = { ...rows[i], ...SCNRO };
                    selectedRow.push(rows[i]);
                }
            }

            this.setState({
                EQPLIST : rows,
                EQPList_selectedRow : selectedRow
            });
        }
    }

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {

          let selectedRow = [];
          const rows = this.state.EQPLIST.slice();
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
            selectedRow.push(rows[i]);
          }

          this.setState({
            EQPLIST : rows,
            EQPList_selectedRow : selectedRow
        });

      };

    removeALARM =  async () => {

        if(this.state.ALARMList_selectedRow.length == 0)
        {
            swal( this.state.swalOption_ALARM);
        }
        else if(this.state.EQPList_selectedRow.length == 0)
        {
            swal( this.state.swalOption_EQP);
        }
        else
        {

        }

    }


    EQPLIST_Getter = (i) => this.state.EQPLIST[i]
    ALARMLIST_Getter = (i) => this.state.ALARMLIST[i]
    SCENARIOLIST_Getter = (i) => this.state.SCENARIOLIST[i]
    ACTIVITYLIST_Getter = (i) => this.state.ACTIVITYLIST[i]

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

    //Combo click
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

    //Combo_MODAL click
    onClick_MODAL = async (url) => {
    	const response = await axios.get(url)

        if(url.includes('getFactory'))
        {
            this.comboRef_FAB_MODAL.current.handleData(response);
            this.setState({
                BUTTONS_AREA_MODAL : ['none'],
                BUTTONS_EQPGROUP_MODAL : ['none'],
                BUTTONS_EQP_MODAL : ['none'],
            })
        }
        else if(url.includes('getAreaInfo'))
        {
            if(this.state.BUTTONS_FAB_MODAL == 'none')
            {
                swal( this.state.swalOption3);
            }
            else
            {
                this.comboRef_AREA_MODAL.current.handleData(response);
                this.setState({
                    BUTTONS_EQPGROUP_MODAL : ['none'],
                    BUTTONS_EQP_MODAL : ['none'],
                })
            }
        }
        else if(url.includes('getEqpGrpInfo'))
        {
            if(this.state.BUTTONS_FAB_MODAL == 'none' || this.state.BUTTONS_AREA_MODAL == 'none')
            {
                swal(this.state.swalOption3);
            }
            else
            {
                this.comboRef_EQPGROUP_MODAL.current.handleData(response);
                this.setState({
                    BUTTONS_EQP_MODAL : ['none'],
                })
            }
        }
        else if(url.includes('getEqpInfo'))
        {
            if(this.state.BUTTONS_FAB_MODAL == 'none' || this.state.BUTTONS_AREA_MODAL == 'none' || this.state.BUTTONS_EQPGROUP_MODAL == 'none')
            {
                swal( this.state.swalOption3);
            }
            else
            {
                this.comboRef_EQP_MODAL.current.handleData(response);
            }
        }

    }

    handleSelect_MODAL = (SelectedValue) =>  {

        let key = Object.keys(SelectedValue.data);

        if(key == 'FAB_ID')
        {
            this.setState({
                BUTTONS_FAB_MODAL : [SelectedValue.data[key]]
            })
        }
        else if(key=='AREA_ID')
        {
            this.setState({
                BUTTONS_AREA_MODAL: [SelectedValue.data[key]]
            })
        }
        else if(key=='EQP_GRP')
        {
            this.setState({
                BUTTONS_EQPGROUP_MODAL : [SelectedValue.data[key]]
            })
        }
        else if(key=='EQP_ID')
        {
            this.setState({
                BUTTONS_EQP_MODAL : [SelectedValue.data[key]]
            })
        }
    }

    render() {

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>
                        Scenario 연결
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
                                    {/* <Combo button={this.state.BUTTONS_EQP} name='EQP' handleSelect={this.handleSelect} ref={this.comboRef_EQP} onClick={() => {this.onClick('http://localhost:8080/MasterInfo/getEqpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA
                                            + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP)}} defaultYN={false}></Combo> */}
                                </Col>
                                <Col lg={3} md={3} sm={3}>
                                    <div className="d-flex align-items-center">
                                        <ButtonToolbar><Button color="info" onClick={this.getSearchList}>조회</Button></ButtonToolbar>
                                        <ButtonToolbar><Button color="info" onClick={this.Save}>저장</Button></ButtonToolbar>
                                        <ButtonToolbar><Button color="info" onClick={this.Delete}>삭제</Button></ButtonToolbar>
                                        <ButtonToolbar><Button color="info" onClick={this.toggleModal}>장비추가</Button></ButtonToolbar>
                                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                                            <ModalHeader toggle={this.toggleModal}>장비 List 추가</ModalHeader>
                                            <ModalBody>
                                                <FormGroup row>
                                                    <Col>
                                                        <Combo button={this.state.BUTTONS_FAB_MODAL} name='FAB' handleSelect={this.handleSelect_MODAL} ref={this.comboRef_FAB_MODAL} onClick={() => {this.onClick_MODAL('http://localhost:8080/MasterInfo/getFactoryInfo')}} defaultYN={false}></Combo>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col>
                                                        <Combo button={this.state.BUTTONS_AREA_MODAL} name='AREA' handleSelect={this.handleSelect_MODAL} ref={this.comboRef_AREA_MODAL} onClick={() => {this.onClick_MODAL('http://localhost:8080/MasterInfo/getAreaInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB_MODAL)}} defaultYN={false}></Combo>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col>
                                                        <Combo button={this.state.BUTTONS_EQPGROUP_MODAL} name='EQP GRP' handleSelect={this.handleSelect_MODAL} ref={this.comboRef_EQPGROUP_MODAL} onClick={() => {this.onClick_MODAL('http://localhost:8080/MasterInfo/getEqpGrpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB_MODAL + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA_MODAL)}} defaultYN={false}></Combo>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col>
                                                        <Combo button={this.state.BUTTONS_EQP_MODAL} name='EQP' handleSelect={this.handleSelect_MODAL} ref={this.comboRef_EQP_MODAL} onClick={() => {this.onClick_MODAL('http://localhost:8080/MasterInfo/getEqpInfo?' + 'FAB_ID=' + this.state.BUTTONS_FAB_MODAL + '&' + 'AREA_ID=' + this.state.BUTTONS_AREA_MODAL
                                                                + '&' +'EQP_GRP=' + this.state.BUTTONS_EQPGROUP_MODAL)}} defaultYN={false}></Combo>
                                                    </Col>
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.addEQP}>추가</Button>{' '}
                                                <Button color="secondary" onClick={this.toggleModal}>취소</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                </Col>
                            </FormGroup>
                        </CardWithHeader>
                        { /* END Card */ }
                    </Col>
                </Row>
                <Row>
                    <Col lg={5} md={5} sm={5}>
                        <Card outline color="info" className="mb-3">
                            <CardHeader className="text-white bg-info"><b>장비 List</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    rowKey="id"
                                    onGridSort={this.handleGridSort}
                                    columns={this.EQP_LIST}
                                    enableRowSelect={'single'}
                                    rowGetter={this.EQPLIST_Getter}
                                    rowsCount={this.state.EQPLIST.length}
                                    minHeight={765}
                                    onRowSelect={this.onEQPLIST_RowsSelected}
                                    onGridRowsUpdated={this.onGridRowsUpdated}
                                    enableCellSelect={true}/>
                            </Container>
                        </Card>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                        <Row>
                            <Col lg={2} md={2} sm={2}>
                                <Row className="align-items-center">
                                    <div className="card-body d-flex">
                                        <Button color="warning" onClick={this.addALARM} size="lg">
                                                <i className="fa fa-arrow-left"></i>
                                        </Button>
                                    </div>
                                </Row>
                            </Col>
                            <Col lg={10} md={10} sm={10}>
                                <Card>
                                        <CardHeader className="text-white bg-info"><b>Alarm List</b></CardHeader>
                                        <Container fluid>
                                            <ReactDataGrid
                                                rowKey="ALARM_ID"
                                                onGridSort={this.handleGridSort}
                                                enableRowSelect={'single'}
                                                columns={this.ALARM_LIST}
                                                rowGetter={this.ALARMLIST_Getter}
                                                rowsCount={this.state.ALARMLIST.length}
                                                minHeight={350}
                                                onRowSelect={this.onALARMLIST_RowsSelected} />
                                        </Container>
                                    </Card>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={2} md={2} sm={2}>
                                <Row className="align-items-center">
                                    <div className="card-body d-flex">
                                        <Button color="warning" onClick={this.addSCNRO} size="lg">
                                                <i className="fa fa-arrow-left"></i>
                                        </Button>
                                    </div>
                                </Row>
                            </Col>
                            <Col lg={10} md={10} sm={10}>
                                <Card outline color="info" className="mb-3">
                                    <CardHeader className="text-white bg-info"><b>시나리오 List</b></CardHeader>
                                    <Container fluid>
                                        <ReactDataGrid
                                            rowKey="SNRO_ID"
                                            onGridSort={this.handleGridSort}
                                            enableRowSelect={'single'}
                                            columns={this.SCENARIO_LIST}
                                            rowGetter={this.SCENARIOLIST_Getter}
                                            rowsCount={this.state.SCENARIOLIST.length}
                                            minHeight={350}
                                            onRowSelect={this.onSCENARIOLIST_RowsSelected} />
                                    </Container>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3} md={3} sm={3}>
                        <Card outline color="info" className="mb-3">
                            <CardHeader className="text-white bg-info"><b>Activity List</b></CardHeader>
                            <Container fluid>
                                <ReactDataGrid
                                    onGridSort={this.handleGridSort}
                                    columns={this.ACTIVITY_LIST}
                                    rowGetter={this.ACTIVITYLIST_Getter}
                                    rowsCount={this.state.ACTIVITYLIST.length}
                                    minHeight={765} />
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>

        );
    }

}

export default SMapping;
