import { TODO_ACTIONS } from './actions';

const initialState = {
    buckets: []
};

const TodoReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case TODO_ACTIONS.ADD_BUCKET: {
            const { buckets } = state;
            return {
                buckets: [{ name: action.name, items: [] }, ...buckets]
            }
        }
        case TODO_ACTIONS.ADD_TASK: {
            const { buckets } = state;
            const task = {
                done: false,
                value: action.value,
            }

            const taskBucket = { ...buckets[action.bucketIndex] }
            taskBucket.items.push(task);

            buckets[action.bucketIndex] = taskBucket;

            return {
                buckets: [...buckets]
            }

        }
        case TODO_ACTIONS.REMOVE_TASK: {
            const { buckets } = state;
            const taskBucket = buckets[action.bucketIndex]


            taskBucket.items.splice(action.taskIndex, 1);
            return {
                buckets: [...buckets]
            };
        }
        case TODO_ACTIONS.DONE_TASK: {
            const { buckets } = state;
            const taskBucket = buckets[action.bucketIndex]

            const item = taskBucket.items[action.taskIndex];
            item.done = !item.done;

            return {
                buckets: [...buckets]
            };
        }
        default:
            return state;
    }
};

export default TodoReducer;
