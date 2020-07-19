import React, { Component } from 'react';
import AddTaskModal from '../../components/add-task-modal';
import DashboardSubHeader from '../../components/dashboard-sub-header';
import Board from 'react-trello';
import Sidebar from '../../components/sidebar-left'
import Header from '../../components/header'
import './index.scss';
import boardDataTemplate from '../../assets/boardDataTemplate'
import CustomCard from '../../components/custom-card'

class TaskDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddTaskModal: false,
      boardData:null,
      showMyTask: false,
      addTaskModal: false,
      loadingStatus: true
    };
    this.username = null;
    this.originalBoardData = null;
  }

  componentDidMount() {
    this.username = localStorage.getItem('username');
    if(!this.username){
      this.props.history.push('/');
    }else{
      this.getTrelloBoardData()
    }
  }

  getTrelloBoardData(){
    const taskData = localStorage.getItem('taskData');
    if (!taskData) {
      localStorage.setItem('taskData', JSON.stringify(boardDataTemplate))
      this.setState({boardData: boardDataTemplate, loadingStatus:false})
    } else {
      this.originalBoardData = JSON.parse(taskData);
      this.setState({boardData: JSON.parse(taskData), loadingStatus:false})
    }
  }

  showMyTaskOnly = (showMyTask) => {
     const boardData = this.state.boardData.lanes.map((element, i)=>{
      if(element.cards && element.cards.length > 0){
        element.cards.map((card, i)=>{
          if(card.userAssigned.includes(this.username) && showMyTask){
            card.hide = false;
          } else {
            card.hide = showMyTask ? true : false;
          }
          return element
        })
      }
      return element;
    })
    return {lanes:boardData} 
  }

  onDataChange = (newData) => {
    localStorage.setItem('taskData', JSON.stringify(newData))
    this.setState({boardData: newData})
  }

  getNewTaskModalJSX = () => {
    return( 
      <>
          <button className="fab-btn" onClick={() => this.setState({ openAddTaskModal: true })}>+</button>
          {this.state.openAddTaskModal && <AddTaskModal closeNewTaskModal={(modalStatus)=>{
            this.setState({openAddTaskModal:modalStatus})
          }} taskAddedStatus={()=>{
            this.getTrelloBoardData();
          }}/>}
      </>
    ) 
  }

  getAppHeaderJSX(){
    return(
      <>
        <Header />
        <DashboardSubHeader showMyTaskOnlyProps={(status)=>{
            let newBoardData = this.showMyTaskOnly(status);
            this.setState({boardData:newBoardData})
          }}></DashboardSubHeader>
      </>
    )
  }

  getAppSidebarJSX(){
    return(
      <div className="side-panel">
        <Sidebar></Sidebar>
      </div>
    )
  }

  getAppBoardJSX(){
    const components = {
      LaneHeader: (d) => <h4>{d.title}</h4>,
      Card: CustomCard
    };
    return(
     <>
      <Board style={{ background: '#ffffff' }}
            className="main-task-board" 
            data={this.state.boardData}
            components={components} 
            onDataChange={this.onDataChange}
          />
     </>
    )
  }

  render() {
    if(this.state.loadingStatus){
      return(
        <div className="spinner">
          <i className="fas fa-spinner fa-spin icon"></i>
        </div>
      )

    }
    return (
      <div className="dashboard__page-conatiner -site-text-size">
        {this.getNewTaskModalJSX()}
        {this.getAppSidebarJSX()}
        <div className="main-body">
          {this.getAppHeaderJSX()}
          {this.getAppBoardJSX()}
        </div>
      </div>
    );
  }
}

export default TaskDashboard;
