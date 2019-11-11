import { TODO_ACTIONS } from './actions';

const LOCAL_STORAGE_BUCKET = 'buckets'

let localState = [];

try {
    localState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BUCKET))
} catch (error) {

}

const initialState = localState || {
    buckets: []
};

const TodoReducer = (state = initialState, action = {}) => {

    let changes = {};

    switch (action.type) {
        case TODO_ACTIONS.ADD_BUCKET: {
            const { buckets } = state;
            changes = {
                buckets: [{ name: action.name, items: [] }, ...buckets]
            }
            break;
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

            changes = {
                buckets: [...buckets]
            }
            break;
        }
        case TODO_ACTIONS.REMOVE_TASK: {
            const { buckets } = state;
            const taskBucket = buckets[action.bucketIndex]


            taskBucket.items.splice(action.taskIndex, 1);
            changes = {
                buckets: [...buckets]
            };
            break;
        }
        case TODO_ACTIONS.DONE_TASK: {
            const { buckets } = state;
            const taskBucket = buckets[action.bucketIndex]

            const item = taskBucket.items[action.taskIndex];
            item.done = !item.done;

            changes = {
                buckets: [...buckets]
            };
            break;
        }
        default:
            return state;
    }

    if (Object.keys(changes).length > 0) {
        localStorage.setItem(LOCAL_STORAGE_BUCKET, JSON.stringify(changes || {}))
        return changes;
    }
    else {
        return state;
    }
};

export default TodoReducer;
