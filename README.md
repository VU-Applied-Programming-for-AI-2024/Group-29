# Project Title
// IMAGE OF THE REAL FRONTEND

## Brief description of the project
A website where a fan can select the sport they want to follow, then select the team they want to follow, and then select what they want to be notified for. An example would be: choosing tennis, then picking every time Novak Djokovic is playing a top 10 tennis player.

## Frontend mockup

## Team members
Bastian Brinksma, bbr103
Morris Nijland, mni105
Denis Akmaikin dak201
Bob Verniers, bvs207

## Installation details

## Architecture
Frontend 
1. Select Sport -> Sport_name. Sport = Database.Sport -> Sport_name_id
	Sport_name_id -> Sport.Players, Sport.Matches, etc

2. Select Player -> Player_name.  Name = Database.Players ->Player_id
	Database.PlayerName_id -> D.Player_stats (includes basic info and games.)



3.Select Top -> Rank of the opponent. Database.Player_rank = Database.Player_id1
	-> Player_id -> Followed_Player, Player_id1 = OpponentPlayer, 
	Database.Games -> Date,Players_id.
	Create Table: Followed_player ‘’vs’’ Opponent_player
4. Email = email.user.  Database.emails -> send email with Table. 

