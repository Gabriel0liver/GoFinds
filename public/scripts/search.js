const main = () => {
  let users;

  axios.get('/getUsers')
    .then(result => {
      users = result.data;
    });

  const searchInput = document.querySelector('.input-users input');
  const searchResultsElement = document.querySelector('div.search-results');

  const findUsers = (search) => {
    return users.filter(user => {
      return user.username.toLowerCase().includes(search);
    });
  };

  const displayResults = (usersFound) => {
    searchResultsElement.innerHTML = '';
    const usersList = document.createElement('ul');
    usersFound.forEach(function (user) {
      const userListElement = document.createElement('li');
      userListElement.innerText = user.username;
      usersList.appendChild(userListElement);
    });
    searchResultsElement.appendChild(usersList);
  };

  const handleKeyUp = () => {
    const search = searchInput.value.toLowerCase();
    const usersFound = findUsers(search);
    displayResults(usersFound);
  };

  searchInput.addEventListener('keyup', handleKeyUp);
};

window.addEventListener('load', main);
