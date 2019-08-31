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
      const root = document.getElementById('root');

      if (err) {
        createAndAppend('div', root, { text: err.message, class: 'alert-error' });
      } else {
        const header = createAndAppend('header', root, { class: 'header' });
        const h1 = createAndAppend('h1', header, { text: 'FooCoding Repos', class: 'h1' });

        const select = createAndAppend('select', root, { class: 'select' });
        createAndAppend('option', select, { text: 'Choose your favorite repo below:' });

        data.forEach(repo => {
          const name = repo.name;
          createAndAppend('option', select, { text: name });
          console.log(name);
        });

        const repoInfo = createAndAppend('div', root, { class: 'left-div' });
        const contribs = createAndAppend('div', root, { class: 'right-div' });
        select.addEventListener('change', evt => {
          const selectedRepo = evt.target.value;
          const repo = data.filter(r => r.name == selectedRepo)[0];
          console.log(repo.name);
          repoInfo.innerHTML = repo.name;
          contribs.innerHTML = repo.name;

          const addInfo = (label, value) => {
            const container = createAndAppend('div', repoInfo);
            createAndAppend('span', container, { text: label });
            createAndAppend('span', container, { text: value });
          };

          addInfo('Name: ', repo.name);
          addInfo('Description: ', repo.description);
          addInfo('Number of forks: ', repo.forks);
          addInfo('Updated: ', repo.updated_at);

          const contribsUrl = repo.contributors_url;
          fetchJSON(contribsUrl, (err, contribData) => {
            if (err) {
              createAndAppend('div', root, { text: err.message, class: 'alert-error' });
            } else {
            }
            contribData.forEach(contributor => {
              createAndAppend('div', contribs, { text: contributor.login });
              createAndAppend('a', contribs, {
                text: contributor.login,
                href: contributor.html_url,
              });
              createAndAppend('img', contribs, {
                src: contributor.avatar_url,
                height: 150,
                width: 150,
                id: 'img',
              });
            });
          });
        });
      }
    });
  }
  const REPOS_URL = 'https://api.github.com/orgs/foocoding/repos?per_page=100';

  window.onload = () => main(REPOS_URL);
}
