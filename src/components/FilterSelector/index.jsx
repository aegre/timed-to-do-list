import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_SHORT, FILTER_MEDIUM, FILTER_LONG, FILTER_ALL } from '../../constants';

class FilterSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { hide: true }
    }

    dipsatchFilterSelection = filter => (
        () => {
            const { onSelectedFilter } = this.props;
            onSelectedFilter(filter);
        }
    )

    validCheckedFilter = filter => (
        filter === FILTER_LONG ||
        filter === FILTER_MEDIUM ||
        filter === FILTER_SHORT
    )

    renderRadios= (selectedFilter) => (
        <div>
            <div>Filtrar por duración:</div>
            <div>
                <input id="filter-radio-all" type="radio" 
                name="filter" value="all"
                onChange={this.dipsatchFilterSelection(FILTER_ALL)}
                checked={!this.validCheckedFilter(selectedFilter) ? "checked": ""}
                />

                <label htmlFor="filter-radio-all">Todos</label>
                    
                <input id="filter-radio-short" type="radio" 
                    name="filter" value="short" 
                    checked={selectedFilter === FILTER_SHORT ? "checked" : ""}
                    onChange={this.dipsatchFilterSelection(FILTER_SHORT)} />
                    
                <label htmlFor="filter-radio-short">Corta</label>
                    
                <input id="filter-radio-medium" type="radio" 
                    name="filter" value="medium" 
                    checked={selectedFilter === FILTER_MEDIUM ? "checked" : ""}
                    onChange={this.dipsatchFilterSelection(FILTER_MEDIUM)}/>
                    
                <label htmlFor="filter-radio-medium">Media</label>
                    
                <input id="filter-radio-long" type="radio" 
                    name="filter" value="long" 
                    checked={selectedFilter === FILTER_LONG ? "checked" : ""}
                    onChange={this.dipsatchFilterSelection(FILTER_LONG)}/>
                    
                <label htmlFor="filter-radio-long">Larga</label>
            </div>
        </div>
    )

    toggleFilters = () => {
        this.setState({ hide: !this.state.hide })
    }

    render() {
        const {selectedFilter} = this.props;
        const { hide } = this.state;
        return (
            <div>
                <div className="fas-button" onClick={this.toggleFilters}>
                    <i className="fas fa-filter"></i>
                </div>
                { !hide && this.renderRadios(selectedFilter)}
                
                
            </div>
        );
    }
}

FilterSelector.propTypes = {
    selectedFilter: PropTypes.string,
    onSelectedFilter: PropTypes.func.isRequired,
};

export default FilterSelector;