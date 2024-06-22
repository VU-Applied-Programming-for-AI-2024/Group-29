# Project Title
// IMAGE OF THE REAL FRONTEND

## Brief description of the project
<p>MYTEAM is your all-in-one solution for tracking and managing your team's games. Follow your favorite teams and add matches you are interested in to your calendar. On the home page, you can easily select a professional team to follow. Choose your team based on the sport and tournament you’re interested in, and stay up-to-date by adding their games to your calendar or your personal game list.
In addition to following professional sports, you can create and track your own games. Organize matches with friends and share the events on your calendar, making it easier for everyone to stay informed. View all the games you've added in one place. If you no longer wish to follow a particular game or if you've made an error, you can easily delete the match from your list. There is also a live games section to see the games currently being played. A</p>

## Frontend mockup

## Team members
- Bastian Brinksma, bbr103
- Morris Nijland, mni105
- Denis Akmaikin dak201
- Bob Verniers, bvs207

## Installation details

## Architecture
Frontend 
1. Select Sport -> Sport_name.  Sport_name = Database.Sport -> Sport_name_id
	Sport_name_id -> Sport.Teams, Sport.Games, etc

2. Select Player -> Team_name.  Team_Name = Database.Team ->Team_id
	Database.TeamName_id -> D.Team_stats (includes basic info and games.)



3.Select Top -> Rank of the opponent. Database.Team_rank = Database.Team_id1
	-> Team_id -> Followed_team, team_id1 = Opponent, 
	Database.Games -> Date,Team_id.
	Create Table: Followed ‘’vs’’ Opponent
4. Email = email.user.  Database.emails -> send email with Table. 

## Contribution.
We all had to work a bit together throughout the project, it wasn't that one person had to do everything by themselves. Bob and Morris started the backend together, later on Morris took charge with the details of the API implementation. Bob created the customg game and my games section of the website, allowing us to customize a database with the users custom games. Denis and Bastian led the frontend charge, also figuring out the backend of the log in page. 

Bastian and Denis tried to implement a working login and signup system with a database, this database would also be useful to store user preferences later on but we only got it working on local servers. The signup sustem works on our localhost server. We tried different things to make it accesible through the files in github or to deploy the site online but we could not make the login system work because of the issues when making it accesible for non local computers. 

- Bastian Brinksma
- Morris Nijland
- Denis Akmaikin
- Bob Verniers (2727025)

