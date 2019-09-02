'use strict';

/* global Util, Repository, Contributor */

class App {
  constructor(url) {
    this.initialize(url);
  }

  /**
   * Initialization
   * @param {string} url The GitHub URL for obtaining the organization's repositories.
   */
  async initialize(url) {
    /**  Add code here to initialize your app
     1. Create the fixed HTML elements of your page
     2. Make an initial XMLHttpRequest using Util.fetchJSON() to populate your <select> element
     */

    const root = document.getElementById('root');

    /** Util.createAndAppend('h1', root, { text: 'It works!' }); // TODO: replace with your own code*/

    try {
      const repos = await Util.fetchJSON(url);
      repos.sort((a, b) => a.name.localeCompare(b.name));
      this.repos = repos.map(repo => new Repository(repo));
      // TODO: add your own code here
      this.dropDown(root);
    } catch (error) {
      this.renderError(error);
    }
  }

  dropDown(root) {
    const header = Util.createAndAppend('header', root, { id: 'header' });
    Util.createAndAppend('p', header, { text: 'HYF Repositories', class: 'header' });
    const select = Util.createAndAppend('select', header, { id: 'repo-select' });

    this.repos.forEach((repo, index) => {
      Util.createAndAppend('option', select, {
        text: repo.repository.name,
        value: index,
      });
    });

    const mainContainer = Util.createAndAppend('div', root, { id: 'main' });
    const repoContainer = Util.createAndAppend('div', mainContainer, {
      class: 'repo-container white-frame',
    });

    const contributorsContainer = Util.createAndAppend('div', mainContainer, {
      class: 'contributor-container white-frame',
    });

    select.addEventListener('change', () => {
      App.clearContainer(repoContainer);
      this.repos[select.value].render(repoContainer);
      this.fetchContributorsAndRender(select.value, contributorsContainer);
    });
    this.repos[0].render(repoContainer);
    this.fetchContributorsAndRender(0, contributorsContainer);
  }

  /**
   * Removes all child elements from a container element
   * @param {*} container Container element to clear
   */
  static clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  /**
   * Fetch contributor information for the selected repository and render the
   * repo and its contributors as HTML elements in the DOM.
   * @param {number} index The array index of the repository.
   */
  async fetchContributorsAndRender(index, contributorsContainer) {
    try {
      App.clearContainer(contributorsContainer);
      const repo = this.repos[index];
      const contributors = await repo.fetchContributors();

      Util.createAndAppend('p', contributorsContainer, {
        text: 'Contributors',
        class: 'contributor-header',
      });
      const contributorList = Util.createAndAppend('ul', contributorsContainer, {
        class: 'contributor-list',
      });

      contributors
        .map(contributor => new Contributor(contributor))
        .forEach(contributor => contributor.render(contributorList));
    } catch (error) {
      this.renderError(error);
    }
  }

  /**
   * Render an error to the DOM.
   * @param {Error} error An Error object describing the error.
   */
  renderError(error) {
    const root = document.getElementById('root');
    Util.createAndAppend('div', root, { text: error, class: 'alert-error' });
    console.log(error); // TODO: replace with your own code
  }
}

const REPOS_URL = 'https://api.github.com/orgs/foocoding/repos?per_page=100';

window.onload = () => new App(REPOS_URL);
