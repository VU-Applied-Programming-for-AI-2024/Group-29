# Project Title
// IMAGE OF THE REAL FRONTEND

## Brief description of the project
A website where a fan can select the sport they want to follow, then select the team they want to follow, and then select what they want to be notified for. An example would be: choosing football, then picking every time man city is playing a top 5 team in the epl. 

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
We all had to work a bit together throughout the project, it wasn't that one person had to do everything by themselves. Bob and Morris started the backend together, later on Morris took charge with the details of the API implementa

- Bastian Brinksma
- Morris Nijland
- Denis Akmaikin
- Bob Verniers

