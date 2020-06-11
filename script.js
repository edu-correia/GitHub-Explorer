const input = document.querySelector('.input')
const itens = document.querySelector('.itens')

function pesquisar() {
    fetch(`https://api.github.com/users/${input.value}`)
        .then(response => response.json())
        .then(json => render(json))
}

function render(data){
    fetch(`https://api.github.com/users/${input.value}/repos`)
        .then(response => response.json())
        .then(json => renderRepo(json))

    //Criando os elementos
    divElement = document.createElement('div');
    contentElement = document.createElement('div');
    imageElement = document.createElement('img');
    nameElement = document.createElement('h2');
    bioElement = document.createElement('p');
    linkElement = document.createElement('a');

    //Criando os textos
    nameText = document.createTextNode(data.name);
    bioText = document.createTextNode(data.bio);
    linkText = document.createTextNode('Acessar perfil');

    nameElement.appendChild(nameText);
    bioElement.appendChild(bioText);
    linkElement.appendChild(linkText);

    //Definindo atributos
    divElement.setAttribute('class', 'unico');
    contentElement.setAttribute('class', 'content')
    imageElement.setAttribute('src', data.avatar_url);
    linkElement.setAttribute('href', data.html_url);
    linkElement.setAttribute('target', '_blank');

    itens.appendChild(divElement);
    divElement.appendChild(imageElement);
    divElement.appendChild(contentElement);
    contentElement.appendChild(nameElement);
    contentElement.appendChild(bioElement);
    contentElement.appendChild(linkElement);

}

function renderRepo(data) {
    for(let i = 0 ; i < data.length; i++) {

        unicoDiv = document.createElement('div'); 
        reposDiv = document.createElement('div');
        repoDiv = document.createElement('a');

        repoTitle = document.createElement('h1');
        starsDiv = document.createElement('div');

        unicoDiv.setAttribute('class', 'unico');
        reposDiv.setAttribute('class', 'repos');
        repoDiv.setAttribute('class', 'repo')
        repoDiv.setAttribute('href', data[i].html_url)
        repoDiv.setAttribute('target', '_blank')
        starsDiv.setAttribute('class', 'a')


        title = document.createTextNode(data[i].name);
        starsNumber = document.createTextNode(`${data[i].stargazers_count} ♥`);

        repoTitle.appendChild(title);
        starsDiv.appendChild(starsNumber);

        itens.appendChild(unicoDiv);
        unicoDiv.appendChild(reposDiv);
        reposDiv.appendChild(repoDiv);
        repoDiv.appendChild(repoTitle);
        repoDiv.appendChild(starsDiv);

    };

    input.value = "";
}