import React, {Component} from 'react';
import { Icon, Form, Accordion, Segment } from 'semantic-ui-react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor (props) {
    super (props);
  };

  render () {
    let events = this.props.games.map(function(game){    
      let timeseconds = (moment.duration(game.time, "HH:mm:ss").asSeconds());
      let momentstart = moment(game.date).add(timeseconds, "s");
      let momentend = moment(game.date).add(timeseconds, "s").add(2,"h");


      let start = momentstart.toDate();
      let end = momentend.toDate();
      return {'title': game.location, 'start': start, 'end': end}
    })

    event =   {
      'title': 'All Day Event',
      'start': new Date(2017, 6, 0),
      'end': new Date(2017, 6, 1)
    }

    return (
      <Accordion name="ui accordion">
        <Accordion.Title>
          <Icon name='dropdown' />
          <span style={{fontSize: '18px'}}>Calendar</span>
        </Accordion.Title>
        <Accordion.Content>
          <Segment padded size='tiny'>
            <BigCalendar
              style={{height: '420px'}}
              events={events}
            />
          </Segment>
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default Calendar;