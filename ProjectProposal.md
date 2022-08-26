# Project Proposal

1. What tech stack will be used? 
  - PERN - Postgres, Express, React, and Node.
  
2. Is the front-end UI or the back-end going to be the focus of your project? 
  - Evenly focused full-stack application with backend routing and frontend UI
  
3. Will this be a website? A mobile app? Something else?
  - This will be a website but I would like to continue to make this for mobile app after Springboard.
  
4. What goal will your project be designed to achieve?
  - A one-stop-shop for competitors to use to navigate through a Showdown competition from registration to competing and finding the rules for competition.
  
5. What kind of users will visit your app? In other words, what is the demographic of your users?
  - Users visiting the app will be university/college students and some alumni members.
  
6. What data do you plan on using? How are you planning on collecting your data?
  - Data from users such as name and where they are coming from. Also data about the schools and teams that will be participating. Data will be collected from users via a form from the frontend UI. 
  
7. Approach?
  - What does your database schema look like?
    - Users: username, password, firstName, lastName, email, gender, city, state, schoolName
    - Schools: schoolHandle, schoolName, city, state, logoUrl, facebookUrl, instagramUrl
    - Competitions: competitionName, description
  - What kinds of issues might you run into with your API? 
    - None that I can see. May want to use the Stripe API for payment processing but that will happen after I finish Springboard.
  - Is there any sensitive information you need to secure?
    - User passwords and maybe emails?
  - What functionality will your app include?
    - Logic for repeat users, localStorage to hold user information, logic to match up teams and individuals for competition
  - What will the user flow look like?
    - Users sign up and create an account. Once signed in, users can register to competitions and also gain access to information about the competition and other competitors competing. Users can also find rules and other information about the Showdown event.
  - What features make your site more than a CRUD app? What are your stretch goals?
    - Users will know who will be competing in which competition and hopefully this information will help them make new friends from other schools.
