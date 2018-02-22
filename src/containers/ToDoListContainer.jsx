import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import { fetchToDoList, insertTask, deleteTask, updateTask, updateTaskDuration } from "../actions/toDoList";
import { getToDoInserting, 
    getErrorOnInserting, 
    getSelectedTask, 
    getCompletedTasks, 
    getOnProgressTask, 
    getPendingTasks } from '../selectors/task';
import ToDoList from '../components/ToDoList';
import ToDoForm from '../components/ToDoForm';

import "./styles.css"
import { ROUTE_TASK_NEW, ROUTE_HOME } from '../constants/routes';
import DeletePrompt from '../components/DeletePrompt';
import { getSelectedFilter } from '../selectors/general';
import FilterSelector from '../components/FilterSelector';
import { getInitializedTimer } from '../selectors/timer';
import { startTimer, stopTimer } from '../actions/timer';

class ToDoListContainer extends Component {
    constructor(props){
        super(props);
        this.state = { timer: null }
    }
    componentDidMount = () => {
        if(this.props.onProgressTask.length === 0
        && this.props.completedTasks.length === 0){
        this.props.fetchToDoList();
        }
        //initialized the timer stopped
        this.props.stopTimer();
    }

    handleSubmit = values => {
        //convert minutes to seconds before save
        const task = { ...values };
        task.duration*= 60;

        const { taskId, selectedTask, insertTask, updateTask } = this.props;
        //Update task
        if( taskId !== undefined && selectedTask )
        {
            updateTask({ ...task }, taskId);
        }
        //Insert a new one
        else
        {
            insertTask({ ...task });
        }
    }

    handleTick = (cont) => {
        
        const { updateTaskDuration, onProgressTask } = this.props;
        const task = onProgressTask[0];

        //create the action pay load
        const payload= { id: task._id, 
            elapsed: task.elapsed + 1 };
        
        //Finish the task
        if(payload.elapsed >= task.duration)
        {
            this.handlePauseTimer();
            this.props.updateTask(
                { elapsed: payload.elapsed, status: 1 }, payload.id)
        }
        //Update the elapsed time
        else
        {            
            //Call the action
            updateTaskDuration(payload);

            //Update each 5 seconds
            if( cont % 5 === 0)
            {
                this.props.updateTask({ elapsed: payload.elapsed }, payload.id);
            }
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.inserting && !nextProps.inserting && !this.props.errorOnInserting)
        {
            this.goHome();
        }
    }

    handleAddButton = () => {
        if(this.props.showEdit)
        {
            this.goHome();
        }
        else
        {
            this.props.history.push(ROUTE_TASK_NEW);
        }
    }
    
    handleComplete = taskId => {
        //Send the update task method with status value = 1 (completed)
        this.props.updateTask({ status: 1}, taskId);
    }

    goHome = () => {
        const { lastLocation } = this.props;
        if(lastLocation && lastLocation.pathname){
            this.props.history.push(`${ROUTE_HOME}${lastLocation.search}`);
        }
        else {
            this.props.history.push(ROUTE_HOME);
        }
    }

    componentWillUnmount = () => {
        if(this.props.initializedTimer){
            this.handlePauseTimer();
        }

    }

    handleOnDeleteConfirmation = () => {
        this.props.deleteTask(this.props.selectedTask);
        this.goHome();
    }

    getInitialValues = selectedTask => (
        {
            title: selectedTask.title,
            duration: selectedTask.duration/60,
            description: selectedTask.description
        }
    )

    handlePauseTimer = () => {
        //Stop the timer in the state
        this.props.stopTimer();
        //stop timer in the component
        this.stopTimer();

        const { elapsed, _id} = this.props.onProgressTask[0];
        //Save changes
        this.props.updateTask({ elapsed }, _id);
    }

    startTimer = () => {
        var cont = 0;
        const timer = setInterval( () => { cont++;
        this.handleTick(cont)}, 1000);
        this.setState({ timer });
    }

    stopTimer = () => {
        //Remove timer
        clearInterval(this.state.timer);
    }

    handleStartTimer = () => {
        //start timer in the state
        this.props.startTimer();
        //start timer in the component
        this.startTimer();
    }

