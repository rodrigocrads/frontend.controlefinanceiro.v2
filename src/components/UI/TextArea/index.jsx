import React from  'react';

export default class TextArea extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <textarea { ...this.props }>
                    </textarea>
                </div>
            </div>
        );
    }
}