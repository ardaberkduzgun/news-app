// Authentication.js

export const authenticateUser = (username, password) => {
    // Simulate authentication logic using mock data
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);
    return user;
  };
  
  export const registerUser = (username, password) => {
    // Simulate registration logic using mock data
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    
    // Store the updated user data in local storage
    localStorage.setItem('users', JSON.stringify(users));
    
    return newUser;
  };
  
  export const logoutUser = () => {
    // Remove user data from local storage to log out
    localStorage.removeItem('users');
  };
  