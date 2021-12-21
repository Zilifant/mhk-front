# MHK 🕹 React App

### ⚡️ This is the front-end. Find the back-end API [here](https://github.com/Zilifant/mhk-back).

**[MHK](https://mhk.vercel.app/)** is an online implementation of the social deduction game *Deception: Murder in Hong Kong* by designer Tobey Ho.

***Deception: Murder in Hong Kong* is © Jolly Thinkers' Learning Centre Limited.**
This app is not affiliated with Tobey Ho, Grey Fox Games, or Jolly Thinkers in any way.

You can (and should) purchase a physical copy of *Deception* directly from publisher [Grey Fox Games](https://greyfoxgames.com/deception-murder-in-hong-kong/). Learn more about the game on [BoardGameGeek](https://boardgamegeek.com/boardgame/156129/deception-murder-hong-kong).

## Setup and Commands

**Note:** For the app to function properly you will need to have the back-end API set up and running as well. By default, the development server will run on port 5555. If you change the port, you will of course need to change the environmental variables below.

1. Create a `.env` file in the root directoy and add the following environmental variables:

    ```
    REACT_APP_BACKEND_URL=http://localhost:5555/api
    REACT_APP_SOCKET_URL=http://localhost:5555
    ```
2. `npm install`
3. `npm start`

**Other Scripts:** This app includes all of the boilerplate scripts that come with `create-react-app`, which I used to set up this app.