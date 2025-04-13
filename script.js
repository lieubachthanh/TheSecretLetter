document.addEventListener('DOMContentLoaded', () => {
  const videoScreen = document.getElementById('videoScreen');
  const video = document.getElementById('video');
  const closeBtn = document.getElementById('closeVideoBtn');
  const popup = document.getElementById('imagePopup');
  const popupImg = document.getElementById('popupImg');

  const imageSources = [
    'assets/photo1.jpg',
    'assets/photo2.jpg',
    'assets/photo3.jpg',
    'assets/photo4.jpg',
    'assets/photo5.jpg',
    'assets/photo6.jpg',
    'assets/photo7.jpg',
    'assets/photo8.jpg',
    'assets/photo9.jpg',
    'assets/photo10.jpg'
  ];
  let photoIndex = 0;
  let petalInterval, imageInterval, envelopeInterval;
  let envelopeClicked = false;

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${4 + Math.random() * 4}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
  }

  petalInterval = setInterval(createPetal, 500);

  function createFallingImage() {
    const img = document.createElement('img');
    img.src = imageSources[photoIndex];
    img.className = 'falling-img';
    img.style.left = `${Math.random() * 90}vw`;
    img.style.animationDuration = `${7 + Math.random() * 5}s`;

    img.addEventListener('click', () => {
      popup.style.display = 'flex';
      popupImg.src = img.src;
    });

    document.body.appendChild(img);
    setTimeout(() => img.remove(), 10000);
    photoIndex = (photoIndex + 1) % imageSources.length;
  }

  imageInterval = setInterval(createFallingImage, 3000);

  popup.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  function createEnvelope() {
    if (envelopeClicked) return;

    const envelope = document.createElement('img');
    envelope.src = 'assets/1envelope.png';
    envelope.className = 'falling-envelope';
    envelope.style.left = Math.random() * 80 + 'vw';
    envelope.style.animationDuration = '18s';

    const blackOverlay = document.getElementById('blackOverlay');

    envelope.addEventListener('click', (e) => {
      if (envelopeClicked) return;
      envelopeClicked = true;
      e.stopPropagation();

      // 👇 Hiển thị lớp overlay fade đen (không che trước animation)
      setTimeout(() => {
        blackOverlay.classList.add('visible');

        // Khi fade xong -> bật video
        setTimeout(() => {
          envelope.remove();
          videoScreen.style.display = 'flex';
          video.currentTime = 0;
          blackOverlay.classList.remove('visible');
          video.play();
          closeBtn.style.display = 'none';
        }, 3000); // Delay sau khi overlay hoàn thành fade
      }, 500);

    });

    document.body.appendChild(envelope);
    setTimeout(() => envelope.remove(), 15000);
  }

  setTimeout(() => {
    envelopeInterval = setInterval(createEnvelope, 15000);
  }, 10000);

  video.addEventListener('ended', () => {
    closeBtn.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    video.pause();
    videoScreen.style.display = 'none';
    envelopeClicked = false;

    // Reset lại hiệu ứng
    document.querySelectorAll('.falling-img, .petal, .falling-envelope').forEach(el => el.remove());
    clearInterval(petalInterval);
    clearInterval(imageInterval);
    clearInterval(envelopeInterval);

    setTimeout(() => {
      petalInterval = setInterval(createPetal, 500);
      imageInterval = setInterval(createFallingImage, 3000);
      envelopeInterval = setInterval(createEnvelope, 10000);
    }, 2000);
  });
});
