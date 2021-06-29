import React from  'react';

export default class TextArea extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <textarea
                        name={ this.props.name }
                        value={ this.props.value }
                        defaultValue={ this.props.defaultValue || '' }
                        maxLength={ this.props.maxLength }

                        onChange={ this.props.onChange }
                    >
                    </textarea>
                </div>
            </div>
        );
    }
}