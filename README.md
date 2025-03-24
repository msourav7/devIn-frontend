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












Body

 - NavBar
 - Route=/ =>Feed
 - Route=/login => Login
 - Route=/connections =>Connections
 - Route=/profile =>Profile