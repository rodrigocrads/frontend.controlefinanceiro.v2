import React from  'react';

export default class Select extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <select
                        { ...this.props }
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