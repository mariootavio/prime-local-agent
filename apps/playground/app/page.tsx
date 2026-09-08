import { Header } from "@prime2b/ui-kit/sections/Header";
import { Hero } from "@prime2b/ui-kit/sections/Hero";
import { ProductsServices } from "@prime2b/ui-kit/sections/ProductsServices";
import { Differentiators } from "@prime2b/ui-kit/sections/Differentiators";
import { ConversionBanner } from "@prime2b/ui-kit/sections/ConversionBanner";
import { HowItWorks } from "@prime2b/ui-kit/sections/HowItWorks";
import { About } from "@prime2b/ui-kit/sections/About";
import { SocialProof } from "@prime2b/ui-kit/sections/SocialProof";
import { FAQ } from "@prime2b/ui-kit/sections/FAQ";
import { LocationContact } from "@prime2b/ui-kit/sections/LocationContact";
import { Footer } from "@prime2b/ui-kit/sections/Footer";
import {
  mockPrimeLocal,
  mockHeaderNavItems,
  mockHero,
  mockProductsServices,
  mockDifferentiators,
  mockConversionBanner,
  mockHowItWorks,
  mockAbout,
  mockSocialProof,
  mockFAQ,
  mockLocationContact,
  mockFooter,
} from "./mock/prime-local.mock";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header is fixed/overlaid — Hero starts at the true top, behind it. */}
      <Header content={{ ...mockPrimeLocal, navItems: mockHeaderNavItems }} />
      <Hero content={mockHero} />
      <ProductsServices content={mockProductsServices} />
      {/*
        -mt-px on every opaque section boundary below: guards against
        the hairline gap Chromium/Firefox can render between two
        adjacent flex-col children when their computed heights land on
        a sub-pixel boundary (varies with browser zoom/DPI — confirmed
        via computed styles that sections have no border/shadow/outline
        of their own to explain a visible line). Forces a guaranteed
        1px overlap so no gap can ever show between opaque sections.
      */}
      <div className="-mt-px">
        <Differentiators content={mockDifferentiators} />
      </div>
      <div className="-mt-px">
        <ConversionBanner content={mockConversionBanner} />
      </div>
      <div className="-mt-px">
        <HowItWorks content={mockHowItWorks} />
      </div>
      <div className="-mt-px">
        <About content={mockAbout} />
      </div>
      <div className="-mt-px">
        <SocialProof content={mockSocialProof} />
      </div>
      <div className="-mt-px">
        <FAQ content={mockFAQ} />
      </div>
      <div className="-mt-px">
        <LocationContact content={mockLocationContact} />
      </div>
      <div className="-mt-px">
        <Footer content={mockFooter} />
      </div>
    </div>
  );
}
