import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const startGameElem = document.querySelector('.start-game');
  const inputElem = document.getElementById('name');
  const formElem = document.getElementById('nameForm');

  const submitName = (e) => {
    e.preventDefault();

    if (inputElem.value) {
      ClientGame.init({ tagId: 'game', playerName: inputElem.value });
      formElem.removeEventListener('submit', submitName);
      startGameElem.remove();
    }
  };
  formElem.addEventListener('submit', submitName);
});
