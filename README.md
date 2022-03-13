# 🎮 NxGG
## 📖  About the project
This project has been created by Davide Lo Cascio. It contains a website and a tourney system.
The website shows information about nxgg, news, events and tourneys. The tourney system contains a user registration, tourney administration and bracket creation.

## 👨‍💻 Tech Stack
- VueJS
- Nuxt
- Prismic
- Supabase

### 🗣️ Languages
- JavaScript
- Sass
- HTML

### ⚠️ Dependencies
- Vue
- Nuxt
- Bulma
- Supabase
- Prismic
- FontAwesome
- EpicSpinner

## ⚡ Development

If you want to use / see all features, you have to change to the development branch.
To be able to run the project, you will need the .env file from the administrator of this project.

Please copy the .env file inside the root of the project. Without the .env file, the project will not work.

1. Clone the project from github.com
```
https://github.com/lcdave/nxgg_web
```
2. Install NodeJS (14.17.4) and nvm
```
https://nodejs.org/en/download/

https://github.com/nvm-sh/nvm

nvm for windows: https://github.com/coreybutler/nvm-windows
```
3. Use the correct version of node, you might need to install it first. Follow the instructions on the cli
```
nvm use
```
4. Install the dependencies

```
npm install
```
5. Run the server
```
npm run dev
```

## 🚀 Deployment
The application is hosted on [Netlify](https://www.netlify.com/).
We have configured the application to automatically deploy to Netlify. The automated deployment is triggered by pushing to the main or the develop branch.

The main branch deploys to: [Main](https://nxgg.ch/)
The develop branch deploys to: [Develop](https://dev-nxgg.netlify.app/)

## 👨‍💻 Prismic commands
To create or edit elements for the website, you have to launch prismic and storybook.
You can find the documentation on [prismic.io](https://prismic.io/docs/technologies/setup-a-prismic-project-nuxtjs)
### Start storybook
```
npm run storybook
```
### Launch Prismic
```
prismic sm --develop
```

## ⚡ Supabase
Supabase is used for the tournament administration. You can find the documentation on [supabase.com/docs](https://supabase.com/docs).