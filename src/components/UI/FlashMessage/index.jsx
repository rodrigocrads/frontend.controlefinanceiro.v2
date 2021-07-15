function FlashMessage(props) {
    return (
        <div class={`alert alert-${ props.type }`}>
            { <b>{ props.title }</b> } { props.description }
        </div>
    );
}

export default FlashMessage;