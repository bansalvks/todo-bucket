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
  constructor(props) {
    super(props)
    this.state = {
      selectedBucketIndex: 0
    }
  }
  addBucket = (bucketName) => {
    if (!bucketName) {
      return;
    }
    this.props.addBucketDispatch({ name: bucketName })
    this.setState({ selectedBucketIndex: 0 })
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

  bucketSelection = (index) => {
    this.setState({
      selectedBucketIndex: index
    })
  }

  render() {
    const { buckets } = this.props;

    // const todoListElements = buckets.map((bucket, i) => {
    //   return <TodoList
    //     key={bucket.name + i}
    //     bucket={bucket}
    //     addItem={(value) => {
    //       this.addItem(value, i)
    //     }}
    //     removeItem={this.removeItem}
    //     markTodoDone={this.markTodoDone}
    //     bucketIndex={i}
    //   />
    // });

    const bucketElements = (<ul class="list-group">
      {buckets.map((bucket, i) => {
        return <li onClick={() => this.bucketSelection(i)} className="list-group-item bucket-items" > {bucket.name}</li>;
      })
      }
    </ul >)

    const selectedBucketObject = this.props.buckets[this.state.selectedBucketIndex]

    const todoListElement = selectedBucketObject ? (<TodoList
      key={selectedBucketObject.name + this.state.selectedBucketIndex}
      bucket={selectedBucketObject}
      addItem={(value) => {
        this.addItem(value, this.state.selectedBucketIndex)
      }}
      removeItem={this.removeItem}
      markTodoDone={this.markTodoDone}
      bucketIndex={this.state.selectedBucketIndex}
    />) : null;

    return (<div class="main">
      <div class="left">
        <div className="input-form-inline">
          <InputForm buttonText='Create Bucket' onValueChange={this.addBucket} />
        </div>
        <div>
          {bucketElements}
        </div>
      </div>
      <div class="right">
        {todoListElement}
      </div>
    </div>)
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