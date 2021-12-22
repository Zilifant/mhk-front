# MHK 🕹 React App

### ⚡️ This is the front-end. Find the back-end API [here](https://github.com/Zilifant/mhk-back).

**[MHK](https://mhk.vercel.app/)** is an online implementation of the social deduction game *Deception: Murder in Hong Kong* by designer Tobey Ho.

***Deception: Murder in Hong Kong* is © Jolly Thinkers' Learning Centre Limited.**
This app is not affiliated with Tobey Ho, Grey Fox Games, or Jolly Thinkers in any way.

You can (and should) purchase a physical copy of *Deception* directly from publisher [Grey Fox Games](https://greyfoxgames.com/deception-murder-in-hong-kong/). Learn more about the game on [BoardGameGeek](https://boardgamegeek.com/boardgame/156129/deception-murder-hong-kong).

## Project Overview
Structure and content of `src` directory.

* [App.jsx](./src/App.jsx)
* [components](./src/components)
  * [landing](./src/components/landing)
    * [Header.jsx](./src/components/landing/Header.jsx)
    * [JoinLobby.jsx](./src/components/landing/JoinLobby.jsx)
    * [Landing.jsx](./src/components/landing/Landing.jsx) - Page-level wrapper.
    * [NewLobby.jsx](./src/components/landing/NewLobby.jsx)
    * [ReturnToLobby.jsx](./src/components/landing/ReturnToLobby.jsx)
  * [lobby](./src/components/lobby)
    * [Foyer.jsx](./src/components/lobby/Foyer.jsx) - Routes visitors based on `userContext` and url data.
    * [Lobby.jsx](./src/components/lobby/Lobby.jsx) - Page-level wrapper.
    * [chat](./src/components/lobby/chat)
      * [Chat.jsx](./src/components/lobby/chat/Chat.jsx)
      * [ChatFeed.jsx](./src/components/lobby/chat/ChatFeed.jsx)
      * [NewMessage.jsx](./src/components/lobby/chat/NewMessage.jsx)
    * [main](./src/components/lobby/main)
      * [Announcer.jsx](./src/components/lobby/main/Announcer.jsx)
      * [Info.jsx](./src/components/lobby/main/Info.jsx)
      * [Main.jsx](./src/components/lobby/main/Main.jsx) - Wraps everything in `Lobby` other than `Chat`.
      * [game](./src/components/lobby/main/game) - Used during games.
        * [Card.jsx](./src/components/lobby/main/game/Card.jsx)
        * [Cards.jsx](./src/components/lobby/main/game/Cards.jsx)
        * [ChooseKeyEvUI.jsx](./src/components/lobby/main/game/ChooseKeyEvUI.jsx)
        * [Ghost.jsx](./src/components/lobby/main/game/Ghost.jsx)
        * [GhostCard.jsx](./src/components/lobby/main/game/GhostCard.jsx)
        * [Player.jsx](./src/components/lobby/main/game/Player.jsx)
        * [PlayerUI.jsx](./src/components/lobby/main/game/PlayerUI.jsx)
        * [Players.jsx](./src/components/lobby/main/game/Players.jsx)
        * [Timer.jsx](./src/components/lobby/main/game/Timer.jsx)
      * [no-game](./src/components/lobby/main/no-game) - Used outside of games.
        * [Member.jsx](./src/components/lobby/main/nogame/Member.jsx)
        * [MemberList.jsx](./src/components/lobby/main/nogame/MemberList.jsx)
        * [Setup.jsx](./src/components/lobby/main/nogame/Setup.jsx)
        * [TimerSetup.jsx](./src/components/lobby/main/nogame/TimerSetup.jsx)
  * [modal](./src/components/modal) - Non-evil pop ups.
    * [Backdrop.jsx](./src/components/modal/Backdrop.jsx)
    * [ErrorModal.jsx](./src/components/modal/ErrorModal.jsx)
    * [InfoModal.jsx](./src/components/shared/InfoModal.jsx)
    * [Modal.jsx](./src/components/modal/Modal.jsx)
    * [VideoModal.jsx](./src/components/shared/VideoModal.jsx)
  * [shared](./src/components/shared) - Utility components and those used in both `Lobby` and `Landing`.
    * [Container.jsx](./src/components/shared/Container.jsx)
    * [Footer.jsx](./src/components/shared/Footer.jsx)
    * [Grid.jsx](./src/components/shared/Grid.jsx)
    * [Input.jsx](./src/components/ui-elements/Input.jsx)
    * [Loading.jsx](./src/components/shared/Loading.jsx) - Full-page overlay.
    * [SVGButton.jsx](./src/components/ui-elements/SVGButton.jsx)
    * [SVGIcon.jsx](./src/components/ui-elements/SVGIcon.jsx)
    * [Toggle.jsx](./src/components/ui-elements/Toggle.jsx)
    * [Tooltip.jsx](./src/components/shared/Tooltip.jsx)
* [context](./src/context)
  * [contexts.js](./src/context/contexts.js)
* [hooks](./src/hooks)
  * [chat-hook.js](./src/hooks/chat-hook.js)
  * [form-hook.js](./src/hooks/form-hook.js)
  * [game-hook.js](./src/hooks/game-hook.js)
  * [http-hook.js](./src/hooks/http-hook.js) - Sends HTTP requests using `fetch` API.
  * [io-hook.js](./src/hooks/io-hook.js) - Sets up socket.io client.
  * [multi-selector-hook.js](./src/hooks/multi-selector-hook.js)
  * [parallel-selector-hook.js](./src/hooks/parallel-selector-hook.js)
  * [user-hook.js](./src/hooks/user-hook.js)
* [styles](./src/styles) - Pages and certain larger components have dedicated files (not listed here). A few notable utility files:
  * [core.scss](./src/styles/core.scss) - Reset, top-level grids, and other general styles
  * [colors.scss](./src/styles/colors.scss) - My color 'library' as well as variable assignments for colors used throughout the UI.
  * [mixins.scss](./src/styles/mixins.scss) - Mixins used throughout the UI.
  * [styled-markdown.scss](./src/styles/smd.scss) - Used by the `styled-markdown` module.
  * [svgs.scss](./src/styles/svgs.scss) - Used by `SVGIcon` and `SVGButton`.
* [util](./src/util) - Utility functions that aren't React components or hooks.
  * [styled-markdown.js](./src/util/smd.js)
  * [system-messages.js](./src/util/system-messages.js) - Dynamically creates strings from data.
  * [textToClipboard.js](./src/util/textToClipboard.js)
  * [utils.js](./src/util/utils.js) - Miscellaneous functions and constants (*that should be broken into multiple files*).
  * [validators.js](./src/util/validators.js) - Functions and constants used to validate user text inputs.
  * [static-content](./src/util/static-content) - Return static text strings and html (JSX) markup.
    * [about-html.js](./src/util/static-content/about-html.jsx)
    * [rules-html.js](./src/util/static-content/rules-html.jsx)
    * [svgs-html.js](./src/util/static-content/svgs-html.js) - Used by `SVGIcon` and `SVGButton`.
    * [tooltip-strings.js](./src/util/static-content/tooltip-strings.js) - Used by `Tooltip`.

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