import FeatureImage from "./components/FeatureImage";
import LandingPageContent from "./components/LandingPageContent";

export default function IndexPage() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full grid grid-cols-2 py-3 px-4">
        <LandingPageContent />
        <FeatureImage />
      </div>
    </div>
  );
}
