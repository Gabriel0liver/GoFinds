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
      if (search === '') {
        return null;
      }
      return user.username.toLowerCase().includes(search);
    });
  };

  const displayResults = (usersFound) => {
    searchResultsElement.innerHTML = '';
    const usersList = document.createElement('ul');
    usersFound.forEach(function (user) {
      const userListElement = document.createElement('li');
      const userLinkElement = document.createElement('a');
      userLinkElement.innerHTML = user.username;
      userLinkElement.href = '/users/' + user._id;
      usersList.appendChild(userListElement);
      userListElement.appendChild(userLinkElement);
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
