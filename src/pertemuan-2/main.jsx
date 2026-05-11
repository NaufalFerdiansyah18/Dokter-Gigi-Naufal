import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import QuoteText from "./QuoteText";
import Container from "./Container";
import './custom.css';


createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>
                <img src="img/gambar1.jpg" alt="logo" width="100%" />
                <HelloWorld />
                <QuoteText />
            </Container>


        </div>
    )