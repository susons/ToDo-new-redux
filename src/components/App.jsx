import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      dueDate: '',
    }
  }

  addReminder() {
    console.log('state due date' , this.state.dueDtate)
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id)
  }

  renderReminders() {
    const { reminders } = this.props;
    // console.log('Consolelog',reminders)
    return (
      <div style={{ display: 'block', width: '100%'}}>
      <ul style={{flex: '0 0 100%', maxWidth: '100%'}} className='list-group col-sm-4'>
      {
        reminders.map(reminder => {
          return (
            <li
            key={reminder.id}
            className='list-group-item'
            >
              <div className='list-item'>
                <div>{reminder.text}</div>
                <div><em>{ moment(new Date(reminder.dueDate)).fromNow()}</em></div>
              </div>
              <div className='list-group delete-button' onClick={() => this.deleteReminder(reminder.id)}>
                &#x2715;
              </div>
            </li>
          )
        })
      }
      </ul>
      </div>
    )
  }

  render() {
    return(
      <div className='App'>
        <div className='Title'>
          Reminder PRO
        </div>
        <div className='form-inline reminder-form'>
          <div className='form-group'>
            <input
            className='form-control'
            placeholder='I have to...'
            onChange={e => this.setState({text: e.target.value})}
            />
            <input
            className='form-control'
            type='datetime-local'
            onChange={e => this.setState({dueDate: e.target.value})}
            />
          </div>
          
          <button
          type='button'
          className='btn btn-success'
          onClick={() => this.addReminder()}
          >Add Reminder</button>
        </div>
        {this.renderReminders()}
        <div className='brn btn-danger' onClick={()=> this.props.clearReminders()}>
          Clear reminders
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

// export default connect(null, mapDispatchToProps)(App);
export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);