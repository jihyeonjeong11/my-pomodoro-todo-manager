https://v2.scrimba.com/prompt-engineering-for-web-developers-c02o/~01

https://github.com/f/awesome-chatgpt-prompts

https://github.blog/ai-and-ml/generative-ai/prompt-engineering-guide-generative-ai-llms/

- good roleplay prompts

Ai model would be replace unfit developers in near future.

Developers need to focus bigger problems, give tedious works to AI

## How to prompt?

- Be specific
- Provide Tech Stack and terms
- Give context

eg) What's the best way to center a div element horizontally and vertically using CSS?
eg) Please explain Javascript's reduce() method and provide an examples of what I might use it for.

### practice

1. I need to loop through an array. Help?

- my answer: Suggest best ways to iterate an array with Javascript
- scrimba answer: In Javascript, how can i utilize the foreach() method to iterate over an array of ojbects and extract a specific property from each?

2. I want my website to look good on phones too.

- my answer: need to implement responsive design CSS for my website. This is current codebase of my code.
- scrimba answer: What are the recommended CSS media query breakpoints for mobile, tablet and desktop views to ensure my website is responsive across various devices?

3. I'm, having issues bringing data into my React app.

- my answer: This usecallback using props from parents causing stale closure.
- scrimba answer: How can I use the useEffect hook in react to fetch data from a REST API endpoint and store the results in a local state using the useState hook?

- and iterate!

eg) Explain javascript's reduce() method and its use cases.

About form.

- Please create a from in Javascript with one input that accepts a string and, on submit, prints that word to the webpage in reverse.

## Specifing Answer length and format

Specify steps

- Provide a brief 2-step explanation of creating a custom Javascript event

Specify return string type

- Compare CSS grid and Flexbox highlighting their main differences and use cases in a tabular format.

More specific

- Please summarize in 3 bullet points why innerHTML should be avoided, followed by a short explanation and a code example of what should be used instead.

- Please list the 5 most important JavaScript concepts a beginning developer should be comfortable with before learning React. Please provide a one sentence explanation of each concept, and one sentence about why it is important for learning react.

1. list the 5 most important JavaScript concepts - specifying format
2. a beginning developer should be comfortable with before learning React. - question
3. Please provide a one sentence explanation of each concept, and one sentence - more formatting request
4. about why it is important for learning react.

- Create a flowchart describing how to submit a pull request using Github !important

- create a pseudo code in the form of code comments describing how I can write a React component that displays the time in a user's local timezone.

more examples

- Explain GraphQL in one paragraph.
- Define JavaScript closures in one sentence.
- Explain what Webpack is in 30 words or less.
- TL;DR: Explain the difference between 'let' and 'const' in JavaScript.
- How can I do X task in React without using external tools or libraries?
- Explain the concept of JavaScript event loop using an analogy.
- Here's some code. Please comment every line explaining what it does.
- In your response, please include only the code that need to be modified.

- Please explain how to use Redux step-by-step using a simple code example such as tracking whether or not a user is logged in. Provide a one sentence explanation of each step.
  At the end, give me an acronym that will help me remember the steps.

### Haiku generation.

I want you to build a simple Web Haiku generator app for me:

App requirements:

1. In a center of the screen, a textbox that generated Haiku will show(if generated.)
2. In a bottom end, there is Haiku generate button.
3. When button clicked, makeAndShowHaiku function executed.
4. makeAndShowHaiku funcionality would be:
   - loads predefined list of 3 Haiku verses.
   - connect three verses.
   - fill center textbox with result.

Haiku requirements:

1. return three Haiku line. First 5 syllables, second 7 and the last 5 syllables.
2. Haiku subject is Artificial Intelligence

answer:

1. Prompt: "Generate 3 JavaScript arrays for a haiku generator where each array represents a line of the haiku.
   The first and third arrays should contain phrases with 5 syllables, and the second array should contain phrases with 7 syllables.
   All the phrases should relate to artificial intelligence."

Specify return type.

2. Write a JavaScript function to randomly select one string from 3 arrays
   of strings, and return a combined string where each haiku is on a separate line.

3. Create a button in JavaScript that, when clicked, triggers the generateHaiku function and displays the haiku to the webpage.

## Break tasks into smaller steps.

Let's build a budget planner.

- tasks: build react budget planner.

  1. Form with three inputs: budget title, total budget. current expenditures.
  2. submits: progress bar added
     if less than 50% budget, progress bar green
     if morte than 75% budget, progress bar orange
     if exceeds the budget, progress bar red.
  3. App keeps track of the total budget and total expenditures, displaying larger progress bar in a top of the page.
  4. Users can delete and edit progress bars.
  5. Create JSON for 4 example budget progress bars.

