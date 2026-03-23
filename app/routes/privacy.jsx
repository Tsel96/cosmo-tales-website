const ASSETS = 'https://workers.paper.design/file-assets/01KJPX5MQYW5WMXDR20PGMHFVR/'
const LOGO_URL = '/CosmoLogo.svg'

export function meta() {
  return [
    { title: "Privacy Policy — Cosmo Tales" },
    { name: "description", content: "Privacy policy for Cosmo Tales by Bohemia Interactive." },
  ];
}

const SECTIONS = [
  {
    title: 'Who We Are',
    content: `Cosmo Tales is developed and published by Bohemia Interactive a.s., a company registered under Czech law with its registered office at Strichova 531/6, 150 00 Prague 5, Czech Republic ("we", "us", "our"). We act as the data controller for any personal data collected through this website.`,
  },
  {
    title: 'What Data We Collect',
    content: `When you sign up for launch notifications on this website, we collect your email address. That is the only personal data we collect through this site.\n\nWe do not use tracking cookies, analytics services, or any other profiling technology on this website.`,
  },
  {
    title: 'Why We Collect It',
    content: `We process your email address for a single purpose: to notify you about the Cosmo Tales launch and related news. The legal basis for this processing is your consent, given when you submit the notification form (Article 6(1)(a) GDPR).`,
  },
  {
    title: 'How We Store Your Data',
    content: `Your email address is stored securely using industry-standard encryption and access controls. We retain your email for as long as needed to fulfill the stated purpose — once Cosmo Tales has launched and launch communications are complete, or if you withdraw your consent, your data will be deleted.`,
  },
  {
    title: 'Who We Share It With',
    content: `We may share your email address with the following categories of service providers, solely to operate the notification service:\n\n\u2022 Email delivery services (for sending the notification)\n\u2022 Cloud infrastructure providers (for secure storage)\n\nAll processors are bound by data processing agreements and GDPR-compliant safeguards. We do not sell your data to anyone.`,
  },
  {
    title: 'International Transfers',
    content: `Some of our service providers may process data outside the European Economic Area. Where this occurs, we ensure appropriate safeguards are in place, such as the European Commission's Standard Contractual Clauses.`,
  },
  {
    title: 'Your Rights',
    content: `Under GDPR, you have the right to:\n\n\u2022 Access — request a copy of the data we hold about you\n\u2022 Rectification — correct any inaccurate data\n\u2022 Erasure — request deletion of your data\n\u2022 Withdraw consent — unsubscribe at any time\n\u2022 Data portability — receive your data in a machine-readable format\n\u2022 Lodge a complaint — with the Czech Office for Personal Data Protection (UOOU), Pplk. Sochora 27, 170 00 Prague 7\n\nTo exercise any of these rights, contact us at the address below.`,
  },
  {
    title: 'Contact',
    content: `For any privacy-related questions or requests:\n\nBohemia Interactive a.s.\nStrichova 531/6, 150 00 Prague 5, Czech Republic\nEmail: privacy@bohemia.net`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this policy from time to time. Material changes will be posted on this page with an updated effective date.`,
  },
]

export default function Privacy() {
  return (
    <div className="relative min-h-screen bg-space-900 overflow-x-hidden">
      {/* Nav */}
      <nav className="flex items-center px-5 md:px-12 pt-6 md:pt-12 pb-8 md:pb-16">
        <a href="/">
          <img src={LOGO_URL} alt="Cosmo Tales" className="h-[48px] md:h-[74px] w-auto" />
        </a>
      </nav>

      {/* Content */}
      <main className="px-5 md:px-12 pb-16 md:pb-[120px] max-w-[720px]">
        <h1 className="font-heading font-bold text-[32px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-white">
          Privacy Policy
        </h1>
        <p className="text-[15px] md:text-[17px] leading-[26px] md:leading-[29px] text-[#8A95B0] mt-3">
          Effective March 10, 2026
        </p>

        <div className="flex flex-col gap-10 md:gap-12 mt-10 md:mt-14">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="font-heading font-bold text-[20px] md:text-[24px] leading-[1.2] tracking-[-0.01em] text-white mb-3 md:mb-4">
                {s.title}
              </h2>
              <div className="text-[15px] md:text-[17px] leading-[26px] md:leading-[29px] text-[#8A95B0] whitespace-pre-line">
                {s.content}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col w-full px-5 md:px-12 pt-8 md:pt-10 pb-8 md:pb-12 gap-5 md:gap-6 border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 md:gap-0">
          <a href="https://www.bohemia.net" target="_blank" rel="noopener noreferrer">
            <img src="/bi-logo-white.svg" alt="Bohemia Interactive" className="h-6 md:h-7 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <p className="text-[10px] md:text-[11px] leading-4 md:leading-5 text-white/25 md:text-right max-w-[480px]">
            &copy; 2026 BOHEMIA INTERACTIVE a.s. Cosmo Tales&reg; and BOHEMIA INTERACTIVE&reg; are registered trademarks of BOHEMIA INTERACTIVE a.s. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
