import App from '../App';
import { HomeSection } from '../components/HomeSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';

export default function Page() {
  return (
    <App
      home={<HomeSection />}
      portfolio={<PortfolioSection />}
      about={<AboutSection />}
      contact={<ContactSection />}
    />
  );
}
