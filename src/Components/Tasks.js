import React from 'react';

export function Tasks({
    items,
    bucketIndex,
    markTodoDone,
    removeItem,
}) {
    const itemsElement = items.map((item, i) => {
        var todoClass = item.done ?
            "done" : "undone";

        return (
            <li className="list-group-item ">
                <div className={todoClass}>
                    <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={() => {
                        markTodoDone(i, bucketIndex);
                    }}></span>
                    {item.value}
                    <button type="button" className="close" onClick={() => {
                        removeItem(i, bucketIndex);
                    }}>&times;</button>
                </div>
            </li>
        );
    })

    return (
        <ul className="list-group"> {itemsElement} </ul>
    );
}