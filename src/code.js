const showPixelsFound = (count) => {
  const container = document.getElementById('answer');
  const h2 = document.createElement('h2');
  h2.innerText = `There are ${count} green pixels in the image.`;

  if (container.childElementCount > 0)
    container.removeChild(container.lastChild);

  container.appendChild(h2);
}

const countPixels = (context) => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixel = imageData.data;

  let count = 0;
  setTimeout(() => {
    for (let i = 0; i < pixel.length; i += 4) {
      if (pixel[i + 1] > 0 && pixel[i + 1] < 255)
        count += 1;
    }
    
    showPixelsFound(count);
  }, 100);
}

const renderBMP = () => {
  const img = document.getElementById('syngenta');
  const canvas = document.getElementById('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);

  const button = document.getElementById('button');
  button.addEventListener('click', () => countPixels(context));
}

window.onload = () => {
  renderBMP();
}

