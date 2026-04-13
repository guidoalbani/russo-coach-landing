const revealElements = document.querySelectorAll('.reveal');
const paragraphElements = document.querySelectorAll('main p');
const firstFrameVideos = document.querySelectorAll('video[data-firstframe="true"]');

const setFirstFramePoster = (video) => {
  if (video.videoWidth === 0 || video.videoHeight === 0) return;
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  video.setAttribute('poster', canvas.toDataURL('image/jpeg', 0.85));
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  paragraphElements.forEach((el, index) => {
    el.classList.add('copy-reveal');
    el.style.transitionDelay = `${Math.min(index * 30, 180)}ms`;
  });

  const copyObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('copy-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
  );

  paragraphElements.forEach((el) => copyObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
  paragraphElements.forEach((el) => el.classList.add('copy-visible'));
}

firstFrameVideos.forEach((video) => {
  if (video.readyState >= 2) {
    setFirstFramePoster(video);
    return;
  }
  video.addEventListener('loadeddata', () => setFirstFramePoster(video), { once: true });
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fromEmail = document.querySelector('#from-email')?.value.trim() || '';
    const subject = document.querySelector('#subject')?.value.trim() || '';
    const message = document.querySelector('#message')?.value.trim() || '';

    if (!fromEmail || !subject || !message) {
      contactForm.reportValidity();
      return;
    }

    const body = `Email mittente: ${fromEmail}\n\nMessaggio:\n${message}`;
    const mailto = `mailto:galbani_1999@yahoo.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
