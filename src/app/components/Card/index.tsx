import { ReactNode } from "react";
import { Card } from "react-bootstrap";

export default function MyCard({
    children,
    title,
    backgroundColor,
    textColor,
}: {
    title?: string;
    children?: ReactNode;
    textColor?: string;
    backgroundColor?: string;
}) {
    return (
        <Card className="border-0 shadow-sm" style={{ backgroundColor: backgroundColor ? backgroundColor : "#fff" }}>
            <Card.Body>
                <Card.Title style={{ color: textColor ? textColor : "#000" }}>{title}</Card.Title>
                {children}
            </Card.Body>
        </Card>
    );
}
