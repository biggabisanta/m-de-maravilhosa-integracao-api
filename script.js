const historia = document.querySelector('.maravilhosas__box');
const butao = document.querySelector('#bolinho')
const request = new XMLHttpRequest();

request.open('GET', 'https://theblackwomanhistory.firebaseio.com/.json', true);

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
                img.setAttribute('src', './img/img-mulher')
            }

            card.appendChild(img);
            historia.appendChild(card)
        }
        )
    }
}
request.send()

