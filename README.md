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
- chmod 400 <secret.key>.pem [secret key kept]
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
  - [Whenever you you make a update in the front end then create a build of it again]
       1- git pull
       2- npm run build
       3- sudo scp -r dist/* /var/www/html


  - Backend
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

# Adding a custom domain name

 - purchased domain name from godady
  - signup on cloudflare & add a new domain name server
  - **changed the name servers on godady and point it to cloudflare(copy nameserver from cloudflare and replace it with godady nameserver)
  - wait for sometime till your nameserverd are updated
  - in DNS record of the cloudflare changed the ip of A record [A    devin.monster   13.51.162.135] and deleted the left over history of godady nameserver 
  - Enabled SSL for the webside (from Browser till cloudflare)


# Sending Emails vis SES

 - Create a IAM user
 - Give access to AmazonSESFullAccess(for read and write also)
 - Amazon SES: Create an Identity
 - Verify your domain name
 - Verify an email address 
 - Install AWS SDK -v3 [Code example--](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples)
 - Setup SESclient
 - Access credwntials should be created in IAM under SecurityCredentials Tab
 - Add the credentials to .env file
 - Write code for SESclient
 - Write code for Sending emails address
 - Make the email dynamic by passing more params to the run function

 # Sending Emails in a scheduled time using cron package
  
  - Installing node-cron
  - Learned about cronExpressions/string
  - Scheduled a emial job
  - learned about date-fns(npm packahge)
  - Find all unique emails Id who have got connection request in previous day
  - Send emails
  - **THINGS TO CHECK-[Amazon SES Bulk Emails, Make custopm templates for email usil using amazon ses] , bee-queue & npm bull package - to manage lakhs of enail sending process smoothly

# Real time chat using WebSockets(spcket.io)

  - Build the UI for a chat window on /chat/:targetUserId
  - Setup socket.io in backend
  - npm i socket.io
  - Setup FE and BE with Socket.io.client and socket.io
  - Initialized the chat 
  - createSocketConnection 
  - Listen to events
  - set up the chat foemat system to start and end with comparing ("chat " + (msg.senderId === userID ? "chat-end" : "chat-start")) while using the msg SenderId with the logged in user Id 





Body

 - NavBar
 - Route=/ =>Feed
 - Route=/login => Login
 - Route=/connections =>Connections
 - Route=/profile =>Profile