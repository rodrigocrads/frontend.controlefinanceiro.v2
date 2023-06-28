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

        this.props.input.onChange(event);
    }

    render() {
        const errors = (this.props.meta.error || []);
        const hasErrors = errors.length > 0;

        return (
            <div className="form-group">
                <label>
                    { this.props.label }
                    { this.props.required && <span style={{ color: 'red' }}> *</span> }
                </label>
                <input
                    { ...this.props }
                    type={ this.props.type || 'text' }
                    value={ this.applyMask(this.props?.input?.value || '') }
                    className="form-control"
                    onChange={ this.onChangeHandler }
                />
                <div style={{ marginTop: 0 }}>
                    {
                        errors.map(error => <div key={error} className={ hasErrors ? 'text-danger' : '' }>{ error }</div>)
                    }
                </div>
            </div>
        );
    }
}