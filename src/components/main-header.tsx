import { Link } from "react-router";
import Container from "./container";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react"
import cx from "classnames";
import Button from "./button";
import PhotosSearch from "./photos-search";
import Divider from "./divider";
import PhotoNewDialog from "../contexts/photos/components/photo-new-dialog";
import AlbumNewDialog from "../contexts/albums/components/album-new-dialog";

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

            <PhotosSearch />
            <Divider orientation="vertical" className="h-10"/>

            <div className="flex gap-4">
                <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
                <AlbumNewDialog trigger={<Button variant="secondary">Criar album</Button>} />
            </div>
        </Container>
    )
}