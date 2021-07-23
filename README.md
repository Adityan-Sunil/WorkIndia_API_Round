# WorkIndia_API_Round
Workindia API Round

To Install the Application:
- Clone the Repo
- Open cmd and go to root of repo
- Type ```node main.js``` to start the server

Running the Application
- Registration of user : POST request data = {username: <username>, pass: <password>} url = /sites/register
- Login : POST request data = {username: <username>, pass:<password>} url = /sites/login
- View List : GET request url = /sites/list
- Save new Password : POST request data = {website:<website>, username:<username>, password:<password>} url = /sites
