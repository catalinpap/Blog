import Image from "next/image";
import "./Card.css";

const Card: React.FC<{}> = () => {
    return (
        <div className="card-wrapper">
            <span className="category-tag absolute top-3 right-3">Interior Design</span>
            <Image src={"https://images.unsplash.com/photo-1524061662617-6a29d732e3ef?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                alt={""} 
                width={300} 
                height={300}
                className="card-thumbnail"
            />
            <div className="flex flex-col justify-between px-5 pt-4 pb-3">
                <h2 className="card-title">Growing a distributed product design team</h2>
                <p className="card-description">At enim sapien erat nullam placerat felis pellentesque nam, orci justo odio...</p>
                <p className="card-info">by <b>Sean Anderson</b>, Sep 8 2023</p>
            </div>
            
        </div>
    );
};

export default Card;
