import React from  'react';

export default class Select extends React.Component {
    renderOptions(options) {
        return options.map(option => <option key={ option.value } value={ option.value }> { option.label } </option>);
    }

    render() {
        const { label, input, options, required} = this.props;

        return (
            <div className="form-group">
                <label>{ label }</label>

                <div className="controls">
                    <select { ...input } required={ required } >
                        { this.renderOptions(options) }
                    </select>
                </div>

            </div>
        );
    }
}