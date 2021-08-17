import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

window.addEventListener('load', () => {
  const url = 'https://jsprochat.herokuapp.com/';
  const socket = io(url);

  const startGameElem = document.querySelector('.start-game');
  const nameInputElem = document.getElementById('name');
  const nameFormElem = document.getElementById('nameForm');
  const chatElem = document.querySelector('.chat-wrap');
  const messageElem = document.querySelector('.message');
  const messageFormElem = document.getElementById('form');
  const messageInputElem = document.getElementById('input');

  const submitName = (e) => {
    e.preventDefault();

    if (nameInputElem.value) {
      ClientGame.init({ tagId: 'game', playerName: nameInputElem.value });

      socket.emit('start', nameInputElem.value);

      chatElem.style.display = 'block';

      nameFormElem.removeEventListener('submit', submitName);
      startGameElem.remove();
    }
  };
  nameFormElem.addEventListener('submit', submitName);

  const submitMessage = (e) => {
    e.preventDefault();

    const message = messageInputElem.value;

    if (message) {
      console.log('MESSAGE', message);
      socket.emit('chat message', message);
    }

    messageInputElem.value = '';
  };

  messageFormElem.addEventListener('submit', submitMessage);

  socket.on('chat connection', (data) => {
    console.log('SOCKET', data);
    messageElem.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
  });

  socket.on('chat disconnect', (data) => {
    console.log('SOCKET', data);
    messageElem.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
  });

  socket.on('chat message', (data) => {
    console.log('SOCKET Message', data);
    messageElem.insertAdjacentHTML('beforeend', `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`);
  });
});
