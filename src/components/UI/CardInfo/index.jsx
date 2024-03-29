function CardInfo(props) {
    return (
        <div className="col-md-4">
            <div className={`small-box ${props.bgClass}`}>
                <div className="inner">
                    <h3>{ props.value }</h3>
                    <p>{ props.title }</p>
                </div>
                <div className="icon">
                    <i className={`ion ${props.iconClass}`}></i>
                </div>
            </div>
        </div>
    );
}

export default CardInfo;