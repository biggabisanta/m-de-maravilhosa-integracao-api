const historia = document.querySelector('.maravilhosas__box');
const request = new XMLHttpRequest();

request.open('GET', 'http://localhost:5001/maravilhosas', true);

request.onload = function () {
    const data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {

        data.content.forEach(mulheresNegras => {
            const card = document.createElement('div');
            card.setAttribute('class', 'mulheres__perfil');

            const img = document.createElement('img');
            img.setAttribute('class', 'img-responsive');
            img.setAttribute('alt', 'Foto da personalidade');

            if (mulheresNegras.metadata && mulheresNegras.metadata.image) {
                img.setAttribute('src', mulheresNegras.metadata.image.url);
            }

            else {
                img.setAttribute('src', './img/img-mulher.png')
            }
            const name = document.createElement('p');
            name.textContent = mulheresNegras.title;
            card.appendChild(name);

            card.appendChild(img);
            historia.appendChild(card)

            const botao = document.createElement("button");
            
            botao.textContent = "Remover"; //textContent é alteração do texto
            botao.setAttribute("pegarId", mulheresNegras.id )
            card.appendChild(botao)
            botao.addEventListener("click", () => {

                const thisCard = botao.parentElement;
                const cardPai = thisCard.parentElement;

                fetch("http://localhost:5001/maravilhosas"+ mulheresNegras.id, {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                   
                })
                    .then(() => {
                        cardPai.removeChild(thisCard)
                    })
                    .catch((erro) => {
                        console.log(erro);
                    })
            })
        }

        )
    }
}
request.send()

const butao = document.getElementById('botao');
butao.addEventListener("click", (evento) => { //dar uma ação para o botão de clicar
    evento.preventDefault();

    const nome = document.querySelector(".Nome").value; //.value é pq está dentro input, pega o valor do campo nome
    const entrada = document.querySelector(".Entrada").value;

    fetch('http://localhost:5001/maravilhosas', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': nome,
            'metadata': {
                'image': {
                    'url': entrada,
                }
            }

        })
    })



})