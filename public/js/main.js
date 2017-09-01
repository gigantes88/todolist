(function(){
  let todoList = document.querySelector('.todoList');
  function getListItem() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/todolist', true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE) {  // XMLHttpRequest.DONE 대신 4
        if (this.status === 200) {
          // 통신이 성공하면 XMLHttpRequest 객체가 갖고 있는 responseText 메소드의 텍스트를 JSON형식으로 parsing 한다.
          let todoItemList = JSON.parse(this.responseText);
          todoItemList.map((el) => {
            insertItem(todoList, el.id, el.task);
          });

        } else {
          console.log('GET이 실패다. 이 루저.');
        }
      }
    }
  }

  function insertItem(element, id, task) {
    element.insertAdjacentHTML('beforeend', '<li class="list-group-item">' + task + '<button type="button" class="close delItem"><span>&times;</span></button></li>');
    // li안에 delete button이 동적으로 생성 되기 때문에 DOM에 추가한 후 클릭 이벤트 바인딩
    // bindDeleteButton(id);
  }

  getListItem();
})();