import icoMenuEdit from '../../img/edit.png';

function Dashboard() {
    return (
        <div>
            <div className="header_walk_links">
                DASHBOARD
            </div>
            <div className="widget">
                <div className="widget_header">
                    <img src={icoMenuEdit} className="ico" alt="" />
                    Economia do mês
                </div>
                <div className="widget_content"></div>
            </div>
        </div>
    );
}

export default Dashboard;