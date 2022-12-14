import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      // id 값이 같은 항목의 checked 값을 Toggle 함
      checked: item.id === todoItem.id ? !item.checked : item.checked
    }));

    setTodoList(nextTodoList);
  };

  // 수정 버튼 클릭시 input 태그로 변경 구현
  const [edited, setEdited] = useState(false); // 수정 모드인지 확인하기 위한 플래그 값
  const onClickEditButton = () => {
    // 클릭시 edited 값을 true로 바꿈
    setEdited(true);
  };

  // 수정 기능 구현
  const [newText, setNewTest] = useState(todoItem.text); // 새로운 아이템 내용
  const onChangeEditInput = (e) => {
    setNewTest(e.target.value);
  };

  const onClickSubmitButton = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      text: item.id === todoItem.id ? newText : item.text // 새로운 아이템 내용을 넣어줌
    }));
    setTodoList(nextTodoList); // 새로운 리스트를 넣어줌

    setEdited(false); // 수정모드를 다시 읽기모드로 변경
  };

  // 포커싱
  const editInputRef = useRef(null);
  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  // 삭제 버튼 기능 구현: 삭제 버튼 클릭 ->  deleted 값 true로.
  const onClickDeleteButton = () => {
    if (window.confirm("정말로 지우실건가요?")) {
      const nextTodoList = todoList.map((item) => ({
        ...item,
        deleted: item.id === todoItem.id ? true : item.deleted
      }));

      setTodoList(nextTodoList);
    }
  };

  return (
    <li className="todoapp__item">
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
      <input
        type="checkbox"
        className="todoapp__item-checkbox"
        checked={todoItem.checked}
        onChange={onChangeCheckbox}
      />
      {
        // 아이템 내용
        edited ? (
          <input
            type="text"
            value={newText}
            ref={editInputRef} // ref 로 DOM에 접근
            onChange={onChangeEditInput}
          />
        ) : (
          <span
            className={`todoapp__item-ctx ${
              todoItem.checked ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {todoItem.text}
          </span>
        )
      }
      {
        // 수정 버튼
        // 완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
        !todoItem.checked ? (
          edited ? (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickSubmitButton} // 클릭 이벤트 발생시 onClickSubmitButton 수행
            >
              👌
            </button>
          ) : (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickEditButton}
            >
              ✏
            </button>
          )
        ) : null
      }

      {/* 삭제 버튼 */}
      <button
        type="button"
        className="todoapp__item-delete-btn"
        onClick={onClickDeleteButton}
      >
        🗑
      </button>
    </li>
  );
};

ToDoItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string.isRequired
  }),
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  setTodoList: PropTypes.func.isRequired
};

export default ToDoItem;
