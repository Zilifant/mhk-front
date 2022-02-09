# Deception 🕹 React App

### ⚡️ This is the front-end. Find the back-end API [here](https://github.com/Zilifant/mhk-back).

**[Deception](https://mhk.vercel.app/)** is an online implementation of the social deduction game *Deception: Murder in Hong Kong* by designer Tobey Ho.

***Deception: Murder in Hong Kong* is © Jolly Thinkers' Learning Centre Limited.**
This app is not affiliated with Tobey Ho, Grey Fox Games, or Jolly Thinkers in any way.

You can (and should) purchase a physical copy of *Deception* directly from publisher [Grey Fox Games](https://greyfoxgames.com/deception-murder-in-hong-kong/). Learn more about the game on [BoardGameGeek](https://boardgamegeek.com/boardgame/156129/deception-murder-hong-kong).

## Contents
- [Overview](#overview)
- [Navigating the Project](#navigating-the-project---react-app)
- [What Could Be Improved](#what-could-be-improved)
- [Planned Features](#planned-features)
- [Setup and Commands](#setup-and-commands---react-app)

## Overview
Deception is a React front-end connected to a Node.js REST API via [Socket.IO](https://socket.io/) and the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). It uses Fetch to initially load user and lobby data. Once users are verified and have loaded their lobby, Socket.IO connects and handles all further communicaton.

Deception is my first full-stack application. I built it as a learning exercise and portfolio piece. As of January 2022 Deception remains a work in progress. There is no doubt much that can be improved; I welcome suggestions and constructive criticism.

### Notable Tools and Tech
React • Node.js • Socket.IO • Express.js • CORS • SCSS • nodemon • React Router • Create React App • VSCode • Postman • Vercel • Heroku 

### Notable Features
**Note:** Some links point to back-end repository.
- [**Text Chat:**](https://github.com/Zilifant/mhk-front/tree/main/src/components/lobby/chat) Handles both [user messages and system announcements](https://github.com/Zilifant/mhk-front/blob/main/src/hooks/chat-hook.js). Includes unique, non-duplicating user [colors](https://github.com/Zilifant/mhk-back/blob/main/utils/modules/lobby-module.js).
- [**Private Lobbies:**](https://github.com/Zilifant/mhk-front/blob/main/src/components/lobby/Lobby.jsx) Unique, procedurally generated lobby IDs. Joinable by entering the lobby ID or visiting it directly as a URL.
- [**Live-Stream Friendly:**](https://github.com/Zilifant/mhk-front/blob/main/src/components/lobby/Foyer.jsx) Lobby IDs hidden in URL bar, even if user connected via the URL. *Streaming Mode* option available to automatically hide lobby ID in the UI.
- [**Lobby Leadership:**](https://github.com/Zilifant/mhk-back/blob/main/utils/modules/lobby-module.js) 'Leadership' allows one user to handle game set up. Leadership automatically passes to another user if the Leader disconnects; it can also be transferred manually.
- [**Sensitive Data Handling:**](https://github.com/Zilifant/mhk-back/blob/main/io.js#L335) Players cannot use basic client-side tools/scripts to cheat; hidden role data is never sent to clients that should not have it.
- [**Visual Timer:**](https://github.com/Zilifant/mhk-front/blob/main/src/components/lobby/main/game/Timer.jsx) Dynamic UI timer synced [server-side](https://github.com/Zilifant/mhk-back/blob/main/utils/modules/game-module.js#L238) for all players.
- [**Cookies:**](https://github.com/Zilifant/mhk-back/blob/main/controllers/user-ctrl.js) User data is saved in a browser cookie, allowing them to seamlessly rejoin a lobby/game if they disconnect. Also checks for and prevents same user from connecting twice.
- [**Styled-Markdown Module:**](https://github.com/Zilifant/mhk-front/blob/main/src/util/styled-markdown.js) A more generally useful module that turns a basic markdown language into HTML/JSX with classes for complex styling.
- [**SVG React Components:**](https://github.com/Zilifant/mhk-front/tree/main/src/components/shared) General components for rendering icons and buttons from a [library](https://github.com/Zilifant/mhk-front/blob/main/src/util/static-content/svgs-html.js) of SVG data.
- [**Tooltip React Component:**](https://github.com/Zilifant/mhk-front/tree/main/src/components/shared) General component for rendering tooltips when hovering elements; includes settings for tooltip content, size, and relative position.

## Navigating the Project - React App
* [App.jsx](./src/App.jsx)
* [components](./src/components)
  * [landing](./src/components/landing)
    * [Landing.jsx](./src/components/landing/Landing.jsx) - Page-level wrapper.
    * [Header.jsx](./src/components/landing/Header.jsx)
    * [Intro.jsx](./src/components/landing/Intro.jsx)
    * [LobbyForm.jsx](./src/components/landing/LobbyForm.jsx)
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
* [styles](./src/styles) - WIP. Pages and certain larger components have dedicated files (not listed here). Notable utility files:
  * [core.scss](./src/styles/core.scss) - Reset, top-level grids, and other general styles
  * [colors.scss](./src/styles/colors.scss) - My color 'library' as well as variable assignments for colors used throughout the UI.
  * [mixins.scss](./src/styles/mixins.scss) - Mixins used throughout the UI.
  * [styled-markdown.scss](./src/styles/styled-markdown.scss) - Used by the `styled-markdown` module.
  * [svgs.scss](./src/styles/svgs.scss) - Used by `SVGIcon` and `SVGButton`.
* [util](./src/util) - Utility functions that aren't React components or hooks.
  * [styled-markdown.js](./src/util/styled-markdown.js)
  * [system-messages.js](./src/util/system-messages.js) - Dynamically creates strings from data.
  * [textToClipboard.js](./src/util/textToClipboard.js)
  * [utils.js](./src/util/utils.js) - Miscellaneous functions and constants (*that should be broken into multiple files*).
  * [validators.js](./src/util/validators.js) - Functions and constants used to validate user text inputs.
  * [static-content](./src/util/static-content) - Return static text strings and HTML (JSX) markup.
    * [about-html.js](./src/util/static-content/about-html.jsx)
    * [rules-html.js](./src/util/static-content/rules-html.jsx)
    * [svgs-html.js](./src/util/static-content/svgs-html.js) - Used by `SVGIcon` and `SVGButton`.
    * [tooltip-strings.js](./src/util/static-content/tooltip-strings.js) - Used by `Tooltip`.

## What Could Be Improved: React App
* **TO DOs:** Specific improvements appear throughout the code as `TO DO:` comments. Most of these involve 1) refactoring overly complex or specific code in light of the app's overall structure, and 2) refactors based on new techniques and best practices I've picked up.
* **Stylesheets:** Styling is a WIP. My naming conventions and use of nested selectors are not as consistent as I'd like. Unused selectors also need to be pruned, and the overall code minified. If I could go back, I would likely use BEM.
* **Tests:** If I could go back and do anything differently, it would be to implement tests from the start.

## Planned Features
In addition to the above improvements, I'd like to implement (back-end included):
1. A database to protect data from server restarts and outages ⭐️ *Top Priority*
2. Responsive interface for mobile and tablets ⭐️ *Top Priority*
3. Interface scaling for high-resolution displays
4. Animated UI changes
5. Dyslexic font option
6. In-app rules reference
7. Emoji Mode, showing emojis instead of text on player cards
8. Unique images for all player cards

## Setup and Commands - React App

**Note:** For the app to function properly you will need to have the back-end API set up and running as well. By default, the development server will run on port 5555. If you change the port, you will of course need to change the environmental variables below.

1. Create a `.env` file in the root directoy and add the following environmental variables:

    ```
    REACT_APP_BACKEND_URL=http://localhost:5555/api
    REACT_APP_SOCKET_URL=http://localhost:5555
    ```
2. `npm install`
3. `npm start`

**Other Scripts:** This app includes all of the boilerplate scripts that come with `create-react-app`, which I used to set up this app.