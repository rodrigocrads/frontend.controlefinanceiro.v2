import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class Message extends React.Component {
    render() {
        return (
            <>
                <ReduxToastr
                    timeOut={5000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    getState={state => state.toastr}
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick
                />
            </>
        );
    }
}

export default Message;