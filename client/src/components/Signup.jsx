import React, {Component} from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react'

const Signup = () => (
  <div>
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input placeholder='First Name' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder='Last Name' />
      </Form.Field>
      <Form.Field>
        <label>Team Name</label>
        <input placeholder='Team Name' />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input placeholder='Email Name' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input/>
      </Form.Field>
      <Form.Field>
        <label>Password Confirmation</label>
        <input/>
      </Form.Field>
      <Form.Field>
        <label>Phone Number</label>
        <input placeholder='10 digits' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  </div>
)

export default Signup;