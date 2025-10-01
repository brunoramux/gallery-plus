import { Link } from "react-router";
import Container from "./container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react"
import cx from "classnames";
import Button from "./button";

interface MainHeaderProps extends React.ComponentProps<'div'> {}

export default function MainHeader({ className, ...props}: MainHeaderProps) {
    return (
        <Container as="header" className={cx(`
                flex justify-between items-center gap-10
            `, className)} 
        {...props}
        >
            <Link to='/'>
                <Logo className="h-5"/>
            </Link>

            <div className="flex gap-4">
                <Button>Nova foto</Button>
                <Button variant="secondary">Criar album</Button>
            </div>
        </Container>
    )
}