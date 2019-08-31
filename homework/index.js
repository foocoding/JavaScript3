'use strict';

{
  function fetchJSON(url) {
    const p = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(new Error(xhr.statusText));
        }
      };
      xhr.onerror = () => reject(new Error('Network Request failed'));
      console.log();
      xhr.send();
    });
  }
  const REPOS_URL = 'https://api.github.com/orgs/foocoding/repos?per_page=100';

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function fetchContributors(contributors, contribContainer) {
    createAndAppend('p', contribContainer, { text: 'Contributors', id: 'contributors' });
    contributors.forEach(contributor => {
      const contribDiv = createAndAppend('div', contribContainer, { class: 'contrib-info' });
      createAndAppend('img', contribDiv, {
        src: contributor.avatar_url,
        text: contributor.login,
        height: 150,
        width: 150,
        class: 'image',
      });
      createAndAppend('a', contribDiv, {
        text: contributor.login,
        href: contributor.html_url,
        target: 'blank',
        class: 'contrib-link',
      });
      createAndAppend('p', contribDiv, {
        text: contributor.contributions,
        class: 'contributor-badge',
      });
    });
  }

  function fetchAndAddContribData(repoInfo, repoContainer, contribContainer, root) {
    repoContainer.innerHTML = repo.name;
    contribContainer.innerHTML = repo.name;

    createAndAppend('span', repoContainer, { text: 'Repository', class: 'repository' });
    createAndAppend('a', repoContainer, {
      text: '${repoInfo.name}',
      href: repoInfo.html_url,
      target: '_blank',
      class: 'repo-link',
    });

    createAndAppend('p', repoInfo, {
      text: 'Description: ${repoInfo.description}',
      class: 'repo-child',
    });

    createAndAppend('p', repoInfo, {
      text: 'Fork: ${repoInfo.forks}',
      class: 'repo-child',
    });

    createAndAppend('p', repoInfo, {
      text: 'Updated: ${Updated: ${updatedAt.toLocaleString()}',
      class: 'repo-child',
    });

    fetchJSON(repoInfo.contributors_url)
      .then(contributors => {
        addContributors(contributors, contribContainer);
      })
      .catch(err => {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      });
  

 

  
    function populateSelect(root, repos) {
      const header = createAndAppend('header', root, { class: 'header' });
      createAndAppend('p', header, { text: 'HYF Repositories', id: 'p' });
      const select = createAndAppend('select', header, { id: 'select' });

      repos.sort((a, b) => a.name.localeCompare(b.name));

      repos.forEach((repo, index) => {
        createAndAppend('option', select, { text: repo.name, value: index });
      });
      //console.log(populateSelect);

      const mainContainer = createAndAppend('div', root, { id: 'main' });
      const repoContainer = createAndAppend('div', mainContainer, { id: 'repo-container' });
      const contribContainer = createAndAppend('div', mainContainer, {
        id: 'contributor-container',
      });

     

    }
  }

  
    const header = createAndAppend('header', root, { class: 'header' });
    const h1 = createAndAppend('h1', header, { text: 'FooCoding Repos', class: 'h1' });

    const select = createAndAppend('select', root, { class: 'select' });
    createAndAppend('option', select, { text: 'Choose your favorite repo below:' });

    data.forEach(repo => {
      const name = repo.name;
      createAndAppend('option', select, { text: name });
    });
  }
  const REPOS_URL = 'https://api.github.com/orgs/foocoding/repos?per_page=100';

  window.onload = () => main(REPOS_URL);

}
