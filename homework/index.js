const fetchRepositories = async url => {
  try {
    const response = await fetch(url);
    const dataList = await response.json();
    return dataList;
  }
  catch (err) {
    alert(err)
  }
};
const logData = async (url) => {
  const repositoriesData = await fetchRepositories(url);
  const FooCodingRepositories = repositoriesData.sort((a, b) =>
    a.name.localeCompare(b.name, 'fr', { ignorePunctuation: true }));
  createPage(FooCodingRepositories);
};
const logContributors = async (url) => {
  const contributorsData = await fetchRepositories(url);
  const FooCodingContributors = contributorsData.sort((a, b) =>
    a.login.localeCompare(b.login, 'fr', { ignorePunctuation: true }));
  handleContributors(FooCodingContributors);
};

function createElement(parentElement, element, nameId) {
  const newElement = document.createElement(element);
  newElement.setAttribute('id', nameId);
  parentElement.appendChild(newElement);
  return newElement;
}
const createOption = (item, index) => {
  const newOption = document.createElement('option');
  const repositoriesSelect = document.getElementById('repositoriesSelect');
  newOption.className = 'repositoryOption';
  newOption.text = item.name;
  newOption.value = index;
  repositoriesSelect.appendChild(newOption);
}

function createList(parentElement, element, lio, li1, li2, li3, aUrl) {
  for (let y = 0; y < 4; y++) {
    createElement(parentElement, element, `li${y}`);
  }
  const liTags = document.getElementsByTagName('li')
  const p0 = createElement(liTags[0], 'p', 'repository');
  const contentP0 = document.createTextNode('Repository:');
  p0.appendChild(contentP0);
  const aElement = createElement(liTags[0], 'a', 'repositoryValue');
  aElement.href = aUrl;
  const aContent = document.createTextNode(lio);
  aElement.appendChild(aContent);
  appendToLi(liTags[1], 'p', 'description', 'Description:', 'descriptionValue', li1);
  appendToLi(liTags[2], 'p', 'forks', 'Forks:', 'forksValue', li2);
  appendToLi(liTags[3], 'p', 'updated', 'Updated:', 'updatedValue', li3);
}

function appendToLi(indexLi, element, nameIdP1, textNodeP1, nameIdP2, textNodeP2) {
  const p1 = createElement(indexLi, element, nameIdP1);
  const contentP1 = document.createTextNode(textNodeP1);
  p1.appendChild(contentP1);
  const p2 = createElement(indexLi, element, nameIdP2);
  const contentP2 = document.createTextNode(textNodeP2);
  p2.appendChild(contentP2);
}

function createPage(repositories) {
  // create upperDiv
  const upperDiv = createElement(mainDiv, 'div', 'upperDiv');
  const upperDivP = createElement(upperDiv, 'p', 'upperDivP');
  const upperDivPContent = document.createTextNode('FooCoding Repositories');
  upperDivP.appendChild(upperDivPContent);
  const select = createElement(upperDiv, 'select', 'repositoriesSelect');
  repositories.forEach(createOption);
  // create leftRightDivDiv
  const leftRightDiv = createElement(mainDiv, 'div', 'leftRightDiv');
  // create leftDiv
  const leftDiv = createElement(leftRightDiv, 'div', 'leftDiv');
  const repositoryDetails = createElement(leftDiv, 'ul', 'repositoryDetails');
  const defaultRepository = repositories[0];
  createList(repositoryDetails, 'li', defaultRepository.name, defaultRepository.description, defaultRepository.forks, defaultRepository.updated_at, defaultRepository.html_url);
  // create rightDiv
  createElement(leftRightDiv, 'div', 'rightDiv');
  // fetch contributors to implement the rightDiv
  const defaultContributorsUrl = defaultRepository.contributors_url;
  logContributors(defaultContributorsUrl);
  // addEventListener on select change
  select.addEventListener('change', () => {
    const liElement = document.querySelectorAll('li');
    for (let i = 0; i < liElement.length; i++) {
      liElement[i].parentElement.removeChild(liElement[i]);
    }
    const selectedRepository = repositories[select.value];
    createList(repositoryDetails, 'li', 'detailsList', selectedRepository.name, selectedRepository.description, selectedRepository.forks, selectedRepository.updated_at);
    const ContributorsUrl = selectedRepository.contributors_url;
    logContributors(ContributorsUrl);
  });
}

function handleContributors(contributors) {
  const rightDiv = document.getElementById('rightDiv');
  rightDiv.innerHTML = '';
  contributors.forEach(contributor => {
    // create subDiv for each contributor
    const subDiv = document.createElement('div');
    subDiv.className = 'contributor'
    rightDiv.appendChild(subDiv);
    const image = document.createElement('img');
    image.className = 'image';
    image.setAttribute('src', contributor.avatar_url);
    subDiv.appendChild(image);
    const login = createElement(subDiv, 'p', 'login');
    const loginContent = document.createTextNode(contributor.login)
    login.appendChild(loginContent);
    const contributions = createElement(subDiv, 'p', 'contributions');
    const contributionsContent = document.createTextNode(contributor.contributions)
    contributions.appendChild(contributionsContent);
  });
}
const mainDiv = document.body;
logData('https://api.github.com/orgs/foocoding/repos?per_page=100');
