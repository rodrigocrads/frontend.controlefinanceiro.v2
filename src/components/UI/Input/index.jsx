import React from  'react';

export default class Input extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <input
                        type={ this.props.type || 'text' }
                        name={ this.props.name }
                        value={ this.props.value }

                        maxLength={ this.props.maxLength || '' }
                        required={ this.props.require }

                        onChange={ this.props.onChange }
                    />
                </div>
            </div>
        );
    }
    
}