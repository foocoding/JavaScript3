'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

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

  function main(url) {
    fetchJSON(url, (err, data) => {
      const root = document.getElementById('root','forRepoBlock', 'forContributorsBlock');
      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      } else {
        //createAndAppend('pre', root, { text: JSON.stringify(data, null, 2) });
        const select = createAndAppend('select', root);
        createAndAppend('option', select, { text: 'Click here to choose a Repository' });
        data.forEach(repo => {
          const name = repo.name;
          createAndAppend('option', select, { text: name });
        });

        const repoInfo = createAndAppend('div', forRepoBlock);
        const contribs = createAndAppend('div', forContributorsBlock);
        select.addEventListener('change', evt => {
          const selectedRepo = evt.target.value;
          const repo = data.filter(r => r.name == selectedRepo)[0];
          console.log(repo);
          repoInfo.innerHTML = '';
          contribs.innerHTML = '';

          const addInfo = (label, value) => {
            const container = createAndAppend('div', repoInfo);
            createAndAppend('span', container, { text: label });
            createAndAppend('span', container, { text: value });
          };
          addInfo('Name: ', repo.name);
          addInfo('Desciption: ', repo.description);
          addInfo('Number of forks: ', repo.forks);
          addInfo('Updated: ', repo.updated_at);

          const contribsUrl = repo.contributors_url;
          fetchJSON(contribsUrl, (err, contribData) => {
            contribData.forEach(contributor => {
              createAndAppend('div', contribs, { text: contributor.login });
            });
          });
        });
      }
    });
  }

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  window.onload = () => main(HYF_REPOS_URL);
}



