import type { MetaFunction } from "react-router";
import Grid from "../assets/components/Grid";

export const meta: MetaFunction = () => {
  return [
    { title: "AKMi's Photography | Premium Portfolio" },
    { name: "description", content: "Premium photography portfolio by AKMi. Capturing timeless moments with high-end aesthetics and professional quality." },
    { name: "keywords", content: "photography, portfolio, premium, wedding photography, portrait, AKMi" },
    { property: "og:title", content: "AKMi's Photography | Premium Portfolio" },
    { property: "og:description", content: "Premium photography portfolio by AKMi. Capturing timeless moments with high-end aesthetics." },
    { property: "og:image", content: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" },
  ];
};

export default function Home() {
  return <Grid />;
}
