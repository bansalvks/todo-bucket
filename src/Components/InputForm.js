import React from 'react';

export class InputForm extends React.Component {
    componentDidMount() {
        this.refs.itemName.focus();
    }

    onSubmit = (event) => {
        event.preventDefault();
        var newItemValue = this.refs.itemName.value;

        if (newItemValue) {
            const { onValueChange } = this.props;
            onValueChange(newItemValue);
            this.refs.form.reset();
        }
    }
    
    render() {
        const { buttonText } = this.props;

        return (
            <form ref="form" onSubmit={this.onSubmit} className="form-inline">
                <input type="text" ref="itemName" className="form-control" placeholder="type..." />
                <button type="submit" className="btn btn-default">{buttonText}</button>
            </form>
        );
    }
}