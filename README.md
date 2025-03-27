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

  - Backing
   - allowed ec2 instance public IP on mongodb server(basically whilisting the aws server machinne IP on mongoBd)
   - npm install pm2 -g
   - pm2 start npm -- start
   - we can check if anything goes wromg with the pm2 logs
   - if we want to clear the logs then pm2 flush npm (npm here is the name of the application)
   -  pm2 list to show the list, pm2 stop (to stop the process)  , pm2 delete <name of the application[here name is:npm]>
   - pm2 start npm --name "devIn-backend" -- start (to rename the process's application name)

  
  - config nginx - sudo nano /etc/nginx/sites-available/default(for mapping api to port 7777)
  # Nginx config

    - Frontend = https://13.51.162
    - Backend = https://13.51.162:7777/

    - Domain name = Devin.com => 13.51.162

    - Frontend = https://devIn.com
    - Backend = https://devIn.com:7777 => devIn.com/api


   
    - server_name 13.51.162.135; (setting server name)
    - location /api/ {
        proxy_pass http://localhost:7777/; pass the req. to node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    } 

    - restart the nginx - sudo systemctl restart nginx
    


 - Modify the BASE_URL of the frontend to => export const BASE_URL="/api";    









Body

 - NavBar
 - Route=/ =>Feed
 - Route=/login => Login
 - Route=/connections =>Connections
 - Route=/profile =>Profile