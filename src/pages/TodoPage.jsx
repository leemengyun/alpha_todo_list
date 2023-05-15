import React, { useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
// import { AuthLinkText } from 'components/common/auth.styled';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState(dummyTodos);
  const [listLength, setListLength] = useState(todo.length);

  console.log(listLength);

  const handleChangeValue = (value) => {
    // setInputValue(e.target.value);
    setInputValue(value);
  };
  const handleAddTodos = () => {
    // alert('click todos');
    if (inputValue === '') {
      return;
    }

    setTodo([
      ...todo,
      {
        id: Math.random() * 100,
        title: inputValue,
        isDone: false,
      },
    ]);
    setListLength((prevLength) => {
      return prevLength + 1;
    });
    //送出後要清空input內容
    setInputValue('');
  };
  const handleKeyEnter = () => {
    // alert('click todos');
    if (inputValue === '') {
      return;
    }

    setTodo([
      ...todo,
      {
        id: Math.random() * 100,
        title: inputValue,
        isDone: false,
      },
    ]);

    //送出後要清空input內容
    setInputValue('');
  };

  const handleToggleDone = (id) => {
    setTodo((prevtodos) => {
      return prevtodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodo((prevtodos) => {
      return prevtodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        } else {
          return {
            ...todo,
            isEdit: false,
          };
        }
      });
    });
    // console.log(todo);
  };

  const handleOnSave = ({ id, title }) => {
    setTodo((prevtodos) => {
      return prevtodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false,
          };
        }
        return todo;
      });
    });
    // console.log(todo);
  };

  const handleOnDelete = (id) => {
    setTodo((prevtodos) => {
      return prevtodos.filter((t) => t.id !== id);
    });
    setListLength((prevLength) => {
      return prevLength - 1;
    });
  };

  return (
    <div>
      TodoPage
      <Header username='Eva' />
      <TodoInput
        inputValue={inputValue}
        onChangeValue={handleChangeValue}
        onAddTodo={handleAddTodos}
        onKeyEnter={handleKeyEnter}
      />
      <TodoCollection
        todos={todo}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleOnSave}
        onDelete={handleOnDelete}
      />
      <Footer listLength={listLength} />
    </div>
  );
};

export default TodoPage;
