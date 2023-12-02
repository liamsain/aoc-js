# Setup
Add .env file
Add 'session_id=' followed by your session id

## Scripts
npm run createToday will create a year folder of the current year if it does not already exist, and a numbered day file '1.js' for that day if it does not exist, along with some short template code

npm run createDay -- -y 2022 -d 7 will create a 2022 folder if it does not exist and a 7.js file if it does not exist, along with some template code

When the template code runs it will check if an input file for that day exists, and fetch it from the Advent of Code site if it does not exist