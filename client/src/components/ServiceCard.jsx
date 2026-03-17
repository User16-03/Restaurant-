const ServiceCard = ({ icon, title, description }) => {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4 hover-effect">
                <div className="card-body">
                    <div className="fs-1 text-warning mb-3">
                        {icon}
                    </div>
                    <h5 className="card-title fw-bold mb-3">{title}</h5>
                    <p className="card-text text-muted">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
