import React from  'react';

export default class TextArea extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{ this.props.label }</label>
                <div className="controls">
                    <textarea { ...this.props } {...this.props.input} className='form-control' rows='3'></textarea>
                </div>
            </div>
        );
    }
}