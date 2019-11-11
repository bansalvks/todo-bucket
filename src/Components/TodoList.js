import React from 'react';
import { TodoHeader } from './TodoHeader';
import { InputForm } from './InputForm';
import { Tasks } from './Tasks';

export function TodoList({
    bucket,
    addItem,
    removeItem,
    markTodoDone,
    bucketIndex,
}) {

    return (<div id="todo-bucket">
        <InputForm buttonText='Create Task' onValueChange={addItem} />
        <Tasks
            items={bucket.items}
            removeItem={removeItem}
            markTodoDone={markTodoDone}
            bucketIndex={bucketIndex}
        />
    </div>)
}