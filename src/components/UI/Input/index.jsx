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
                        { ...this.props }
                        type={ this.props.type || 'text' }
                        value={ this.applyMask(this.props.value || '') }
                        className={ hasErrors ? 'field-danger' : '' }
                        onChange={ this.onChangeHandler }
                    />
                    <div style={{ marginTop: 0 }}>
                        {
                            errors.map(error => <div key={error} className={ hasErrors ? 'text-danger' : '' }>{ error }</div>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}