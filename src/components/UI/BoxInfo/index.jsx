function BoxInfo(props) {
    return (
        <div className={`box-info-${ props.type }`}>
            <div className="box-info-img">
                <img src={ props.imgIco } />
            </div>
            <div className="box-info-title">
                { props.title }
            </div>

            <div className="box-info-cont">
                { props.content }
            </div>
        </div>
    );
}

export default BoxInfo;