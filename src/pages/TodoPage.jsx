import React, { useEffect, useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
// import api component
import { getTodos, createTodo } from '../api/todos';

// const dummyTodos = [
//   {
//     title: 'Learn react-router',
//     isDone: true,
//     id: 1,
//   },
//   {
//     title: 'Learn to create custom hooks',
//     isDone: false,
//     id: 2,
//   },
//   {
//     title: 'Learn to use context',
//     isDone: true,
//     id: 3,
//   },
//   {
//     title: 'Learn to implement auth',
//     isDone: false,
//     id: 4,
//   },
// ];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState([]);
  const [listLength, setListLength] = useState(todo.length);

  // Pages handle event---------------
  const handleChangeValue = (value) => {
    // setInputValue(e.target.value);
    setInputValue(value);
  };

  //handleAddTodos -  will trigger - api creatTodo
  const handleAddTodos = async () => {
    // alert('click todos');
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodo([
        ...todo,
        {
          // database will create id itself
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false,
        },
      ]);

      setListLength((prevLength) => {
        return prevLength + 1;
      });
      //送出後要清空input內容
      setInputValue('');
    } catch (error) {
      console.log(`[createData failed]`);
    }
  };
  //handleKeyEnter -  will trigger - api creatTodo
  const handleKeyEnter = async () => {
    // alert('click todos');
    if (inputValue === '') {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodo([
        ...todo,
        {
          // database will create id itself
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false,
        },
      ]);
      //送出後要清空input內容
      setInputValue('');
    } catch (error) {
      console.log(`[createData failed]`);
    }
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

  // Api event ---------------
  // get todo data when page renders
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodo(
          todos.map((todo) => ({
            ...todo,
            isEdit: false,
          }))
        );
      } catch (error) {
        console.log(`[getTodosAsync failed]`);
      }
    };
    getTodosAsync();
  }, []);

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
