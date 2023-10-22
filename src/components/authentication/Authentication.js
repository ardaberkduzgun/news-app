export const authenticateUser = (username, password) => {

  const users = JSON.parse(localStorage.getItem('users')) || [];
  console.log('Users in localStorage:', users); // Kontrol amaçlı yazdık
  const user = users.find((user) => user.username === username && user.password === password);
  return user;
};

export const registerUser = (username, password, name, surname, interests, email) => {

  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  const newUser = {
    id: users.length + 1,
    username,
    password,
    name,
    surname,
    interests,
    email,
  };
  
  users.push(newUser);

  localStorage.setItem('users',JSON.stringify(users));

  return newUser;
};