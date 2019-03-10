import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actions from '../../store/actions'

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { counter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
        }
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={() => this.props.dispatch({ type: actions.INCREMENT })} />
                <CounterControl label="Decrement" clicked={() => this.props.dispatch({ type: actions.DECREMENT })} />
                <CounterControl label="Add 5" clicked={() => this.props.dispatch({ type: actions.ADD, value: 5 })} />
                <CounterControl label="Subtract 5" clicked={() => this.props.dispatch({ type: actions.SUBTRACT, value: 5 })} />
                <hr />
                <button onClick={() => this.props.dispatch({ type: actions.STORE_RESULT, result: this.props.ctr })}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li
                            key={strResult.id}
                            onClick={() => this.props.dispatch({ type: 'DELETE_RESULT', id: strResult.id})}
                        >
                            {strResult.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
//         onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
//         onAddCounter: () => dispatch({type: 'ADD', value: 5}),
//         onSubtractCounter: () => dispatch({type: 'SUBTRACT', value: 5}),
//         onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
//         onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', id}),
//     }
// }

export default connect(mapStateToProps)(Counter);
