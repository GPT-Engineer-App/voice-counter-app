# voice-counter-app



### Stack Choice:
1. **Frontend**: React (with TypeScript for type safety)
2. **Backend**: Node.js with Express (for REST APIs)
3. **Database**: PostgreSQL (managed by Supabase)
4. **Build Tool**: Webpack (for bundling and build processes)
5. **Styling**: Tailwind CSS (for utility-first CSS)
6. **State Management**: Redux or Context API (for managing global state)
7. **Testing**: Jest and React Testing Library (for unit and integration tests)

### Prompting Strategy:
1. **Outline the Whole Project**: Start with a high-level overview of the entire project, including all major components and functionalities.
2. **Layered Approach**: Break down the project into smaller, manageable tasks and implement them step-by-step. This allows for iterative development and easier debugging.

### Improvements/Enhancements:
1. **Comprehensive Documentation**: Ensure that the code is well-documented with comments and a detailed README file.
2. **Error Handling**: Implement robust error handling throughout the application.
3. **Accessibility**: Regularly review and enhance accessibility features to ensure compliance with standards.
4. **Performance Optimization**: Continuously monitor and optimize performance-related settings in HTML, CSS, and JavaScript files.
5. **Regular Dependency Updates**: Establish a routine for checking and updating outdated dependencies.
6. **Security**: Implement security best practices, such as input validation and protection against common vulnerabilities.
7. **User Feedback**: Incorporate user feedback mechanisms to gather insights and improve the application.

### Example Prompt:
```
I want to build a voice-controlled mobile application designed for counting different types of containers (PET, HDP, glass, carton) in a hands-free environment. The app should have the following features:
1. Voice-Activated Counting: Recognize pre-defined keywords and numbers, increment the count of the specified container type, and provide a real-time count display.
2. History Tracking: Store counts with timestamps, display the count history, and allow clearing or filtering by container type.
3. Data Export: Export count history in CSV format, allowing selection of specific container types or the entire history.
4. Lock Screen Display: Continue processing voice commands in the background and display current counts on the lock screen.
5. Container Lock-Out Feature: Allow locking out a specific container type and counting numbers for the locked-out container type.
6. Custom Keywords: Support custom keywords for each container type.
7. Settings Page: Provide fine-grained control over the app's settings, including voice control and counting functions, keyword inputs, and long-term history tracking.
8. Debugging and Log Capture: Include a page for debugging, log capture, and test conduction and analysis.

Please use the following stack:
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL (managed by Supabase)
- Build Tool: Webpack
- Styling: Tailwind CSS
- State Management: Redux or Context API
- Testing: Jest and React Testing Library



## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/voice-counter-app.git
cd voice-counter-app
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
