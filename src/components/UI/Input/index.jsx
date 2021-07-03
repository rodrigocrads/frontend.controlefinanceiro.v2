import React from  'react';

export default class Input extends React.Component {
    applyMask() {
        const masks = this.props.mask;

        if (!masks) {
            return this.props.value;
        }

        return masks.mask(this.props.value);
    }

    onChangeHandler = (event) => {
        const masks = this.props.mask;

        if (masks){
            event.target.value = masks.unmask(event.target.value);
        }
        
        this.props.onChange(event);
    }

    render() {
        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <input
                        { ...this.props }
                        type={ this.props.type || 'text' }
                        value={ this.applyMask(this.props.value) }
                        onChange={ this.onChangeHandler }
                    />
                </div>
            </div>
        );
    }
}