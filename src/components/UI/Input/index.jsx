import React from  'react';

export default class Input extends React.Component {
    applyMask(value) {
        const { mask } = this.props;

        if (! mask) {
            return value;
        }

        return mask.mount(value);
    }

    onChangeHandler = (event) => {
        const { mask }  = this.props;

        if (mask) {
            event.target.value = mask.unmount(event.target.value);
        }

        this.props.onChange(event);
    }

    render() {
        const errors = (this.props.errors || []);
        const hasErrors = errors.length > 0;

        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <input
                        style={ hasErrors ? { borderColor: 'red', } : {} }
                        { ...this.props }
                        type={ this.props.type || 'text' }
                        value={ this.applyMask(this.props.value) }
                        onChange={ this.onChangeHandler }
                    />
                    <div style={{ marginTop: 0 }}>
                        {
                            errors.map(error => <div style={{color: 'red'}}>{error}</div>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}