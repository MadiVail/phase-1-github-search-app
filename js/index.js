function userSubmit(event) {
    const urlUsers = 'https://api.github.com/search/users?q=' + document.getElementById("search").value;
    const repoList = document.getElementById("repos-list")

    repoList.innerHTML = "";

    fetch (urlUsers, {
        method: 'GET',
    
        headers: {
    
            'Content-Type': 'application/json',
            'User-Agent': 'MadiVail',
    
            Accept: 'application/vnd.github.v3+json'
        },
    })
    .then(resp => resp.json())
    .then(json => appendUser(json));

    event.preventDefault();
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    form.addEventListener("submit", userSubmit)
}) 

function appendUser (users) {
    const userList = document.getElementById("user-list");

    users.items.forEach( User => {
        const card = document.createElement("div");
        const userName = document.createElement("h2");
        const avatar = document.createElement("img");
        const lineBreak = document.createElement("br");
        const profUrl = document.createElement("a");

        card.setAttribute("style", "background-color: #ADD8E6");
        card.setAttribute("align", "center");

        userName.innerText = User.login;
        avatar.src = User.avatar_url;
        profUrl.innerText = User.html_url;
        profUrl.href = User.html_url;

        card.appendChild(userName);
        card.appendChild(avatar);
        card.appendChild(lineBreak);
        card.appendChild(profUrl);
        
        userList.appendChild(card);

        card.addEventListener('click', function() {
            getUserRepo(User);
            let child = userList.lastElementChild;

            while (child) {
                userList.removeChild(child);
                child = userList.lastElementChild;
            }
        })

    })

}

function getUserRepo(user) {
    const urlRepos = 'https://api.github.com/users/' + user.login + "/repos";
    
    fetch (urlRepos, {
        method: 'GET',
    
        headers: {
    
            'Content-Type': 'application/json',
            'User-Agent': 'MadiVail',
    
            Accept: 'application/vnd.github.v3+json'
        },
    })
    .then(resp => resp.json())
    .then(json => appendRepos(json));
}

function appendRepos(users) {
    const repoList = document.getElementById("repos-list");

    users.forEach( User => {
        const card = document.createElement("div");
        const repoName = document.createElement("a");

        repoName.innerText = User.full_name;

        card.appendChild(repoName);
        
        repoList.appendChild(card);

    })
}