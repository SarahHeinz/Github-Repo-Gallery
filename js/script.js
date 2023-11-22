// Profile Info here
let overview = document.querySelector(".overview");
let username = "SarahHeinz";

//Fetch API JSON Data
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
  };
