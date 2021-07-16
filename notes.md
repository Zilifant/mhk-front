# 'Deception: Murder in Hong Kong' App

## General
- SPA
- Process: start with one core feature with a deployment pipeline - session-based chatrooms

## Functionality
- realtime updates using websockets/socket.io
- user-hosted/joinable rooms with randomly-generated access codes
- ability to hide access code on-screen by default (streamer mode)
- text chat
- analytics tracking/storage
- web server hosting
- domain name service
- tooltips for first-time players (toggle-able)
- randomization engine for determining roles (with option to select investigator)

## Components
- static game rules
- animated tutorial
- host/join menu
- buy me a coffee
- lobby previous game results display
- lobby info display (e.g. room code, member names, member readiness)
- lobby text chat
- lobby member controls (e.g. ready/unready, show/hide room code, change display name/icon, leave lobby)
- lobby host controls (e.g. member controls + start game, set rules/roles, kick people)
- game general basic info (e.g. round number, timer, etc.)
- game investigator self basic info (e.g. role, badge status, etc.)
- game investigator self controls (e.g. badge)
- game investigator other-player clues displays (separate component per player, modified view for witness, murderer, phantom)
- game investigator self clues display
- game investigator self clues controls for murderer
- game phantom messages display (for non-phantom players)
- game phantom messages display + controls (for phantoms)

## Views (?)
- not in lobby (landing page; host/join menu)
- static game rules / animated tutorial page
- in lobby, game not started, no previous game
- transition -> game starting
- in game, phantom role
- in game, investigator role
- in game, murderer role
- in game, witness role
- in game, accomplice role
- transition -> game ending
- in lobby, game not started, previous game results

## Structure/Architecture
- **React - folder structure:** use *Pages/Components* system
- **Express - folder structure:** routes in seperate folder

## Questions / Problems
- loading lobby doesnt work on network
- addHeader not a function (cookies)
- deleted users in db, still in lobby doc
- session not found when using 'back' button?

## Data Tracking

## Game Components
- role cards
- evidence cards + key evidence selectors
- scene tiles + key clue selectors
- accusation tokens

### Static - Lobby
- lobbyId (str)
- socket (special) ?
- creatorId (str)

## Variable - Lobby
- user list (arr)
- online user list (arr) + online users (num)
- gameActive (bool)
- games (arr)
- leaderId (str)
- streamerMode (bool)
- chatmsgs (arr)
- readyUsers (num)

### Static - Game
- gameId (str)
- user list (arr)
- online user list (arr) (excepting disconnects)
- user roles (per user)
- rules settings (obj)
- result (obj)

## Variable - Game
- round (num)

## Static - User Session
 - userId/Name
 - lobbyId

## Static - User in Lobby
- above +
- chatColor (str)
- socket (obj)

## Variable - User in Lobby
- isLeader (bool)
- isReady (bool)

## Static - User in Game
- above +
- role (str)

## Static - User in Game - Per Role
### Investigator/Murderer/Witness/Accomplice
- evidence cards (arr)
### Murderer
- 2x key cards (arr)
### Ghost
- cause scene-tile (str)
- location scene-tile (str)

## Variable - User in Game - Per Role
### Investigator/Murderer/Witness/Accomplice
- usedAccusation (bool)
- accusationTarget (str)
### Murderer
- usedKill (bool)
- killTarget (str)
### Ghost
- 4x clue scene-tiles (arr)
- 6x selections (obj) (per tile)

