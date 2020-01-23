// 리덕스와 연동된 컨테이너 컴포넌트 작성

import React, { Component } from 'react';
import Todos from 'components/Todos';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TodoActions } from 'store/actionCreators';

class TodosContainer extends Component {
  handleChange = (e) => {
    TodoActions.changeInput(e.target.value);
  }

  handleInsert = () => {
    const { input } = this.props;
    TodoActions.insert(input);
    TodoActions.changeInput('');
  }

  handleToggle = (id) => {
    TodoActions.toggle(id);
  }

  handleRemove = (id) => {
    TodoActions.remove(id);
  }

  render() {
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    const { input, todos } = this.props;

    return (
      <Todos
        input={input}
        todos={todos}
        onChange={handleChange}
        onInsert={handleInsert}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    );
  }
}

export default connect(
    ({ todo }) => ({
      // 일반 객체 다루듯이 다루면 됩니다.
      input: todo.input,
      todos: todo.todos
    }),
    (dispatch) => ({
      TodoActions: bindActionCreators(TodoActions, dispatch)
    })
  )(TodosContainer);