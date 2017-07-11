# Organyzr

Welcome to Organyzr - a Lighthouse Labs final project. The application looks to solve the problem of having to text, email, use Facebook groups, and all the mundane, time-consuming tasks of organizing a sports team. Organyzr looks to assist team managers by allowing them to aggregate their schedule and players into one place, and let them send text/email notifications from the dashboard. 

Stack - Organyzr was built with a ReactJS front-end paired with Semantic-UI-React for styling components. The back-end uses a NodeJS + Express server set-up, with a PostgreSQL database implementation. Organyzr also uses a Babel+Webpack set-up, and is deployed using DigitalOcean + nginx [here](http://organyzr.ca)   

## How it Works

### As a Team Manager 

- Sign up for an account 
- Under 'Manage', create a Team - with a name/logo - and generate a unique TeamID for your players
- Input your season's schedule - Date, Time, Location
- Give your unique TeamID to your players
- Don't forget to add yourself to the roster if you are also a player 

### As a Player 

- Sign up for an account 
- Under 'My Teams', add your team by using the unique TeamID from your team manager 
- Your team scheduled games are under 'Schedule' for that particular team 
- Tell your team manager whether you are attending a specific game or not by clicking "Attending" or "Absent"
- Opt-in to the notification system by checking "Settings" - for texts and/or emails 
