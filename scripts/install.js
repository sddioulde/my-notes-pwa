let installPrompt;
const installButton = document.getElementById('install-button');

const installPWA = (event) => {
  installPrompt.prompt();

  event.srcElement.style.display = 'none';

  installPrompt.userChoice
    .then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('installing app...', choice);
      } else {
        console.log('NOT installing app...', choice);
      }
      installPrompt = null;
    });
};

installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', event => {
  installPrompt = event;

  installButton.style.visibility = 'visible';
});

window.addEventListener('appinstalled', event => {
  console.log('My Notes PWA was installed.', event);
});
