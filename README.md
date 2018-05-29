# Project Illuminate

Contributers:

[Najim Islam](https://github.com/najimc)\
[Saleh Ahmed Khan](https://github.com/salehk2)

## Project Proposal

["How might we better prepare all learners for the needs of tomorrow by reimagining higher education?"](https://info30005-2018-il.herokuapp.com/)

### To run in local machine

Install [Node.js](https://nodejs.org/en/) then install the dependencies using the command:

```bash
npm install
```

Then create the following files:

`config/keys_dev.json`

```javascript
module.exports = {
  mongoURI: 'your mongo uri',
  secretOrKey: 'your secret or key'
};
```

If you want to show public GitHub repositories of users, register a GitHub OAuth application, then use the keys in the following file.\
Find more information [here](https://github.com/settings/applications/new).

`client/src/config/keys_dev.json`

```javascript
export const GithubClientId = 'your github client id';
export const GithubClientSecret = 'your github client secret';
```

Then use the command:

```bash
npm run illuminate
```

This will run the frontend on [localhost:3000](http://localhost:3000) and the server on [localhost:5000](http://localhost:5000)

To run in developer mode, install the dev dependencies and use the command:

```bash
npm run dev
```

### To deploy in Heroku

Set the following config vars with your keys:

`MONGO_URI` `SECRET_OR_KEY` `GITHUB_CLIENT_ID` `GITHUB_CLIENT_SECRET`
