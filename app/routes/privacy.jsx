import { useSearchParams } from 'react-router'

const LOGO_URL = '/CosmoLogo.svg'

export function meta() {
  return [
    { title: "Privacy Policy — Cosmo Tales" },
    { name: "description", content: "Privacy policy for Cosmo Tales by Bohemia Interactive." },
  ];
}

/* ─── Content ─── */

const CONTENT = {
  en: {
    title: 'Privacy Policy',
    effective: 'Effective April 1, 2020',
    langSwitch: 'Česky',
    langSwitchParam: 'cs',
    intro: {
      title: 'Introduction',
      greeting: 'Hello, visitor!',
      paragraphs: [
        'If you are reading this, it means you value your privacy and the protection of personal data as much as we do. Our privacy policy aims to be as transparent as possible about what we do with user data that we collect from those who register a Bohemia Account, play our games, visit our websites, and/or use our other online services.',
        'It has been prepared with the utmost care and reviewed to comply with applicable laws, including the European Union\'s General Data Protection Regulation (GDPR).',
      ],
      keyPoints: [
        'We retain user data only to ensure the proper functioning of our games and related online services, to fulfill our Bohemia Store purchases, and to send newsletters.',
        'In some games we collect anonymous data about players. You can opt out in the game settings.',
        'Your personal data will never be sold to third parties. Some partners (hosting, analytics) have access to certain data under strict confidentiality agreements.',
        'We continually implement measures to securely store data.',
      ],
      contact: 'If you have questions, contact us at privacy@bistudio.com.',
    },
    sections: [
      {
        id: '1',
        title: '1. General Information',
        items: [
          '1.1. These Privacy Policy ("Policy") govern how we use and process your personal data, how we handle it, and how you can exercise your rights.',
          '1.2. These Policies also provide all necessary information under the EU General Data Protection Regulation (GDPR).',
          '1.3. Definitions:\n• "Company", "We" means BOHEMIA INTERACTIVE a.s., with registered office listed in the Czech Republic, ID: 272 18 864 (or equivalent identifiers).\n• "User", "You" means a natural person, company, or institution using the Services.\n• "Services" means the services, games and websites operated by the Company.',
          '1.4. These Policies form an integral part of Terms of Use or EULA for any of our Services. They also include our Cookies Policy.',
          '1.5. The information contained in these Policies applies to every User of our Services.',
          '1.6. We are a data controller and, under certain circumstances, also a data processor.',
        ],
      },
      {
        id: '2',
        title: '2. Purposes of Processing and Legal Basis',
        subsections: [
          {
            subtitle: 'Processing on the basis of legal provisions (2.1)',
            text: 'Your personal data is processed on the basis of applicable legal provisions. If you purchase our products through Bohemia Store, we process your data in accordance with relevant accounting, VAT, tax, and consumer protection laws.',
          },
          {
            subtitle: 'Processing for the purpose of fulfilling a contract (2.2)',
            text: 'We process your personal data to fulfill obligations arising from the contract with you — in particular purchases in Bohemia Store, Bohemia Account registration, use of services (forums, wiki, Feedback Tracker, API), monetization approvals, gaming, access to games before release, and participation in contests.',
          },
          {
            subtitle: 'Processing on legitimate interests (2.3)',
            text: 'We also process your data based on legitimate interests: fraud prevention, processing feedback, crash data collection, anti-cheat measures, data transfers to BattlEye, newsletters, statistical analysis, testing evaluation, contest evaluation, crash dump analysis, and analytics data from YLANDS (Google Analytics for Firebase).',
          },
        ],
        items: [
          '2.4. The list of personal data is contained in Appendix 1.',
        ],
      },
      {
        id: '3',
        title: '3. Methods of Processing Your Personal Data',
        items: [
          '3.1. Privacy and security are key considerations in creating our products. We implement appropriate measures to address online and physical security risks, and restrict access to databases to authorized personnel.',
        ],
      },
      {
        id: '4',
        title: '4. Recipients of Your Personal Data',
        items: [
          '4.1. Personal data is disclosed to selected employees who have signed non-disclosure agreements.',
          '4.2. Data from Bohemia Store may be shared with tax authorities, law enforcement, and courts.',
          '4.3. Some data is shared with partners providing accounting services, operating Bohemia Store and payment gateways, and with affiliated companies.',
          '4.4. Email addresses may be shared with email service providers. Analytics data may be uploaded to third-party servers. We use third-party servers to operate our games.',
          '4.5. The list of partners is provided in Appendix 2.',
        ],
      },
      {
        id: '5',
        title: '5. How Long Do We Keep Your Personal Data?',
        items: [
          '5.1. We retain personal data only for the period necessary to fulfill the purposes of processing. Retention periods are listed in Appendix 1.',
        ],
      },
      {
        id: '6',
        title: '6. Sources of Your Personal Data',
        items: [
          '6.1. Data is obtained directly from you (registration, forms, communication) and by monitoring usage of our Services (including Steam ID).',
        ],
      },
      {
        id: '7',
        title: '7. Your Rights',
        items: [
          '7.1. Right of access to and rectification of personal data.',
          '7.2. Right to erasure — contact privacy@bistudio.com.',
          '7.3. Right to restrict processing.',
          '7.4. Right to data portability.',
          '7.5. Right to withdraw consent — contact privacy@bistudio.com.',
          '7.6. Right to object to processing.',
          '7.7. Right to lodge a complaint with a supervisory authority in your jurisdiction.',
        ],
      },
      {
        id: '8',
        title: '8. Final Provisions',
        items: [
          '8.1. These Policies are valid and effective from April 1, 2020.',
          '8.2. We may change these Policies from time to time. We will inform about substantial changes 30 days in advance.',
          '8.3. Inquiries: privacy@bistudio.com.',
        ],
      },
    ],
    appendix1: {
      title: 'Appendix 1 — List of Processed Personal Data and Retention Periods',
      headers: ['Provision', 'Processed Personal Data', 'Retention Period'],
      rows: [
        ['Art. 2.1 a)', 'Records of purchased products, records of payments, records of refunds', '10 years'],
        ['Art. 2.1 b)', 'Name, address, date of birth, email address, Bohemia Account ID, records of complaints', '10 years'],
        ['Art. 2.2 a)', 'Name, address, date of birth, email address, Bohemia Account ID, Steam ID, username, PayPal ID', '5 years'],
        ['Art. 2.2 b)', 'Name, address, login name, last login, email address, Bohemia Account ID, Facebook ID, Google Play/Apple Game Center ID, Live ID, Twitter ID, PSN ID, Steam ID, username, IP address', 'Until Bohemia Account termination'],
        ['Art. 2.2 c)', 'Name, address, phone number, date of birth, login name, last login, Bohemia Account ID, Facebook ID, Steam ID, username, IP address', 'Until Bohemia Account termination associated with these Services'],
        ['Art. 2.2 d)', 'Name, email address, nickname, IP address of server', 'Until monetization approval is revoked'],
        ['Art. 2.2 e)', 'Name, login name, last login, Bohemia Account ID, Facebook ID, Google Play/Apple Game Center ID, username, IP address, hardware device data, command line information, list of running processes, device settings, crash dumps', 'Until game uninstall from device'],
        ['Art. 2.2 f)', 'Email address', 'During access to the game before official release'],
        ['Art. 2.2 g)', 'Email address, full name, gender, address, age verification, price preferences', '2 years after the contest ends'],
        ['Art. 2.3 a)', 'Login name, last login, Bohemia Account ID, Facebook ID, Steam ID, username, IP address', 'During legitimate interest'],
        ['Art. 2.3 b)', 'Name, login name, last login, Bohemia Account ID, Facebook ID, Steam ID, username, IP address', 'During legitimate interest'],
        ['Art. 2.3 c)', 'Username, hardware device data, command line information, list of running processes, device settings, crash dumps', 'During legitimate interest'],
        ['Art. 2.3 d)', 'Name, login name, last login, Bohemia Account ID, Steam ID, game profile name, Facebook ID, Google Play/Apple Game Center ID, username, IP address, hardware data, command line information, list of running processes, device settings, crash dumps', 'During legitimate interest'],
        ['Art. 2.3 e)', 'Email address', 'Until unsubscribed from newsletters or unless email no longer exists'],
        ['Art. 2.3 f)', 'Game playing data: time spent in game, region/IP address, online activities, crashes and connection issues, store activity, hardware characteristics', 'Until game uninstall'],
        ['Art. 2.3 g)', 'Age, gender, country, city, language, internet connection type and speed, device model, preferred game mode, planned playing time, reason for participation, favorite games, motivation to play our games', 'During legitimate interest'],
        ['Art. 2.3 h)', 'How you learned about the contest, reasons for participation, whether you ever created content for our games', 'During legitimate interest'],
        ['Art. 2.3 i)', 'Session username, device name, device ID, log files, crashdump, DxDiag', 'During legitimate interest'],
        ['Art. 2.3 j)', 'YLANDS app analytics data: approximate device location, basic hardware information, in-app purchases history, timestamp of interactions', 'During legitimate interest, max 14 months'],
      ],
    },
    appendix2: {
      title: 'Appendix 2 — Identification of Partners, Shared Data and Purpose',
      headers: ['Partner', 'Shared Data', 'Purpose of Sharing'],
      rows: [
        ['Bohemia Interactive Studio s.r.o., ID: 257 64 730, Nad Pomníkem 467/9, Prague 5, 152 00, Czech Republic', 'Records of purchased products, records of payments, name, address, date of birth, email address, Bohemia Account ID, Steam ID, username, PayPal ID, records of complaints', 'Operation of Bohemia Store, providing accounting and related services'],
        ['Global Payments Europe, s.r.o., ID: 270 88 936, V Olšinách 626/80, Strašnice, 100 00 Prague 10, Czech Republic', 'Email address', 'Processing payments in Bohemia Store via payment gateway'],
        ['The Rocket Science Group LLC, 75 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA', 'Email address', 'Providing email services via MailChimp'],
        ['Treasure Data, Inc., 2565 Leghorn St., Mountain View, CA 94043, USA', 'Data about game play: time spent in game, region/IP address, online activities, crashes, store activity, hardware characteristics', 'Data uploaded to partner servers for analytics (partner does not have access to personal data)'],
        ['Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland', 'Analytics data about YLANDS app usage: approximate device location, basic hardware info, in-app purchase history, interaction timestamps', 'Tracking and improving performance of YLANDS app and marketing campaigns via Google Analytics for Firebase'],
        ['iomart Hosting Limited, Lister Pavilion, Kelvin Campus, West of Scotland Science Park, Glasgow, UK', 'Data about game playing', 'Ensuring proper functioning of games for users worldwide'],
        ['Amazon Web Services, Inc., Seattle, WA 98108-1226, USA', 'Data about game playing', 'Ensuring proper functioning of games for users worldwide'],
        ['OVH US LLC, Reston, VA', 'Data about game playing', 'Ensuring proper functioning of games for users worldwide'],
        ['Multiplay (UK) Ltd., Southampton, UK', 'Data about game playing', 'Ensuring proper functioning of games for users worldwide'],
        ['Fragnet Networks AB, Karlskrona, Sweden', 'Data about game playing', 'Ensuring proper functioning of games for users worldwide'],
      ],
    },
    affiliates: {
      title: 'Our Affiliated Companies',
      headers: ['Affiliated Company', 'Shared Data and Purpose'],
      rows: [
        ['Bohemia Interactive Studio s.r.o., Nad Pomníkem 467/9, Prague 5, 152 00, Czech Republic', 'Necessary subset of personal data — ensuring proper functioning of services'],
        ['Bohemia Interactive s.r.o., Bratislava, Slovakia', 'Necessary subset of personal data — ensuring proper functioning of services'],
        ['Bohemia Interactive B.V., RSIN: 85614799, Danzigerkade 223, 1ste verdieping, 1013AP Amsterdam, Netherlands', 'Necessary subset of personal data — ensuring proper functioning of services'],
        ['Bohemia Interactive Co., Ltd., 378/80-81, Moo 12, Nongprue, Banglamung, Chonburi, 20150, Thailand', 'Necessary subset of personal data — ensuring proper functioning of services'],
      ],
    },
  },
  cs: {
    title: 'Zásady ochrany osobních údajů',
    effective: 'Platné od 1. dubna 2020',
    langSwitch: 'English',
    langSwitchParam: 'en',
    intro: {
      title: 'Úvod',
      greeting: 'Dobrý den, návštěvníku!',
      paragraphs: [
        'Pokud toto čtete, znamená to, že si svého soukromí a ochrany osobních údajů vážíte stejně jako my. Naše zásady ochrany osobních údajů se snaží být co nejtransparentnější ohledně toho, co děláme s uživatelskými údaji, které shromažďujeme od těch, kteří si zaregistrují Bohemia Account, hrají naše hry, navštěvují naše webové stránky a/nebo využívají naše další online služby.',
        'Byly připraveny s maximální péčí a zkontrolovány tak, aby byly v souladu s příslušnými právními předpisy, včetně obecného nařízení o ochraně osobních údajů (GDPR) Evropské unie.',
      ],
      keyPoints: [
        'Uživatelská data uchováváme pouze za účelem zajištění řádné funkčnosti našich her a souvisejících online služeb, plnění našich povinností při nákupu v Bohemia Store a zasílání newsletterů.',
        'U některých her shromažďujeme anonymní data o hráčích. Můžete se odhlásit v nastavení hry.',
        'Vaše osobní údaje nikdy neprodáme třetím stranám. Někteří partneři (hosting, analytika) mají přístup k určitým datům na základě přísné dohody o mlčenlivosti.',
        'Neustále přijímáme opatření k bezpečnému ukládání dat.',
      ],
      contact: 'Máte-li dotazy, kontaktujte nás na privacy@bistudio.com.',
    },
    sections: [
      {
        id: '1',
        title: '1. Obecné informace',
        items: [
          '1.1. Tyto Zásady ochrany osobních údajů („Zásady") upravují, jak používáme a zpracováváme vaše osobní údaje, jak s nimi nakládáme a jak můžete uplatňovat svá práva.',
          '1.2. Tyto Zásady vám rovněž poskytují všechny nezbytné informace podle obecného nařízení o ochraně osobních údajů (EU) 2016/679 („GDPR").',
          '1.3. Definice:\n• „Společnost", „My" znamená BOHEMIA INTERACTIVE a.s., se sídlem Stříbrná Lhota 747, 252 10 Mníšek pod Brdy, Česká republika, IČO: 272 18 864, DIČ: CZ 272 18 864.\n• „Uživatel", „Vy" znamená fyzickou osobu, společnost nebo instituci, která používá Služby.\n• „Služby" znamenají služby, hry a webové stránky provozované Společností.',
          '1.4. Tyto Zásady jsou nedílnou součástí Podmínek užívání nebo EULA kterékoli z našich Služeb. Tyto Zásady rovněž obsahují naše Zásady používání souborů cookies.',
          '1.5. Informace obsažené v těchto Zásadách se vztahují na každého Uživatele našich Služeb.',
          '1.6. Jsme správcem a za určitých okolností také zpracovatelem vašich osobních údajů.',
        ],
      },
      {
        id: '2',
        title: '2. Účely zpracování a právní základ zpracování osobních údajů',
        subsections: [
          {
            subtitle: 'Zpracování na základě právních předpisů (2.1)',
            text: 'Vaše osobní údaje zpracováváme na základě příslušných právních předpisů. Pokud si koupíte naše produkty prostřednictvím Bohemia Store, zpracováváme vaše údaje v souladu se zákonem č. 563/1991 Sb., o účetnictví, zákonem č. 235/2004 Sb., o DPH, zákonem č. 586/1992 Sb., o daních z příjmů, a zákonem č. 634/1992 Sb., o ochraně spotřebitele.',
          },
          {
            subtitle: 'Zpracování za účelem plnění smlouvy (2.2)',
            text: 'Vaše osobní údaje zpracováváme za účelem plnění povinností vyplývajících ze smlouvy uzavřené s vámi — zejména nákup v Bohemia Store, registrace Bohemia Account, používání služeb (fóra, wiki, Feedback Tracker, API), schválení monetizace serveru, hraní her, přístup ke hrám před vydáním a účast v soutěžích.',
          },
          {
            subtitle: 'Zpracování na základě oprávněných zájmů (2.3)',
            text: 'Vaše údaje zpracováváme také na základě oprávněných zájmů: prevence podvodného chování, zpracování zpětné vazby, sběr dat o pádech her (Arma 3, DayZ), detekce podvodů při hraní, přenos dat do BattlEye (Arma 3, Arma 2, DayZ, Argo), zasílání newsletterů (Mailtrain, MailChimp), statistická analýza herních dat, vyhodnocování testování her, vyhodnocování soutěží, zpracování Crashdump reportů a analytická data z aplikace YLANDS (Google Analytics for Firebase).',
          },
        ],
        items: [
          '2.4. Seznam osobních údajů je obsažen v Příloze č. 1.',
        ],
      },
      {
        id: '3',
        title: '3. Způsoby zpracování vašich osobních údajů',
        items: [
          '3.1. Soukromí a bezpečnost jsou klíčovými hledisky při vytváření našich produktů. Přijímáme vhodná opatření k řešení online a fyzické bezpečnosti, rizika ztráty dat. Přístup k databázím omezujeme na oprávněné osoby.',
        ],
      },
      {
        id: '4',
        title: '4. Příjemci vašich osobních údajů',
        items: [
          '4.1. Osobní údaje jsou zpřístupňovány vybraným zaměstnancům, kteří podepsali dohodu o mlčenlivosti.',
          '4.2. Údaje z Bohemia Store mohou být předány daňovým orgánům, orgánům činným v trestním řízení a soudním orgánům.',
          '4.3. Některé údaje sdílíme s partnery poskytujícími účetní služby, provozujícími Bohemia Store a platební bránu, a s přidruženými společnostmi.',
          '4.4. E-mailová adresa může být sdílena s poskytovateli e-mailových služeb. Analytická data mohou být nahrávána na servery třetích stran. Pro fungování her využíváme servery třetích stran.',
          '4.5. Seznam partnerů je uveden v Příloze č. 2.',
        ],
      },
      {
        id: '5',
        title: '5. Jak dlouho vaše osobní údaje uchováváme?',
        items: [
          '5.1. Osobní údaje uchováváme pouze po dobu nezbytnou k naplnění účelů zpracování. Doby uchovávání jsou uvedeny v Příloze č. 1.',
        ],
      },
      {
        id: '6',
        title: '6. Zdroje vašich osobních údajů',
        items: [
          '6.1. Údaje získáváme přímo od vás (registrace, formuláře, komunikace) a sledováním používání našich Služeb (včetně Steam ID).',
        ],
      },
      {
        id: '7',
        title: '7. Vaše práva',
        items: [
          '7.1. Právo na přístup a opravu osobních údajů.',
          '7.2. Právo na výmaz osobních údajů — kontaktujte privacy@bistudio.com.',
          '7.3. Právo na omezení zpracování.',
          '7.4. Právo na přenositelnost údajů.',
          '7.5. Právo odvolat souhlas — kontaktujte privacy@bistudio.com.',
          '7.6. Právo vznést námitku proti zpracování.',
          '7.7. Právo podat stížnost u příslušného úřadu. V ČR: Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7.',
        ],
      },
      {
        id: '8',
        title: '8. Závěrečná ustanovení',
        items: [
          '8.1. Tyto Zásady jsou platné a účinné od 1. dubna 2020.',
          '8.2. Tyto Zásady můžeme čas od času změnit. O podstatných změnách budeme informovat 30 dnů předem.',
          '8.3. Dotazy: privacy@bistudio.com.',
        ],
      },
    ],
    appendix1: {
      title: 'Příloha č. 1 — Seznam zpracovávaných osobních údajů a doba uchovávání',
      headers: ['Ustanovení', 'Zpracovávané osobní údaje', 'Doba uchovávání'],
      rows: [
        ['Čl. 2.1 a)', 'Záznamy o zakoupených produktech, záznamy o provedených platbách, záznamy o vrácených platbách', '10 let'],
        ['Čl. 2.1 b)', 'Jméno, adresa, datum narození, e-mailová adresa, Bohemia Account ID, záznamy o reklamacích', '10 let'],
        ['Čl. 2.2 a)', 'Jméno, adresa, datum narození, e-mailová adresa, Bohemia Account ID, Steam ID, uživatelské jméno, identifikace PayPal', '5 let'],
        ['Čl. 2.2 b)', 'Jméno, adresa, přihlašovací jméno, poslední přihlášení, e-mailová adresa, Bohemia Account ID, Facebook ID, Google Play/Apple Game Center ID, Live ID, Twitter ID, PSN ID, Steam ID, uživatelské jméno, IP adresa', 'Do ukončení Bohemia Account'],
        ['Čl. 2.2 c)', 'Jméno, adresa, telefonní číslo, datum narození, přihlašovací jméno, poslední přihlášení, Bohemia Account ID, Facebook ID, Steam ID, uživatelské jméno, IP adresa', 'Do ukončení Bohemia Account propojeného s těmito Službami'],
        ['Čl. 2.2 d)', 'Jméno, e-mailová adresa, přezdívka, IP adresa serveru', 'Do odvolání schválení monetizace'],
        ['Čl. 2.2 e)', 'Jméno, přihlašovací jméno, poslední přihlášení, Bohemia Account ID, Facebook ID, Google Play/Apple Game Center ID, uživatelské jméno, IP adresa, hardwarová data zařízení, informace o příkazové řádce, seznam běžících procesů, nastavení zařízení, crash dumpy', 'Do odinstalování hry ze zařízení'],
        ['Čl. 2.2 f)', 'E-mailová adresa', 'Po dobu přístupu ke hře před oficiálním vydáním'],
        ['Čl. 2.2 g)', 'E-mailová adresa, celé jméno, pohlaví, adresa, údaj o splnění věkového limitu, preference ohledně ceny', '2 roky od skončení soutěže'],
        ['Čl. 2.3 a)', 'Přihlašovací jméno, poslední přihlášení, Bohemia Account ID, Facebook ID, Steam ID, uživatelské jméno, IP adresa', 'Po dobu trvání oprávněného zájmu'],
        ['Čl. 2.3 b)', 'Jméno, přihlašovací jméno, poslední přihlášení, Bohemia Account ID, Facebook ID, Steam ID, uživatelské jméno, IP adresa', 'Po dobu trvání oprávněného zájmu'],
        ['Čl. 2.3 c)', 'Uživatelské jméno, hardwarová data zařízení, informace o příkazové řádce, seznam běžících procesů, nastavení zařízení, crash dumpy', 'Po dobu trvání oprávněného zájmu'],
        ['Čl. 2.3 d)', 'Jméno, přihlašovací jméno, poslední přihlášení, Bohemia Account ID, Steam ID, název herního profilu, Facebook ID, Google Play/Apple Game Center ID, uživatelské jméno, IP adresa, hardwarová data zařízení, informace o příkazové řádce, seznam běžících procesů, nastavení zařízení, crash dumpy', 'Po dobu trvání oprávněného zájmu'],
        ['Čl. 2.3 e)', 'E-mailová adresa', 'Dokud se osoba neodhlásí z odběru newsletterů nebo dokud e-mailová adresa nepřestane existovat'],
        ['Čl. 2.3 f)', 'Data o hraní hry: čas strávený ve hře, region/IP adresa, online aktivity, informace o pádech a problémech s připojením, statistiky aktivit v herním obchodě, charakteristiky hardwaru', 'Do odinstalování hry ze zařízení'],
        ['Čl. 2.3 g)', 'Věk, pohlaví, země, město, jazyk, typ a rychlost internetového připojení, model zařízení, preferovaný herní režim, plánovaná doba hraní, důvod účasti, oblíbené hry, motivace hrát naše hry', 'Po dobu trvání oprávněného zájmu'],
        ['Čl. 2.3 h)', 'Jak jste se o soutěži dozvěděli, důvody účasti, zda jste někdy vytvořili obsah pro naše hry', 'Po dobu trvání oprávněného zájmu'],
        ['Čl. 2.3 i)', 'Uživatelské jméno relace, název zařízení, ID zařízení, log soubory, crashdump, DxDiag', 'Po dobu trvání oprávněného zájmu'],
        ['Čl. 2.3 j)', 'Analytická data o používání YLANDS app: přibližná poloha zařízení, základní informace o hardwaru, historie nákupů v aplikaci, časové údaje interakcí s aplikací', 'Po dobu trvání oprávněného zájmu, max. 14 měsíců'],
      ],
    },
    appendix2: {
      title: 'Příloha č. 2 — Identifikace partnerů, sdílená data a účel sdílení',
      headers: ['Partner', 'Sdílená data', 'Účel sdílení'],
      rows: [
        ['BOHEMIA INTERACTIVE STUDIO s.r.o., IČO: 257 64 730, Nad Pomníkem 467/9, Praha 5, 152 00, ČR', 'Záznamy o zakoupených produktech, záznamy o platbách, jméno, adresa, datum narození, e-mailová adresa, Bohemia Account ID, Steam ID, uživatelské jméno, identifikace PayPal, záznamy o reklamacích', 'Provoz Bohemia Store, poskytování účetních a souvisejících služeb'],
        ['Global Payments Europe, s.r.o., IČO: 270 88 936, V Olšinách 626/80, Strašnice, 100 00 Praha 10, ČR', 'E-mailová adresa', 'Zpracování plateb v Bohemia Store prostřednictvím platební brány'],
        ['The Rocket Science Group LLC, 75 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA', 'E-mailová adresa', 'Poskytování e-mailových služeb prostřednictvím MailChimp'],
        ['Treasure Data, Inc., 2565 Leghorn St., Mountain View, CA 94043, USA', 'Data o hraní hry: čas strávený ve hře, region/IP adresa, online aktivity, informace o pádech a problémech s připojením, statistiky aktivit v herním obchodě, charakteristiky hardwaru', 'Data jsou nahrávána na servery partnera pro využití analytických funkcí (partner nemá přístup k osobním údajům)'],
        ['Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irsko', 'Analytická data o používání YLANDS app: přibližná poloha zařízení, základní informace o hardwaru, historie nákupů v aplikaci, časové údaje interakcí s aplikací', 'Sledování a zlepšování výkonu YLANDS app, uživatelské zkušenosti a účinnosti marketingových kampaní prostřednictvím Google Analytics for Firebase'],
        ['iomart Hosting Limited, Lister Pavilion, Kelvin Campus, West of Scotland Science Park, Glasgow, G20 0SP, UK', 'Data o hraní našich her', 'Zajištění řádného fungování her pro uživatele po celém světě'],
        ['Amazon Web Services, Inc., Seattle, WA 98108-1226, USA', 'Data o hraní našich her', 'Zajištění řádného fungování her pro uživatele po celém světě'],
        ['OVH US LLC, 11480 Commerce Park Dr., Suite 500 Reston, VA 20191, USA', 'Data o hraní našich her', 'Zajištění řádného fungování her pro uživatele po celém světě'],
        ['Multiplay (UK) Ltd., The Oak Barn Whitefield Business Units, Lepe Road, Blackfield, Southampton SO45 1XR, UK', 'Data o hraní našich her', 'Zajištění řádného fungování her pro uživatele po celém světě'],
        ['Fragnet Networks AB, Ostra Vittusgatan 36, SE-37133 Karlskrona, Švédsko', 'Data o hraní našich her', 'Zajištění řádného fungování her pro uživatele po celém světě'],
      ],
    },
    affiliates: {
      title: 'Naše přidružené společnosti',
      headers: ['Přidružená společnost', 'Sdílená data a účel'],
      rows: [
        ['BOHEMIA INTERACTIVE STUDIO s.r.o., IČO: 257 64 730, Nad Pomníkem 467/9, Praha 5, 152 00, ČR', 'Nezbytná podmnožina osobních údajů — zajištění řádného fungování služeb'],
        ['BOHEMIA INTERACTIVE s.r.o., IČO: 47 489 863, Palárikova 27, 811 04 Bratislava, Slovensko', 'Nezbytná podmnožina osobních údajů — zajištění řádného fungování služeb'],
        ['BOHEMIA INTERACTIVE B.V., RSIN: 85614799, Danzigerkade 223, 1ste verdieping, 1013AP Amsterdam, Nizozemsko', 'Nezbytná podmnožina osobních údajů — zajištění řádného fungování služeb'],
        ['Bohemia Interactive Co., Ltd., 378/80-81, Moo 12, Nongprue, Banglamung, Chonburi, 20150, Thajsko', 'Nezbytná podmnožina osobních údajů — zajištění řádného fungování služeb'],
      ],
    },
  },
}

