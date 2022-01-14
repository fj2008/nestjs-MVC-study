const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
  socket.on('new_chat', (data) => {
    const { chat, username } = data;
    drawNewChat(`${username}: ${chat}`);
  });
});

//이벤트 콜백 함수
const handleSubmit = (event) => {
  event.preventDefault(); //form새로고침 취소
  const inputValue = event.target.elements[0].value; //인풋값 가져오기
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue); //백엔드로 보내기
    //화면에 그리기
    drawNewChat(`me : ${inputValue}`);
    event.target.elements[0].value = '';
  }
};

const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
      <div>
        ${message}
      </div>
      `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  //이벤트연결
  formElement.addEventListener('submit', handleSubmit);
}

init();
