// Profile Info here
let overview = document.querySelector(".overview");
let username = "SarahHeinz";
let repoList = document.querySelector(".repo-list");
let allRepoInfo = document.querySelector(".repos");
let individualRepoInfo = document.querySelector(".repo-data");
let backToGallery = document.querySelector(".view-repos");
let filterInput = document.querySelector(".filter-repos");

const getUserData = async function () {
  const userData = await fetch(`https://api.github.com/users/${username}`);
  const data = await userData.json();
  displayUserData(data);
};
getUserData();

const displayUserData = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
      <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>
    `;
  overview.append(div);
  getRepos();
};

const getRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specRepoInfo(repoName);
  }
});

const specRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  displaySpecRepoInfo(repoInfo, languages);
};

const displaySpecRepoInfo = function (repoInfo, languages) {
  individualRepoInfo.innerHTML = "";
  const div = document.createElement("div");

  div.innerHTML = `
<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
  individualRepoInfo.append(div);
  individualRepoInfo.classList.remove("hide");
  allRepoInfo.classList.add("hide");
  backToGallery.classList.remove("hide");
};

backToGallery.addEventListener("click", function () {
  allRepoInfo.classList.remove("hide");
  individualRepoInfo.classList.add("hide");
  backToGallery.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for (const repo of repos) {
    const repoTextLow = repo.innerText.toLowerCase();
    if (repoTextLow.includes(searchLowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
