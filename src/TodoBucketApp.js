import { connect } from 'react-redux';
import {
  addBucket,
  addTask,
  doneTask,
  removeTask,
} from './actions'
import React from 'react';
import { TodoList } from './Components/TodoList';
import { InputForm } from './Components/InputForm';
import './TodoBucketApp.css'
export class TodoBucketApp extends React.Component {
  addBucket = (bucketName) => {
    if (!bucketName) {
      return;
    }
    this.props.addBucketDispatch({ name: bucketName })
  }

  addItem = (value, bucketIndex) => {
    this.props.addTaskDispatch({ value, bucketIndex })
  }

  removeItem = (taskIndex, bucketIndex) => {
    this.props.removeTaskDispatch({ taskIndex, bucketIndex })
  }

  markTodoDone = (taskIndex, bucketIndex) => {
    this.props.doneTaskDispatch({ taskIndex, bucketIndex })
  }

  render() {
    const { buckets } = this.props;

    const todoListElements = buckets.map((bucket, i) => {
      return <TodoList
        key={bucket.name + i}
        bucket={bucket}
        addItem={(value) => {
          this.addItem(value, i)
        }}
        removeItem={this.removeItem}
        markTodoDone={this.markTodoDone}
        bucketIndex={i}
      />
    });

    return (
      <div>
        <div className="bucket-form">
          <InputForm buttonText='Create Bucket' onValueChange={this.addBucket} />
        </div>

        {todoListElements}
      </div>
    )
  }
}


function mapStateToProps(state, props) {
  const {
    buckets
  } = state;

  return {
    buckets
  };
}

export default connect(mapStateToProps, {
  addBucketDispatch: addBucket,
  addTaskDispatch: addTask,
  doneTaskDispatch: doneTask,
  removeTaskDispatch: removeTask,
})(TodoBucketApp);