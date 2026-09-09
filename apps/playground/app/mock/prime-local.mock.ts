import manifest from "@prime2b/ui-kit/manifest.json";
import type { HeaderNavItem } from "@prime2b/ui-kit/sections/Header";
import type { HeroContent } from "@prime2b/ui-kit/sections/Hero";
import type { ProductsServicesContent } from "@prime2b/ui-kit/sections/ProductsServices";
import type { DifferentiatorsContent } from "@prime2b/ui-kit/sections/Differentiators";
import type { ConversionBannerContent } from "@prime2b/ui-kit/sections/ConversionBanner";
import type { HowItWorksContent } from "@prime2b/ui-kit/sections/HowItWorks";
import type { AboutContent } from "@prime2b/ui-kit/sections/About";
import type { SocialProofContent } from "@prime2b/ui-kit/sections/SocialProof";
import type { FAQContent } from "@prime2b/ui-kit/sections/FAQ";
import type { LocationContactContent } from "@prime2b/ui-kit/sections/LocationContact";
import type { FooterContent } from "@prime2b/ui-kit/sections/Footer";

/**
 * Mock of prime-local.json, for previewing ui-kit sections in the
 * playground until the real interview (`/prime-local create`) and
 * composition step exist. Shape follows packages/ui-kit/prime-local.schema.json.
 *
 * Real Prime2B Marketing Digital data — not a fictional example
 * client. `cores` is the Vision2B palette (orange/dark), the single
 * active theme in this sandbox — swap these four values to preview
 * ui-kit sections under a different client's palette.
 */
export const mockPrimeLocal = {
  nome: "Prime2B Marketing Digital",
  segmento: "Marketing Digital",
  cidade: "São José do Rio Preto",
  estado: "SP",
  enderecoCompleto: "R. Independência, 3582 - São José do Rio Preto/SP",
  aboutText:
    "Agência de marketing digital especializada em atrair e converter clientes para negócios locais.",
  whatsapp: "5517996590760",
  mensagemPrincipalWhatsapp:
    "Olá, gostaria de saber mais sobre o serviço da Prime2B",
  horario: "Segunda a sexta, das 9h às 18h",
  email: "contato@prime2b.digital",
  instagram: "https://www.instagram.com/prime2b.oficial/",
  facebook: "https://www.facebook.com/prime2b.oficial",
  servicos: [
    "Tráfego Pago (Google Ads e Meta Ads)",
    "Google Maps",
    "Criação de Sites",
    "Gestão de Redes Sociais",
    "Marketing de Conteúdo",
    "MeChameNoZap",
    "Tour Virtual 360°",
    "Implementação de E-commerce Nuvemshop",
  ],
  diferenciaisConfirmados: [
    "Parceira de crescimento com foco em resultado",
    "Atendimento consultivo personalizado por segmento",
    "Relatórios semanais de performance",
  ],
  logoUrl: "/logo-clara.png",
  cores: {
    primary: "#FF4001",
    secondary: "#0a0a0a",
    text: "#000000cc",
    accent: "#FF4001",
  },
};

/**
 * DEV-ONLY subset for the playground menu — a real composition must
 * put every showInNav:true section it actually included in the page
 * on the Header's menu, never a fixed subset like this one (see
 * packages/agent/rules/content-rules.md). This exists only because
 * the playground doesn't yet render the other showInNav sections
 * (Benefícios, Galeria), so listing them in the menu would link to
 * anchors that don't exist.
 */
const DEV_MOCK_NAV_ANCHOR_IDS = [
  "inicio",
  "servicos",
  "diferenciais",
  "como-funciona",
  "sobre",
  "avaliacoes",
  "faq",
  "contato",
];

export const mockHeaderNavItems: HeaderNavItem[] = manifest.sections
  .filter(
    (section) =>
      section.showInNav && DEV_MOCK_NAV_ANCHOR_IDS.includes(section.anchorId)
  )
  .map((section) => ({
    label: section.navLabel,
    anchorId: section.anchorId,
  }));

