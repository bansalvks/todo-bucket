import React from 'react';
import { TodoList } from './Components/TodoList';
import { InputForm } from './Components/InputForm';
import './TodoBucketApp.css'

export class TodoBucketApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buckets: [], // [{ name: '', items: [] }]
    }
  }

  addBucket = (bucketName) => {
    if (!bucketName) {
      return;
    }

    const { buckets } = this.state;

    this.setState({
      buckets: [
        { name: bucketName, items: [] },
        ...buckets
      ]
    })
  }

  addItem = (value, bucketIndex) => {
    const {
      buckets
    } = this.state;
    
    const bucket = buckets[bucketIndex];

    bucket.items = [{
      done: false,
      value,
    }, ...bucket.items]

    this.setState({ buckets: [...buckets] });
  }

  removeItem = (itemIndex, bucketIndex) => {
    const {
      buckets
    } = this.state;

    const bucket = buckets[bucketIndex];
    bucket.items.splice(itemIndex, 1);

    this.setState({ buckets: [...buckets] });

  }

  markTodoDone = (itemIndex, bucketIndex) => {
    const {
      buckets
    } = this.state;

    const bucket = buckets[bucketIndex];
    var item = bucket.items[itemIndex];
    item.done = !item.done;

    this.setState({ buckets: [...buckets] });
  }

  render() {
    const { buckets } = this.state;

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


export default TodoBucketApp;