const socket = io('/'); //io는 socketio에 있는 메서드

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');
}
function helloUser() {
  const username = prompt('누구냐 넌');
}

function init() {
  helloUser();
}

init();
