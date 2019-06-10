let installPrompt;
const installButton = document.getElementById('install-button');

const installPWA = (event) => {
  installPrompt.prompt();

  event.srcElement.style.display = 'none';

  installPrompt.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      installPrompt = null;
    });
};

installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', event => {
  console.log('PROMTING BEFORE INSTALL', installButton);
  installPrompt = event;

  installButton.style.visibility = 'visible';
});

window.addEventListener('appinstalled', event => {
  console.log('My Notes PWA was installed.', event);
});
