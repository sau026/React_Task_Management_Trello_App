import React, { Component } from 'react';
import SweetAlert from 'sweetalert2-react';
import { Multiselect } from 'multiselect-react-dropdown';
import UserDetails from '../../userDetails'
import './index.scss';

class AddTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            alertText: null,
            descriptionError: null,
            usernameError: null,
            titleError: null,
            descriptionValue: null,
            usernameValue: null,
            titleVaue: null,
            options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
            allUser: []
        };
    }

    handleChange = evt => {
        this.formValidaton(evt);
    }

    formValidaton = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        let msg = ``;
        switch (name) {
            case 'title': {
                msg = value === '' ? `Title should not be empty*` : null;
                this.setState({ titleError: msg, titleVaue: value });
                break;
            }
            case 'description': {
                msg = value === '' ? `Description should not be empty*` : null;
                this.setState({ descriptionError: msg, descriptionValue: value });
                break;
            }
            case 'username': {
                msg = value === '' ? `Username should not be empty*` : null;
                this.setState({ usernameError: msg, usernameValue: value });
                break;
            }
            default:
        }
    }

    isFormVald = () => {
        if ((this.state.titleError === null && this.state.descriptionError === null && this.state.usernameError === null) && (this.state.allUser.length > 0 && this.state.titleVaue !== null && this.state.descriptionValue !== null)) {
            this.createTask();
        } else {
            this.setState({ showAlert: true, alertText: 'All fields are compulsory' })
        }
    }

    onSelect = (data) => {
        this.setState({ allUser: data })
    }

    getAllSelectedUser = () => {
        return new Promise((resolve, reject) => {
            let allUserToAssign = this.state.allUser.map((element, i) => {
                return element.username
            })
            resolve(allUserToAssign)
        })
    }

    createTask = async () => {
        const cardData = {
            id: Math.random(),
            title: this.state.titleVaue,
            label: "default",
            cardStyle: { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
            description: this.state.descriptionValue,
            userAssigned: await this.getAllSelectedUser(),
            hide: false
        }
        let taskData = JSON.parse(localStorage.getItem('taskData'))
        taskData.lanes[0].cards.push(cardData)
        localStorage.setItem('taskData', JSON.stringify(taskData))
        this.props.taskAddedStatus()
        this.setState({ showAlert: true, alertText: 'Task Added' })
    }

    getModalJSX() {
        return (
            <>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={() => {
                            this.props.closeNewTaskModal(false)
                        }}>&times;</span>
                        <h3>Add new task</h3>
                    </div>
                    <div className="modal-body">
                        <div className="input-container">
                            <label>Title</label>
                            <input id="title" placeholder="Enter title" className="title-box" name="title" onChange={(e) => this.handleChange(e)} value={this.state.title} />
                            <p className="error-msg">{this.state.titleError}</p>
                        </div>
                        <div className="input-container">
                            <label>Description</label>
                            <textarea type="textarea" placeholder="Enter Description" rows="3" cols="50" className="desc-box" name="description" onChange={(e) => this.handleChange(e)} ></textarea>
                            <p className="error-msg">{this.state.descriptionError}</p>
                        </div>
                        <div className="input-container">
                            <label style={{ marginBottom: '10px' }}>Username</label>
                            <Multiselect
                                options={UserDetails}
                                selectedValues={this.state.selectedValue}
                                onSelect={this.onSelect}
                                onRemove={this.onRemove}
                                displayValue="name"
                            />
                            <p className="error-msg">{this.state.usernameError}</p>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button onClick={() => this.isFormVald()}>Add Task</button>
                    </div>
                </div>
            </>
        )
    }

    render() {
        return (
            <div id="myModal" className="modal">
                <SweetAlert
                    show={this.state.showAlert}
                    title=""
                    text={this.state.alertText}
                    onConfirm={() => this.setState({ showAlert: false })}
                />
                {this.getModalJSX()}
            </div>
        );
    }
}

export default AddTaskModal;