    handleStopTimer = () => {
        this.props.stopTimer();
        //stop timer in the component
        this.stopTimer();
        const { _id} = this.props.onProgressTask[0];
        //Save changes
        this.props.updateTask({ elapsed: 0 }, _id);
    }

    handleFiltterSelection = filter => {
        this.props.history.push(`${ROUTE_HOME}?filter=${filter}`)
    }
    
    render() {
        const { onProgressTask,
            pendingTasks, 
            showEdit, 
            showDelete, 
            selectedTask, 
            taskId,
            errorOnInserting,
            inserting,
            completedTasks,
            selectedFilter,
            initializedTimer
         } = this.props;
         const onEditionMode = taskId !== undefined;
         const showEditModal = (showEdit === true && !onEditionMode) ||
         ( onEditionMode && selectedTask && showEdit);
        return (
            
            <div>
                <div className="to-do-list-container-filter">
                    <FilterSelector
                    selectedFilter={selectedFilter}
                    onSelectedFilter={this.handleFiltterSelection}/>
                </div>
                <div className="to-do-list-container-label">
                    <div className="section-header">
                        <h3>En progreso:</h3>
                    </div>
                    
                    <div className="to-do-list-container-actions tooltip">
                        <span className="tooltiptext">Nueva</span>
                        <div className="fas-button" onClick={this.handleAddButton}>
                        <i className="fas fa-plus"/>
                        </div>
                    </div>
                </div>
                
                <ToDoList
                    onStartTimer={this.handleStartTimer}
                    onStopTimer={this.handleStopTimer}
                    onPauseTimer={this.handlePauseTimer}
                    onComplete={this.handleComplete}
                    startedTimer={initializedTimer}
                    tasks={onProgressTask}
                    />
                <div className="to-do-list-container-label">
                    <div className="section-header">
                        <h3>Pendientes:</h3>
                    </div>
                </div>

                <ToDoList
                    onComplete={this.handleComplete}
                    tasks={pendingTasks}
                    />


                <div className="to-do-list-container-label">
                    <div className="section-header">
                        <h3>Completadas:</h3>
                    </div>
                </div>
                <ToDoList
                    tasks={completedTasks}
                    />
                
                <DeletePrompt 
                    taskTitle={ selectedTask && selectedTask.title }
                    show={selectedTask != null && showDelete === true}
                    onCloseModal={this.goHome}
                    onDeleteConfirmation={this.handleOnDeleteConfirmation}
                    />
                {
                    showEditModal &&
                    <ToDoForm
                    editionMode={onEditionMode}
                    onCloseModal={this.goHome}
                    onSubmit={this.handleSubmit}
                    inserting={inserting}
                    errorOnInserting={errorOnInserting}
                    task={selectedTask}
                    initialValues={ selectedTask && this.getInitialValues(selectedTask)}
                    show={ showEditModal }
                    />    
                }
                
                
            </div>
        );
    }
}

ToDoListContainer.propTypes = {
    fetchToDoList: PropTypes.func.isRequired,
    showEdit: PropTypes.bool,
    showDelete: PropTypes.bool,
    inserting: PropTypes.bool.isRequired,
    errorOnInserting: PropTypes.bool.isRequired,
    taskId: PropTypes.string,
    insertTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    onProgressTask: PropTypes.array.isRequired,
    pendingTasks: PropTypes.array.isRequired,
    completedTasks: PropTypes.array.isRequired,
    lastLocation: PropTypes.object,
    initializedTimer: PropTypes.bool.isRequired,
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    updateTaskDuration: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    pendingTasks: getPendingTasks(state, props),
    completedTasks: getCompletedTasks(state),
    inserting: getToDoInserting(state),
    errorOnInserting: getErrorOnInserting(state),
    selectedTask: getSelectedTask(state, props),
    selectedFilter: getSelectedFilter(props),
    onProgressTask: getOnProgressTask(state, props),
    initializedTimer: getInitializedTimer(state),
})
const mapDispatchToProps = {
    fetchToDoList,
    insertTask,
    deleteTask, 
    updateTask,
    startTimer,
    stopTimer,
    updateTaskDuration
}

export default withLastLocation(withRouter(connect(mapStateToProps,mapDispatchToProps)(ToDoListContainer)));