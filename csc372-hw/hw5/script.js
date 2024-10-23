
// Event listener for search button click
document.getElementById('searchBtn').addEventListener('click', function () {
  const username = document.getElementById('username').value || 'RatedCarcass6'; //Default
  fetchGitHubRepos(username);
});

/**
 * Automatically fetch repositories for the default GitHub user when the page loads.
 * Uses my default username 'RatedCarcass6'.
 * @function
 */

window.onload = function() {
  fetchGitHubRepos('RatedCarcass6'); 
};

function fetchGitHubRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayRepos(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

/**
 * Displays the list of GitHub repositories in the gallery.
 * Each repository is shown as a card containing the repository name, description, language, creation date,
 * last update, number of commits, and number of watchers.
 * @param {Array} repos - Array of repository objects from the GitHub API response.
 */

function displayRepos(repos) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear the gallery for new results

  repos.forEach(repo => {
    const repoCard = document.createElement('div');
    repoCard.classList.add('repo-card');

    repoCard.innerHTML = `
        <i class="fab fa-github"></i>
        <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
        <p>${repo.description || 'No description available'}</p>
        <p><strong>Languages:</strong> ${repo.language || 'Unknown'}</p>
        <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
        <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <div class="repo-stats">
          <span>Commits: ${repo.size}</span>
          <span>Watchers: ${repo.watchers_count}</span>
        </div>
      `;

    gallery.appendChild(repoCard);
  });
}