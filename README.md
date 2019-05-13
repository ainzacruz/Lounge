# Lounge

Lounge is a reddit-like application where users can create topics and post discussions pertaining to them. Users can comment,
favorite, and upvote/downvote posts. You must be logged in to participate, however, guess are welcome to view the topics as well
as its discussions. Registered users also have profiles that allow them to see their favorite posts, comments, and topics that 
they created. They can also add profile photos.

Demo the live site: [Here](https://ainzacruz-lounge.herokuapp.com/)

## Built with 

- Node.js
- Express 
- Jasmine for Test-Driven Development
- EJS 
- PostgreSQL
- Bootstrap
- Sequelize
- Heroku

## Landing Page
![Screen Shot 2019-05-12 at 9 17 21 PM](https://user-images.githubusercontent.com/35441687/57596057-7b8e9300-74fd-11e9-82dd-3a8642d4c354.png)

## Motivation
Lounge was my very first Node and backend application. Since it's a decent size application, I opted to use MVC concepts to separate concerns
and allow the application to be maintainable as it grows. This was my first attempt at Test-driven development which I used Jasmine.
After the initial learning curve, I really appreciated the tests once I started building out new features and using my test to see check that it didn't
disrupt the app. I also opted to use PostgreSQL as my database. I really enjoyed using PostgreSQL despite having some initial pains with migrations
and deploying to heroku, but Sequelize was a great tool to communicate with it. 

## Future Improvements

- Search - Allow users ability to search for topics and posts
- Filters - Allow users to filter categories or topics