/* ─── Compact table for Appendix 1 (short provision codes) ─── */
function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
      <table className="w-full text-[13px] md:text-[14px] leading-[20px] md:leading-[22px] border-collapse" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '100px' }} />
          <col />
          <col style={{ width: '180px' }} />
        </colgroup>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left text-white/60 font-semibold py-2.5 px-2.5 border-b border-white/10 first:pl-0 last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.04]">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-2.5 px-2.5 text-muted align-top first:pl-0 last:pr-0 ${
                    j === 0 ? 'text-white/50 font-mono text-[12px] whitespace-nowrap' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Card layout for partner/affiliate tables (long text per entry) ─── */
function PartnerCards({ headers, rows }) {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, i) => (
        <div key={i} className="border border-white/[0.06] rounded-lg p-4 flex flex-col gap-2">
          <p className="text-[13px] md:text-[14px] leading-[20px] text-white/70 font-semibold">
            {row[0]}
          </p>
          {row.slice(1).map((cell, j) => (
            <div key={j}>
              <p className="text-[11px] md:text-[12px] text-white/30 uppercase tracking-wider font-semibold mb-0.5">
                {headers[j + 1]}
              </p>
              <p className="text-[13px] md:text-[14px] leading-[20px] text-muted">
                {cell}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ─── Main component ─── */
export default function Privacy() {
  const [searchParams] = useSearchParams()
  const lang = searchParams.get('lang') === 'cs' ? 'cs' : 'en'
  const t = CONTENT[lang]

  return (
    <div className="relative min-h-screen bg-space-900 overflow-x-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-5 md:px-12 pt-6 md:pt-12 pb-8 md:pb-16">
        <a href="/">
          <img src={LOGO_URL} alt="Cosmo Tales" className="h-[48px] md:h-[74px] w-auto" />
        </a>
        <a
          href={`/privacy?lang=${t.langSwitchParam}`}
          className="text-[15px] font-semibold text-accent hover:text-white transition-colors"
        >
          {t.langSwitch}
        </a>
      </nav>

      {/* Content */}
      <main className="px-5 md:px-12 pb-16 md:pb-[120px] max-w-[860px]">
        <h1 className="font-heading font-bold text-[34px] leading-[1.1] tracking-[-0.02em] text-white">
          {t.title}
        </h1>
        <p className="text-[17px] leading-[26px] md:leading-[29px] text-muted mt-3">
          {t.effective}
        </p>

        {/* Introduction */}
        <div className="flex flex-col gap-10 md:gap-12 mt-10 md:mt-14">
          <section>
            <h2 className="font-heading font-bold text-[24px] leading-[1.2] tracking-[-0.01em] text-white mb-3 md:mb-4">
              {t.intro.title}
            </h2>
            <p className="text-[17px] leading-[26px] md:leading-[29px] text-muted font-semibold mb-4">
              {t.intro.greeting}
            </p>
            {t.intro.paragraphs.map((p, i) => (
              <p key={i} className="text-[17px] leading-[26px] md:leading-[29px] text-muted mb-4">
                {p}
              </p>
            ))}
            <p className="text-[14px] md:text-[15px] leading-[24px] md:leading-[26px] text-white/50 font-semibold mt-4 mb-2">
              {lang === 'en' ? 'A few key points:' : 'Několik hlavních bodů:'}
            </p>
            <ul className="flex flex-col gap-2 mb-4">
              {t.intro.keyPoints.map((point, i) => (
                <li key={i} className="text-[17px] leading-[26px] md:leading-[29px] text-muted pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-accent">
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-[17px] leading-[26px] md:leading-[29px] text-muted">
              {t.intro.contact}
            </p>
          </section>

          {/* Sections */}
          {t.sections.map((s) => (
            <section key={s.id}>
              <h2 className="font-heading font-bold text-[24px] leading-[1.2] tracking-[-0.01em] text-white mb-3 md:mb-4">
                {s.title}
              </h2>
              {s.subsections?.map((sub, i) => (
                <div key={i} className="mb-4">
                  <h3 className="text-[17px] leading-[26px] md:leading-[29px] text-white/60 font-semibold mb-1">
                    {sub.subtitle}
                  </h3>
                  <p className="text-[17px] leading-[26px] md:leading-[29px] text-muted">
                    {sub.text}
                  </p>
                </div>
              ))}
              {s.items?.map((item, i) => (
                <p key={i} className="text-[17px] leading-[26px] md:leading-[29px] text-muted whitespace-pre-line mb-3 last:mb-0">
                  {item}
                </p>
              ))}
            </section>
          ))}

          {/* Appendix 1 */}
          <section>
            <h2 className="font-heading font-bold text-[24px] leading-[1.2] tracking-[-0.01em] text-white mb-4 md:mb-6">
              {t.appendix1.title}
            </h2>
            <DataTable headers={t.appendix1.headers} rows={t.appendix1.rows} />
          </section>

          {/* Appendix 2 */}
          <section>
            <h2 className="font-heading font-bold text-[24px] leading-[1.2] tracking-[-0.01em] text-white mb-4 md:mb-6">
              {t.appendix2.title}
            </h2>
            <PartnerCards headers={t.appendix2.headers} rows={t.appendix2.rows} />
          </section>

          {/* Affiliates */}
          <section>
            <h2 className="font-heading font-bold text-[24px] leading-[1.2] tracking-[-0.01em] text-white mb-4 md:mb-6">
              {t.affiliates.title}
            </h2>
            <PartnerCards headers={t.affiliates.headers} rows={t.affiliates.rows} />
          </section>
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
