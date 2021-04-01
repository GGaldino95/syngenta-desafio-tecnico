# Desafio Técnico - Syngenta [2021]

## Requisito:
> _Conte a quantidade de pixels verdes._

<br>

Neste _README_ estará detalhado todo o processo feito para chegar no resultado desejado.
<br><br>

 - Primeiro passo: **Renderizar a imagem em um Canvas.**

```javascript
  const img = document.getElementById('syngenta'); // Imagem original contida no HTML
  const canvas = document.getElementById('canvas'); // Canvas existente no HTML

  //Definições das dimensões do canvas equivalente às dimensões da imagem
  canvas.width = img.width;
  canvas.height = img.height;

  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0); // Renderização do BMP dentro do canvas
```
<br>

 - Segundo passo: **Lógica de pesquisa.**

Implementei uma lógica relativamente simples, de capturar toda a informação do bitmap numa constante através do `getImageData` e a partir disso, capturar o array de pixels dentro de uma constante `pixel`. Feito isso, bastava percorrer este array.

No Array de pixels, os pixels ficam distribuídos em um conjunto de cores, da seguinte forma: 
> -- PIXEL 1 ---------- PIXEL 2 ---------- PIXEL 3 ---------- PIXEL 4 ... <br>
> pixel[0] = R ----- pixel[4] = R ----- pixel[8] = R ----- pixel[12] = R ... <br>
> pixel[1] = G ----- pixel[5] = G ----- pixel[9] = G ----- pixel[13] = G ... <br>
> pixel[2] = B ----- pixel[6] = B ----- pixel[10] = B --- pixel[14] = B ... <br>
> pixel[3] = A ----- pixel[7] = A ----- pixel[11] = A --- pixel[15] = A ... <br> 


... e assim por diante.

Desta forma, eu só precisaria me preocupar em verificar os pixels no campo `G` se estes continham um valor entre 1 e 254 (Já que existem pixels pretos `0` e pixels brancos `255`).

```javascript
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height); // Objeto com as informações da imagem
  const pixel = imageData.data; // Array de pixels

  let count = 0; // Contador
  setTimeout(() => {
    for (let i = 0; i < pixel.length; i += 4) { // Iteração do array percorrendo apenas os pixels do campo G
      if (pixel[i + 1] > 0 && pixel[i + 1] < 255) // Verificando se o pixel do campo G tem valor entre 1 e 254
        count += 1;
    }

    showPixelsFound(count); // Função para renderizar na tela quantos pixels foram encontrados
  }, 100);
```

... a partir disto, me restou apenas dar uma estilizada na página e fazer a função para que fosse renderizado na tela um texto com a contagem dos pixels verdes. <br><br>

## O resultado final: <br>
![Resultado](/img/resultado.png) <br>

_Minhas impressões: No começo achei que seria algo impossível de se fazer, pois nunca havia tido contato com a manipulação de bitmap, mas por fim acabei me divertindo com este código e adquirindo mais conhecimento, o que é sempre bem-vindo._

<br>

### **_Quaisquer dúvidas por favor entrem em contato comigo!_**