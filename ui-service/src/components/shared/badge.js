import { Badge } from "react-bootstrap";


export default function BadgeComponent(props) {
    const {
        message,
        type,
        show,
    } = props;

    if(show===false){
        return null;
    }

    return (
        <Badge bg={type}>{message}</Badge>
    )  
}