- answer steps:

  1. Help me build a React app to help user can visualize their budget. Make suire it meets the followings:

     - Include a form component with three inputs: budget title, budget and spent.
     - When the form is submitted add the new budget to an array of budgets.

  2. Add styles to form. Assume from an external stylesheet.

     - sould be responsuive
     - form fields stack on on top of another
     - fields are styled similar to bootstrap from fields(but do not introduce any outside libraries)

  3. Display each budget in a budget array as a progress bar. Each progress bar comp should have following:

     - Display budget title
     - Display budget / spent below the progress bar
     - Progress bar should be red if 100% or more of the budget has been reached,
       orange if 75% or more of the budget has been reached, and green if less than 74% of the budget has been reached.
     - progress bar Styles: thick with rounded corners

  4. Fixing Progress bar exceeds 100%. and some color changes.

     I want to make the following changes to the progress bar component:

     1. THe width of the progres bar should never exceed 100%. If the spent amount exceeds the budget amount, the maximum width is 100%
     2. If the spent amount exceeds the budget amount, make the budget/spent progress bar text red
     3. Display the spent / budget text as a dollar amount
     4. Use dark apstel colors for the progress bars

## Iterrate Prompting.

When ChatGPT fails, I can tweak the prompt and follow-up.
Create a Initial request, and add or change with more details. Remember trial and error

## Optimizing prompts

1. Make AI review your needs
2. Make a desired result from 1.

eg) I'm going to give you a prompt, and I want you to help me optimize it. Ask me clarifying questions, then suggest a more effective prompt that will tield a more accurate and detailed output.

eg) Give me some example code for a React accordion menu.
-> give answers for all ChatGPT's questions.

### practice:

```
GIve me the sample code for modal in React.

o help you refine this prompt and provide the most relevant example, here are a few clarifying questions:

What kind of modal are you looking for?
Are you thinking of a simple modal for displaying information, a form modal, or something more complex with interactive elements (e.g., nested modals)?

Do you need the modal to support specific features?
For example, should it include animations, close on clicking outside, be keyboard accessible, or have different types of content?

Are you using any specific libraries?
Should the modal be built using only React, or are you working with UI libraries like Material-UI, Bootstrap, or others?

Do you want any specific state management approach?
Should the modal use React’s local state (useState), or are you using something more advanced like Redux?

Are there any design or styling preferences?
Should the example include basic CSS styling, or would you prefer to handle the styling separately?

1. I want just a simple modal for show some notification.
2. Close on clicking backdrop would be helpful. Multiple content would be cool.
3. Styled component
4. just use useToggle custom hook.
5. CSS in JS


```

## Role based Prompting

eg) You are now a product owner tasked with gathering requirements for this project.
What features and functionality should this application have? Ask me clarifying questions, if necessary.

Check different perspectives and basic funcionality

eg)

- Act as an expert in systems design and architecture, and advise me on how to design the frontend of a React app that helps users keep track of how often to water and fertilize their house plants.
- As a produc owner gethring requirements for this project. What features and functionality should this application have? Ask me clarifying questions if necessary.
- Let's concentrate first on Plant information first include:

  - plant nickname
  - plant image
  - watering and fertilizer frequency
  - last wartered(in days)
  - last fertilized(in days)
  - notes

- I now want you to act as a product manager. Write user stories based on the above requirements.
- You are the Product Manager of this app. Advice me as a software engineer, which user stories are most necessary to create an MVP for prototyping and demo purposes.
- Act as a software architect and give me advice on how to design the front end of a React application based on the following user stories:
  As a user, I want to be able to assign a unique nickname to my plant, so that I can easily
  identify and personalize each plant I own. This is a basic feature to allow users to manage
  multiple plants.
  As a user, I want to upload an image of my plant, so I can visualize it within the app. Having
  visual representation is key to the user experience.
- You and I are a software engineering team. Discuss the requirements for the first 3 user stories and turn them into tickets to be entered in JIRA.

## Challenge

Booking app

- I want to build a simple booking website for resort hotels. Act as a product manager and help me identify features I should include in an MVP.
-

## Use example

Give ChatGPT return type to generate code.

eg) Please write a function to toal an array of numbers and return the value as a dollar amount:
example input [5,40.5,9,45. 23.50]
example output: $172.50

## Hallucinating.

ChatGPT sometimes make something up.

eg)
requested Timeline feature

- chatGPT provides accordion menu snippet.
- What suggestion do you have for a more dynamic user interface? I was hoping for something a little more graphically interesting than a simple accordion menu.
- return: horizontal slider with false github reference.
- I get 404 error for that.
- return: suggest another library that exists timeline.js.

### causes

- limited or incorrect training data
- misinterpretation of the prompt
- GPT itself - it tries to determine the likelihood of the next work given a sequence of words, prioritizing coherence over correctness.

### to prevents Hallicinates

- Double check its response and correct, confirm it.
- Break questions into smaller chunks
- Rephrase the question to ask in a different way: be more specific or provide more context
