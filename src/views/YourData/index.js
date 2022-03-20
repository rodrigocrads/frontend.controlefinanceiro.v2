import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BasicDataForm from '../../components/YourData/BasicData';
import { updateUser } from '../../redux/actions/userAction';

class YourData extends React.Component {
    onSubmitHandler(data) {
        this.props.updateUser(data);
    }

    render() {
        return (
            <div>
                <div className="header_walk_links">
                    Seus dados
                </div>
                <div className="widget">
                    <div className="widget_header">
                        Dados básicos
                    </div>

                    <div className="widget_content">
                        <BasicDataForm
                            onSubmit={(data) => this.onSubmitHandler(data)} />
                    </div>
                </div>

                <div className="widget">
                    <div className="widget_header">
                        Editar senha
                    </div>

                    <div className="widget_content">
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ updateUser }, dispatch)
);

export default connect(null, mapDispatchToProps)(YourData);