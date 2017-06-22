import React, {Component} from 'react';

class Password extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      password: null,
      passwordMatch: false
    }
  }
  



}











<Form.Field width='5'>
  <label>Password</label>
  <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
</Form.Field>
<Form.Field width='5'>
  <label>Password Confirmation</label>
  <input name="confirm_password" type="password" value={this.state.confirm_password} onChange={this.handleInputChange}/>
</Form.Field>