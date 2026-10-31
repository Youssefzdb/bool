import Hero from "../components/Hero";
import Steps from "../components/Steps";
import Features from "../components/Features";
import UseCases from "../components/UseCases";
import { Statement, DualCards, FinalCTA } from "../components/Banners";

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <Statement />
      <Features />
      <UseCases />
      <DualCards />
      <FinalCTA />
    </>
  );
}
