import Container from "../components/container";
import PhotosList from "../components/photos-list";

export default function PageHome() {
  return (
    <Container>
      <PhotosList
        photos={[]}
        loading
      />
    </Container>
  );
}