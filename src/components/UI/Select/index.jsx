import React from  'react';

export default class Select extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <select
                        name={ this.props.name }
                        value={ this.props.value }
                        onChange={ this.props.onChange }
                        required={ this.props.required }
                    >
                        {
                            this.props.options.map(option => (
                                <option value={ option.value }> { option.label } </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        );
    }
}