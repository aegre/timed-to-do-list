import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { connect } from 'react-redux';

import { fetchToDoList } from '../actions/toDoList';
import { getCompletedTasks } from '../selectors/task';
import { converTaskToChartData } from '../helpers/convertTasksToChartData';

import "./styles.css"

class ChartsContainer extends Component {
    componentDidMount = () => {
        const { tasks, fetchToDoList } = this.props;
        if(tasks.length === 0)
        {
            fetchToDoList();
        }
    }

    render() {
        const { tasks } = this.props;
        const chartData = converTaskToChartData(tasks);
        return (
            <div className="chart-container">
                <div><h3>Tareas terminadas por día</h3></div>
                <div>
                <BarChart width={550} height={250} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Tareas finalizadas" fill="#8884d8" />
                    <Legend/>
                </BarChart>
                </div>
                <div><h3>Tiempo ocupado/previsto por día (mn.)</h3></div>
                <div>
                <BarChart width={600} height={250} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalTime" name="Tiempo ocupado" fill="#8884d8" />
                    <Bar dataKey="expectedTime" name="Tiempo previsto" fill="#8884d8" />
                </BarChart>
                </div>
            </div>
        );
    }
}

ChartsContainer.propTypes = {
    tasks: PropTypes.array,
    fetchToDoList: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    tasks: getCompletedTasks(state, props),
})
const mapDispatchToProps = {
    fetchToDoList
}


export default connect(mapStateToProps, mapDispatchToProps)(ChartsContainer);