/**
 * Placeholder editorial copy (Lorem Ipsum) — Hero's headline/subtitle/
 * highlights aren't raw prime-local.json fields, they're composer-
 * generated content. Real copy comes later; this only exercises layout.
 */
export const mockHero: HeroContent = {
  headline: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit",
  subtitle:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.",
  backgroundImageUrl:
    "https://prime2b.digital/wp-content/uploads/2025/01/hero-prime2b-2.webp",
  nome: mockPrimeLocal.nome,
  whatsapp: mockPrimeLocal.whatsapp,
  mensagemPrincipalWhatsapp: mockPrimeLocal.mensagemPrincipalWhatsapp,
  highlights: [
    {
      title: "Lorem Ipsum",
      text: "Dolor sit amet consectetur adipiscing elit sed do eiusmod.",
    },
    {
      title: "Dolor Sit Amet",
      text: "Consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    },
    {
      title: "Consectetur",
      text: "Adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    },
    {
      title: "Adipiscing Elit",
      text: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
  ],
};

/**
 * Placeholder editorial copy (Lorem Ipsum) — same reasoning as
 * mockHero. imageUrl points at public/service-placeholder.webp, a
 * local copy of the same photo already used as the Hero background —
 * reused here (not a remote URL) so next/image works without adding
 * a remotePatterns entry to next.config.ts.
 */
export const mockProductsServices: ProductsServicesContent = {
  heading: "Nossos Serviços",
  subheading:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  whatsapp: mockPrimeLocal.whatsapp,
  items: [
    {
      imageUrl: "/service-placeholder.webp",
      title: "Lorem Ipsum Dolor",
      subtitle:
        "Sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    },
    {
      imageUrl: "/service-placeholder.webp",
      title: "Consectetur Adipiscing",
      subtitle:
        "Elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imageUrl: "/service-placeholder.webp",
      title: "Ut Enim Ad Minim",
      subtitle:
        "Veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    },
  ],
};

/**
 * Placeholder editorial copy (Lorem Ipsum) — same reasoning as
 * mockHero. `icon` keys into the registry in Differentiators.tsx.
 * One item (`award`) is left without `description` on purpose, to
 * keep exercising the no-description layout alongside the filled one.
 */
export const mockDifferentiators: DifferentiatorsContent = {
  heading: "Nossos Diferenciais",
  subheading:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  nome: mockPrimeLocal.nome,
  whatsapp: mockPrimeLocal.whatsapp,
  mensagemPrincipalWhatsapp: mockPrimeLocal.mensagemPrincipalWhatsapp,
  items: [
    {
      icon: "shield",
      title: "Lorem Ipsum Dolor",
      description: "Sit amet consectetur adipiscing elit sed do eiusmod.",
    },
    {
      icon: "clock",
      title: "Sit Amet Consectetur",
      description: "Adipiscing elit sed do eiusmod tempor incididunt.",
    },
    {
      icon: "users",
      title: "Adipiscing Elit Sed",
      description: "Do eiusmod tempor incididunt ut labore et dolore.",
    },
    { icon: "award", title: "Do Eiusmod Tempor" },
  ],
};

/**
 * Placeholder editorial copy (Lorem Ipsum) — same reasoning as
 * mockHero.
 */
export const mockConversionBanner: ConversionBannerContent = {
  headline: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit",
  subtitle:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.",
  body: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.",
  nome: mockPrimeLocal.nome,
  whatsapp: mockPrimeLocal.whatsapp,
  mensagemPrincipalWhatsapp: mockPrimeLocal.mensagemPrincipalWhatsapp,
};

/**
 * Placeholder editorial copy (Lorem Ipsum) — same reasoning as
 * mockHero.
 */
export const mockHowItWorks: HowItWorksContent = {
  heading: "Como Funciona",
  subtitle:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  nome: mockPrimeLocal.nome,
  whatsapp: mockPrimeLocal.whatsapp,
  mensagemPrincipalWhatsapp: mockPrimeLocal.mensagemPrincipalWhatsapp,
  steps: [
    {
      stepNumber: 1,
      title: "Lorem Ipsum",
      description: "Dolor sit amet consectetur adipiscing elit sed do eiusmod.",
    },
    {
      stepNumber: 2,
      title: "Dolor Sit Amet",
      description: "Consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    },
    {
      stepNumber: 3,
      title: "Consectetur",
      description: "Adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    },
    {
      stepNumber: 4,
      title: "Adipiscing Elit",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
  ],
};

/**
 * Placeholder editorial copy (Lorem Ipsum) — same reasoning as
 * mockHero. imageUrl reuses public/service-placeholder.webp, a local
 * copy of the same photo already used elsewhere in the project.
 */
export const mockAbout: AboutContent = {
  headline: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit",
  subtitle:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
  imageUrl: "/service-placeholder.webp",
  nome: mockPrimeLocal.nome,
  whatsapp: mockPrimeLocal.whatsapp,
  mensagemPrincipalWhatsapp: mockPrimeLocal.mensagemPrincipalWhatsapp,
};

/**
 * Placeholder editorial copy (Lorem Ipsum) — same reasoning as
 * mockHero. Ratings and relative times are example values, not real
 * Google Business Profile data.
 */
export const mockSocialProof: SocialProofContent = {
  heading: "O Que Dizem Nossos Clientes",
  subheading:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  nome: mockPrimeLocal.nome,
  whatsapp: mockPrimeLocal.whatsapp,
  mensagemPrincipalWhatsapp: mockPrimeLocal.mensagemPrincipalWhatsapp,
  reviews: [
    {
      authorName: "Lorem Ipsum",
      rating: 5,
      text: "Dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      relativeTime: "há 2 semanas",
    },
    {
      authorName: "Dolor Sit Amet",
      rating: 4,
      text: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.",
      relativeTime: "há 1 mês",
    },
    {
      authorName: "Consectetur Adipiscing",
      rating: 5,
      text: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      relativeTime: "há 2 meses",
    },
  ],
};

/**
 * Placeholder editorial copy (Lorem Ipsum) — same reasoning as
 * mockHero.
 */
export const mockFAQ: FAQContent = {
  headline: "Perguntas Frequentes",
  subtitle:
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  questions: [
    {
      question: "Lorem ipsum dolor sit amet consectetur?",
      answer:
        "Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.",
    },
    {
      question: "Quis nostrud exercitation ullamco laboris nisi?",
      answer:
        "Ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse.",
    },
    {
      question: "Cillum dolore eu fugiat nulla pariatur?",
      answer:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "Sed ut perspiciatis unde omnis iste natus?",
      answer:
        "Error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
    },
    {
      question: "Nemo enim ipsam voluptatem quia voluptas?",
      answer:
        "Sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
  ],
};

/**
 * Partial mock — only googleMaps is set, matching LocationContact's
 * current map-only implementation. This is Google's no-API-key embed
 * form (a maps search URL with output=embed appended), not a real
 * Prime2B embed — swap for the client's actual embed URL later.
 */
export const mockLocationContact: LocationContactContent = {
  cidade: mockPrimeLocal.cidade,
  estado: mockPrimeLocal.estado,
  googleMaps:
    "https://www.google.com/maps?q=S%C3%A3o+Jos%C3%A9+do+Rio+Preto,+SP&z=16&output=embed",
};

export const mockFooter: FooterContent = {
  nome: mockPrimeLocal.nome,
  logoUrl: mockPrimeLocal.logoUrl,
  whatsapp: mockPrimeLocal.whatsapp,
  aboutText: mockPrimeLocal.aboutText,
  enderecoCompleto: mockPrimeLocal.enderecoCompleto,
  horario: mockPrimeLocal.horario,
  email: mockPrimeLocal.email,
  instagram: mockPrimeLocal.instagram,
  facebook: mockPrimeLocal.facebook,
};
