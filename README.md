# DevIn
- Installed Tailwind Css, DaisyUi , added navbar component 

- Set cookies in the browser as login first time to acces the further redirection throught the APIs, For this we have to add cors middleware to the backend app.js with configurations as origin and , credentials:true

- installed redux , created store , added a Provider , created userSlice
  confugureStore => Provider => createSlice => add reducer to the store

- called profile/view in body.jsx to make logged in user available everywhere other wise show message please login if someone tries to acces aother urls  

- Built the UserCard/feed page and called /feed api

- built edit profile card via patch api also used userCard component(readme)
- Building feature to all my connections, Created the page to show all the connections of the loggedIn user and stored all the connections data into connectionSlice 

- Created component and store for connection request(accepted or rejected), and also created the functionality for accept or reject the connectio request

- Created Reject or intrested feature on card on Feed page

- Created Sign Up from updated meta data



# Deployment

- Signup on the AWS
- Launched the instance
- chmod 400 <secret.key>.pem
- ssh -i "devIn-secret.pem" ubuntu@ec2-13-51-162-135.eu-north-1.compute.amazonaws.com
- installed Node version 22.14.0 in the aws machine's terminal
- git clone both the repositories frontend and backend
- Frontend
  - npm install -> dependencies installed
  - npm run build
  - sudo apt update
  - sudo apt install nginx(used to deploy application)
  - sudo systemctl start nginx(to start nginx in to our system)
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html => (sudo scp -r dist/* /var/www/html)
  - check if copied or not  cd /var/www/html -> ls ->(assets  connect.png  devIcon.jpeg  index.html  index.nginx-debian.html  vite.svg)
  - Enable port :80 of your instance











Body

 - NavBar
 - Route=/ =>Feed
 - Route=/login => Login
 - Route=/connections =>Connections
 - Route=/profile =>Profile