import type { LangCode } from "./languages";

export type TranslationKey =
  | "nav.about"
  | "nav.network"
  | "nav.membership"
  | "nav.events"
  | "nav.contact"
  | "nav.ourMembers"
  | "nav.news"
  | "nav.jobs"
  | "cta.join"
  | "lang.label"
  | "footer.tagline"
  | "footer.about"
  | "footer.network"
  | "footer.membership"
  | "footer.resources"
  | "footer.rights"
  | "footer.privacy"
  | "footer.terms"
  | "link.whoWeAre"
  | "link.whatWeDo"
  | "link.governance"
  | "link.team"
  | "link.hq"
  | "link.affiliates"
  | "link.institutional"
  | "link.partners"
  | "link.wbcMembership"
  | "link.benefits"
  | "link.become"
  | "ui.home"
  | "ui.viewAll"
  | "ui.viewAllServices"
  | "ui.viewAllUpdates"
  | "ui.viewNetwork"
  | "ui.allEvents"
  | "ui.openMenu"
  | "ui.closeMenu"
  | "ui.skipToContent"
  | "ui.viewFullProfile"
  | "ui.email"
  | "ui.phone"
  | "ui.contactTeam"
  | "menu.about.intro"
  | "menu.about.promo"
  | "menu.group.aboutWbc"
  | "menu.desc.whoWeAre"
  | "menu.desc.whatWeDo"
  | "menu.group.leadership"
  | "menu.desc.governance"
  | "menu.desc.team"
  | "menu.network.intro"
  | "menu.network.promo"
  | "menu.group.structure"
  | "menu.desc.hq"
  | "menu.desc.affiliates"
  | "menu.group.membersPartners"
  | "menu.desc.institutional"
  | "menu.desc.partners"
  | "menu.membership.intro"
  | "menu.membership.promo"
  | "menu.group.membership"
  | "menu.desc.wbcMembership"
  | "menu.desc.become"
  | "menu.group.directory"
  | "menu.desc.ourMembers"
  | "menu.group.benefits"
  | "menu.group.join"
  | "menu.events.intro"
  | "menu.events.promo"
  | "menu.group.eventCategories"
  | "menu.group.moreCategories"
  | "home.whatIsWbc"
  | "home.featuredServices"
  | "home.servicesDesc"
  | "home.latestNews"
  | "home.newsKicker"
  | "home.newsTitle"
  | "home.newsIntro"
  | "home.noNews"
  | "home.ourValues"
  | "home.valuesTitle"
  | "home.valuesIntro"
  | "home.glance"
  | "home.founded"
  | "home.headquarters"
  | "home.countries"
  | "cta.joinCommunity"
  | "cta.joinCommunityEvents"
  | "cta.joinCommunityEvent"
  | "cta.stayConnected"
  | "cta.stayConnectedBody"
  | "cta.becomeNetwork"
  | "cta.becomeNetworkBody"
  | "cta.readyJoin"
  | "cta.readyJoinBody"
  | "cta.exploreJobs"
  | "cta.exploreJobsBody"
  | "cta.viewInternships"
  | "cta.joinAffiliate"
  | "cta.joinAffiliateBody"
  | "events.emptyTitle"
  | "events.emptyBody"
  | "events.emptyCategory"
  | "events.emptyCategoryBody"
  | "events.about"
  | "news.empty";

type Dict = Record<TranslationKey, string>;

const en: Dict = {
  "nav.about": "About Us",
  "nav.network": "Global Network",
  "nav.membership": "Membership",
  "nav.events": "Events",
  "nav.contact": "Contact",
  "nav.ourMembers": "Our Members",
  "nav.news": "News",
  "nav.jobs": "Jobs",
  "cta.join": "Join WBC",
  "lang.label": "Language",
  "footer.tagline":
    "An international business support organization connecting businesses, professionals and institutions worldwide.",
  "footer.about": "About",
  "footer.network": "Network",
  "footer.membership": "Membership",
  "footer.resources": "Resources",
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "link.whoWeAre": "Who We Are",
  "link.whatWeDo": "What We Do",
  "link.governance": "Governance",
  "link.team": "WBC Team",
  "link.hq": "WBC Headquarters",
  "link.affiliates": "WBC Affiliates",
  "link.institutional": "Institutional Members",
  "link.partners": "Partners and Sponsors",
  "link.wbcMembership": "WBC Membership",
  "link.benefits": "Membership Benefits",
  "link.become": "Become a Member",
  "ui.home": "Home",
  "ui.viewAll": "View all",
  "ui.viewAllServices": "View all services",
  "ui.viewAllUpdates": "View all updates",
  "ui.viewNetwork": "View network",
  "ui.allEvents": "All events",
  "ui.openMenu": "Open menu",
  "ui.closeMenu": "Close menu",
  "ui.skipToContent": "Skip to content",
  "ui.viewFullProfile": "View full profile",
  "ui.email": "Email:",
  "ui.phone": "Phone:",
  "ui.contactTeam": "Contact WBC Team",
  "menu.about.intro":
    "Learn about the World Business Council — our mission, vision, values, and global initiatives that empower businesses worldwide.",
  "menu.about.promo": "Explore the full story of WBC and how we connect businesses across the globe.",
  "menu.group.aboutWbc": "About WBC",
  "menu.desc.whoWeAre": "Our mission, vision, and values",
  "menu.desc.whatWeDo": "Programs and global initiatives",
  "menu.group.leadership": "Leadership",
  "menu.desc.governance": "Leadership structure and policies",
  "menu.desc.team": "Meet the WBC team",
  "menu.network.intro":
    "Headquarters, affiliates, members, and partners working as one collaborative global network.",
  "menu.network.promo": "Explore how WBC connects institutions and businesses across regions.",
  "menu.group.structure": "Network Structure",
  "menu.desc.hq": "Leadership, governance, and coordination in Paris",
  "menu.desc.affiliates": "Official representatives in countries and cities",
  "menu.group.membersPartners": "Members & Partners",
  "menu.desc.institutional": "Institutional, corporate, SME, and individual members",
  "menu.desc.partners": "Partnerships, sponsorships, joint initiatives, and cooperation",
  "menu.membership.intro":
    "Explore membership benefits, apply to become a member, and browse our members directory.",
  "menu.membership.promo": "Start your journey with WBC and unlock global business opportunities.",
  "menu.group.membership": "Membership",
  "menu.desc.wbcMembership": "Types, benefits, fees",
  "menu.desc.become": "Start your membership application",
  "menu.group.directory": "Directory",
  "menu.desc.ourMembers": "Directory of active members",
  "menu.group.benefits": "Benefits",
  "menu.group.join": "Join",
  "menu.events.intro":
    "WBC Special Events, Business Events, Workshops & Trainings, and Other Events across the global network.",
  "menu.events.promo": "Browse upcoming programmes and past event highlights.",
  "menu.group.eventCategories": "Event categories",
  "menu.group.moreCategories": "More categories",
  "home.whatIsWbc": "What is WBC?",
  "home.featuredServices": "Featured Services",
  "home.servicesDesc":
    "Selected services from our full programme of activities supporting businesses worldwide.",
  "home.latestNews": "Latest News",
  "home.newsKicker": "Institutional Activities and Business News",
  "home.newsTitle": "Current Momentum Across the WBC Network and in the World",
  "home.newsIntro":
    "Follow recent updates that improve your understanding about WBC activities, and get updates about business news in the world.",
  "home.noNews": "No news articles published yet.",
  "home.ourValues": "Our Values",
  "home.valuesTitle": "Principles of WBC.",
  "home.valuesIntro":
    "These values shape how we convene institutions, support members and partners, and turn international connections into practical cooperation.",
  "home.glance": "WBC at a Glance",
  "home.founded": "Founded",
  "home.headquarters": "Headquarters",
  "home.countries": "Countries Engaged",
  "cta.joinCommunity": "Join the WBC Community",
  "cta.joinCommunityEvents":
    "Be the first to know about upcoming conferences, forums, and global business events.",
  "cta.joinCommunityEvent":
    "Become a member to access events, programmes, and international business connections.",
  "cta.stayConnected": "Stay Connected",
  "cta.stayConnectedBody":
    "Join WBC to receive programme updates and participate in the global network.",
  "cta.becomeNetwork": "Become Part of the Network",
  "cta.becomeNetworkBody":
    "Join WBC to appear in the members directory and connect with organizations across the globe.",
  "cta.readyJoin": "Ready to Join WBC?",
  "cta.readyJoinBody": "Become part of a network built on collaboration, innovation, and trust.",
  "cta.exploreJobs": "Explore More Opportunities",
  "cta.exploreJobsBody":
    "Discover more job and internship opportunities across the WBC network and find the right fit for your skills and interests.",
  "cta.viewInternships": "View All Internships",
  "cta.joinAffiliate": "Join the WBC Network",
  "cta.joinAffiliateBody":
    "Become a member and connect with affiliates, institutions, and partners worldwide.",
  "events.emptyTitle": "The programme listing is being prepared.",
  "events.emptyBody":
    "Confirmed WBC summits, forums, and network events will appear here as they are published. Check back soon, or contact us for the latest dates.",
  "events.emptyCategory": "Nothing scheduled in {name} at the moment.",
  "events.emptyCategoryBody":
    "Choose All events to see the full programme, or pick another category. New dates are added as each gathering is confirmed.",
  "events.about": "About this event",
  "news.empty": "No news articles published yet.",
};

const fr: Dict = {
  ...en,
  "nav.about": "À propos de nous",
  "nav.network": "Réseau mondial",
  "nav.membership": "Adhésion",
  "nav.events": "Événements",
  "nav.contact": "Contact",
  "nav.ourMembers": "Nos membres",
  "nav.news": "Actualités",
  "nav.jobs": "Emplois",
  "cta.join": "Rejoindre le WBC",
  "lang.label": "Langue",
  "footer.tagline":
    "Une organisation internationale de soutien aux entreprises reliant entreprises, professionnels et institutions à l'échelle mondiale.",
  "footer.about": "À propos",
  "footer.network": "Réseau",
  "footer.membership": "Adhésion",
  "footer.resources": "Ressources",
  "footer.rights": "Tous droits réservés.",
  "footer.privacy": "Politique de confidentialité",
  "footer.terms": "Conditions d'utilisation",
  "link.whoWeAre": "Qui sommes-nous",
  "link.whatWeDo": "Ce que nous faisons",
  "link.governance": "Gouvernance",
  "link.team": "Équipe WBC",
  "link.hq": "Siège du WBC",
  "link.affiliates": "Affiliés WBC",
  "link.institutional": "Membres institutionnels",
  "link.partners": "Partenaires et sponsors",
  "link.wbcMembership": "Adhésion WBC",
  "link.benefits": "Avantages de l'adhésion",
  "link.become": "Devenir membre",
  "ui.home": "Accueil",
  "ui.viewAll": "Tout voir",
  "ui.viewAllServices": "Voir tous les services",
  "ui.viewAllUpdates": "Voir toutes les actualités",
  "ui.viewNetwork": "Voir le réseau",
  "ui.allEvents": "Tous les événements",
  "ui.openMenu": "Ouvrir le menu",
  "ui.closeMenu": "Fermer le menu",
  "ui.skipToContent": "Aller au contenu",
  "ui.viewFullProfile": "Voir le profil complet",
  "ui.email": "E-mail :",
  "ui.phone": "Téléphone :",
  "ui.contactTeam": "Contacter l'équipe WBC",
  "menu.about.intro":
    "Découvrez le World Business Council — notre mission, notre vision, nos valeurs et nos initiatives mondiales au service des entreprises.",
  "menu.about.promo": "Découvrez l'histoire du WBC et comment nous relions les entreprises dans le monde.",
  "menu.group.aboutWbc": "À propos de WBC",
  "menu.desc.whoWeAre": "Notre mission, notre vision et nos valeurs",
  "menu.desc.whatWeDo": "Programmes et initiatives mondiales",
  "menu.group.leadership": "Direction",
  "menu.desc.governance": "Structure de direction et politiques",
  "menu.desc.team": "Rencontrez l'équipe WBC",
  "menu.network.intro":
    "Siège, affiliés, membres et partenaires unis au sein d'un même réseau mondial.",
  "menu.network.promo": "Découvrez comment le WBC relie institutions et entreprises à travers les régions.",
  "menu.group.structure": "Structure du réseau",
  "menu.desc.hq": "Direction, gouvernance et coordination à Paris",
  "menu.desc.affiliates": "Représentants officiels dans les pays et les villes",
  "menu.group.membersPartners": "Membres et partenaires",
  "menu.desc.institutional": "Membres institutionnels, entreprises, PME et individuels",
  "menu.desc.partners": "Partenariats, parrainages, initiatives conjointes et coopération",
  "menu.membership.intro":
    "Découvrez les avantages de l'adhésion, candidatez et parcourez l'annuaire des membres.",
  "menu.membership.promo": "Commencez votre parcours avec le WBC et ouvrez des opportunités mondiales.",
  "menu.group.membership": "Adhésion",
  "menu.desc.wbcMembership": "Types, avantages, tarifs",
  "menu.desc.become": "Déposer une demande d'adhésion",
  "menu.group.directory": "Annuaire",
  "menu.desc.ourMembers": "Annuaire des membres actifs",
  "menu.group.benefits": "Avantages",
  "menu.group.join": "Rejoindre",
  "menu.events.intro":
    "Événements spéciaux WBC, événements d'affaires, ateliers et formations, et autres rendez-vous du réseau mondial.",
  "menu.events.promo": "Parcourez les programmes à venir et les temps forts des événements passés.",
  "menu.group.eventCategories": "Catégories d'événements",
  "menu.group.moreCategories": "Plus de catégories",
  "home.whatIsWbc": "Qu'est-ce que le WBC ?",
  "home.featuredServices": "Services phares",
  "home.servicesDesc":
    "Une sélection de services issus de notre programme d'accompagnement des entreprises dans le monde.",
  "home.latestNews": "Dernières actualités",
  "home.newsKicker": "Activités institutionnelles et actualités économiques",
  "home.newsTitle": "La dynamique actuelle du réseau WBC et dans le monde",
  "home.newsIntro":
    "Suivez les mises à jour récentes pour mieux comprendre les activités du WBC et l'actualité des affaires dans le monde.",
  "home.noNews": "Aucun article publié pour le moment.",
  "home.ourValues": "Nos valeurs",
  "home.valuesTitle": "Les principes du WBC.",
  "home.valuesIntro":
    "Ces valeurs guidant la façon dont nous réunissons les institutions, soutenons les membres et partenaires, et transformons les liens internationaux en coopération concrète.",
  "home.glance": "WBC en un coup d'œil",
  "home.founded": "Fondation",
  "home.headquarters": "Siège",
  "home.countries": "Pays concernés",
  "cta.joinCommunity": "Rejoindre la communauté WBC",
  "cta.joinCommunityEvents":
    "Soyez les premiers informés des prochaines conférences, forums et événements d'affaires internationaux.",
  "cta.joinCommunityEvent":
    "Devenez membre pour accéder aux événements, programmes et connexions d'affaires internationales.",
  "cta.stayConnected": "Restez connectés",
  "cta.stayConnectedBody":
    "Rejoignez le WBC pour recevoir les actualités des programmes et participer au réseau mondial.",
  "cta.becomeNetwork": "Faire partie du réseau",
  "cta.becomeNetworkBody":
    "Rejoignez le WBC pour figurer dans l'annuaire des membres et vous connecter aux organisations du monde entier.",
  "cta.readyJoin": "Prêt à rejoindre le WBC ?",
  "cta.readyJoinBody": "Rejoignez un réseau fondé sur la collaboration, l'innovation et la confiance.",
  "cta.exploreJobs": "Découvrir d'autres opportunités",
  "cta.exploreJobsBody":
    "Explorez davantage d'offres d'emploi et de stages dans le réseau WBC et trouvez celle qui correspond à votre profil.",
  "cta.viewInternships": "Voir tous les stages",
  "cta.joinAffiliate": "Rejoindre le réseau WBC",
  "cta.joinAffiliateBody":
    "Devenez membre et connectez-vous aux affiliés, institutions et partenaires dans le monde.",
  "events.emptyTitle": "Le programme est en cours de préparation.",
  "events.emptyBody":
    "Les sommets, forums et événements confirmés du WBC apparaîtront ici dès leur publication. Revenez bientôt, ou contactez-nous pour les prochaines dates.",
  "events.emptyCategory": "Rien n'est prévu dans {name} pour le moment.",
  "events.emptyCategoryBody":
    "Choisissez Tous les événements pour voir l'ensemble du programme, ou une autre catégorie. Les nouvelles dates sont ajoutées dès confirmation.",
  "events.about": "À propos de cet événement",
  "news.empty": "Aucun article publié pour le moment.",
};

const es: Dict = {
  ...en,
  "nav.about": "Sobre nosotros",
  "nav.network": "Red global",
  "nav.membership": "Membresía",
  "nav.events": "Eventos",
  "nav.contact": "Contacto",
  "nav.ourMembers": "Nuestros miembros",
  "nav.news": "Noticias",
  "nav.jobs": "Empleos",
  "cta.join": "Únete al WBC",
  "lang.label": "Idioma",
  "footer.tagline":
    "Una organización internacional de apoyo empresarial que conecta empresas, profesionales e instituciones en todo el mundo.",
  "footer.about": "Nosotros",
  "footer.network": "Red",
  "footer.membership": "Membresía",
  "footer.resources": "Recursos",
  "footer.rights": "Todos los derechos reservados.",
  "footer.privacy": "Política de privacidad",
  "footer.terms": "Términos del servicio",
  "link.whoWeAre": "Quiénes somos",
  "link.whatWeDo": "Qué hacemos",
  "link.governance": "Gobernanza",
  "link.team": "Equipo WBC",
  "link.hq": "Sede del WBC",
  "link.affiliates": "Afiliados WBC",
  "link.institutional": "Miembros institucionales",
  "link.partners": "Socios y patrocinadores",
  "link.wbcMembership": "Membresía WBC",
  "link.benefits": "Beneficios de membresía",
  "link.become": "Hazte miembro",
  "ui.home": "Inicio",
  "ui.viewAll": "Ver todo",
  "ui.viewAllServices": "Ver todos los servicios",
  "ui.viewAllUpdates": "Ver todas las novedades",
  "ui.viewNetwork": "Ver la red",
  "ui.allEvents": "Todos los eventos",
  "ui.openMenu": "Abrir menú",
  "ui.closeMenu": "Cerrar menú",
  "ui.skipToContent": "Ir al contenido",
  "ui.viewFullProfile": "Ver perfil completo",
  "ui.email": "Correo:",
  "ui.phone": "Teléfono:",
  "ui.contactTeam": "Contactar al equipo WBC",
  "menu.about.intro":
    "Conozca el World Business Council: nuestra misión, visión, valores e iniciativas globales que impulsan a las empresas en todo el mundo.",
  "menu.about.promo": "Explore la historia del WBC y cómo conectamos empresas en todo el mundo.",
  "menu.group.aboutWbc": "Sobre WBC",
  "menu.desc.whoWeAre": "Nuestra misión, visión y valores",
  "menu.desc.whatWeDo": "Programas e iniciativas globales",
  "menu.group.leadership": "Liderazgo",
  "menu.desc.governance": "Estructura de liderazgo y políticas",
  "menu.desc.team": "Conozca al equipo WBC",
  "menu.network.intro":
    "Sede, afiliados, miembros y socios trabajando como una sola red global colaborativa.",
  "menu.network.promo": "Descubra cómo el WBC conecta instituciones y empresas en las regiones.",
  "menu.group.structure": "Estructura de la red",
  "menu.desc.hq": "Liderazgo, gobernanza y coordinación en París",
  "menu.desc.affiliates": "Representantes oficiales en países y ciudades",
  "menu.group.membersPartners": "Miembros y socios",
  "menu.desc.institutional": "Miembros institucionales, corporativos, pymes e individuales",
  "menu.desc.partners": "Alianzas, patrocinios, iniciativas conjuntas y cooperación",
  "menu.membership.intro":
    "Explore los beneficios de la membresía, solicite unirse y consulte el directorio de miembros.",
  "menu.membership.promo": "Comience su camino con el WBC y abra oportunidades de negocio globales.",
  "menu.group.membership": "Membresía",
  "menu.desc.wbcMembership": "Tipos, beneficios, cuotas",
  "menu.desc.become": "Inicie su solicitud de membresía",
  "menu.group.directory": "Directorio",
  "menu.desc.ourMembers": "Directorio de miembros activos",
  "menu.group.benefits": "Beneficios",
  "menu.group.join": "Unirse",
  "menu.events.intro":
    "Eventos especiales WBC, eventos empresariales, talleres y formaciones, y otros encuentros de la red global.",
  "menu.events.promo": "Consulte los programas próximos y los destacados de eventos anteriores.",
  "menu.group.eventCategories": "Categorías de eventos",
  "menu.group.moreCategories": "Más categorías",
  "home.whatIsWbc": "¿Qué es el WBC?",
  "home.featuredServices": "Servicios destacados",
  "home.servicesDesc":
    "Una selección de servicios de nuestro programa de apoyo a empresas en todo el mundo.",
  "home.latestNews": "Últimas noticias",
  "home.newsKicker": "Actividades institucionales y noticias de negocios",
  "home.newsTitle": "El impulso actual de la red WBC y en el mundo",
  "home.newsIntro":
    "Siga las actualizaciones recientes para comprender mejor las actividades del WBC y las noticias de negocios en el mundo.",
  "home.noNews": "Aún no hay artículos publicados.",
  "home.ourValues": "Nuestros valores",
  "home.valuesTitle": "Principios del WBC.",
  "home.valuesIntro":
    "Estos valores orientan cómo reunimos instituciones, apoyamos a miembros y socios, y convertimos las conexiones internacionales en cooperación práctica.",
  "home.glance": "WBC de un vistazo",
  "home.founded": "Fundación",
  "home.headquarters": "Sede",
  "home.countries": "Países involucrados",
  "cta.joinCommunity": "Únase a la comunidad WBC",
  "cta.joinCommunityEvents":
    "Sea el primero en conocer las próximas conferencias, foros y eventos de negocios globales.",
  "cta.joinCommunityEvent":
    "Hágase miembro para acceder a eventos, programas y conexiones empresariales internacionales.",
  "cta.stayConnected": "Manténgase conectado",
  "cta.stayConnectedBody":
    "Únase al WBC para recibir novedades de los programas y participar en la red global.",
  "cta.becomeNetwork": "Forme parte de la red",
  "cta.becomeNetworkBody":
    "Únase al WBC para aparecer en el directorio de miembros y conectar con organizaciones de todo el mundo.",
  "cta.readyJoin": "¿Listo para unirse al WBC?",
  "cta.readyJoinBody": "Forme parte de una red basada en la colaboración, la innovación y la confianza.",
  "cta.exploreJobs": "Explorar más oportunidades",
  "cta.exploreJobsBody":
    "Descubra más empleos y prácticas en la red WBC y encuentre la opción que encaje con su perfil.",
  "cta.viewInternships": "Ver todas las prácticas",
  "cta.joinAffiliate": "Únase a la red WBC",
  "cta.joinAffiliateBody":
    "Hágase miembro y conéctese con afiliados, instituciones y socios en todo el mundo.",
  "events.emptyTitle": "El programa se está preparando.",
  "events.emptyBody":
    "Las cumbres, foros y eventos confirmados del WBC aparecerán aquí cuando se publiquen. Vuelva pronto o contáctenos para las próximas fechas.",
  "events.emptyCategory": "No hay nada programado en {name} por el momento.",
  "events.emptyCategoryBody":
    "Elija Todos los eventos para ver el programa completo, u otra categoría. Las nuevas fechas se añaden al confirmarse cada encuentro.",
  "events.about": "Sobre este evento",
  "news.empty": "Aún no hay artículos publicados.",
};

const ar: Dict = {
  ...en,
  "nav.about": "نبذة عنا",
  "nav.network": "الشبكة العالمية",
  "nav.membership": "العضوية",
  "nav.events": "الفعاليات",
  "nav.contact": "اتصل بنا",
  "nav.ourMembers": "أعضاؤنا",
  "nav.news": "الأخبار",
  "nav.jobs": "الوظائف",
  "cta.join": "انضم إلى WBC",
  "lang.label": "اللغة",
  "footer.tagline": "منظمة دولية لدعم الأعمال تربط الشركات والمهنيين والمؤسسات حول العالم.",
  "footer.about": "نبذة",
  "footer.network": "الشبكة",
  "footer.membership": "العضوية",
  "footer.resources": "الموارد",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.privacy": "سياسة الخصوصية",
  "footer.terms": "شروط الخدمة",
  "link.whoWeAre": "من نحن",
  "link.whatWeDo": "ماذا نفعل",
  "link.governance": "الحكامة",
  "link.team": "فريق WBC",
  "link.hq": "المقر الرئيسي",
  "link.affiliates": "الفروع المنتسبة",
  "link.institutional": "الأعضاء المؤسسيون",
  "link.partners": "الشركاء والرعاة",
  "link.wbcMembership": "عضوية WBC",
  "link.benefits": "مزايا العضوية",
  "link.become": "كن عضواً",
  "ui.home": "الرئيسية",
  "ui.viewAll": "عرض الكل",
  "ui.viewAllServices": "عرض جميع الخدمات",
  "ui.viewAllUpdates": "عرض جميع التحديثات",
  "ui.viewNetwork": "عرض الشبكة",
  "ui.allEvents": "جميع الفعاليات",
  "ui.openMenu": "فتح القائمة",
  "ui.closeMenu": "إغلاق القائمة",
  "ui.skipToContent": "تخطي إلى المحتوى",
  "ui.viewFullProfile": "عرض الملف الكامل",
  "ui.email": "البريد الإلكتروني:",
  "ui.phone": "الهاتف:",
  "ui.contactTeam": "التواصل مع فريق WBC",
  "menu.about.intro":
    "تعرّف على المجلس العالمي للأعمال — رسالتنا ورؤيتنا وقيمنا ومبادراتنا العالمية التي تمكّن الشركات حول العالم.",
  "menu.about.promo": "استكشف قصة WBC وكيف نربط الشركات حول العالم.",
  "menu.group.aboutWbc": "عن WBC",
  "menu.desc.whoWeAre": "رسالتنا ورؤيتنا وقيمنا",
  "menu.desc.whatWeDo": "البرامج والمبادرات العالمية",
  "menu.group.leadership": "القيادة",
  "menu.desc.governance": "هيكل القيادة والسياسات",
  "menu.desc.team": "تعرّف على فريق WBC",
  "menu.network.intro": "المقر والفروع والأعضاء والشركاء يعملون معاً ضمن شبكة عالمية واحدة.",
  "menu.network.promo": "اكتشف كيف يربط WBC المؤسسات والشركات عبر المناطق.",
  "menu.group.structure": "هيكل الشبكة",
  "menu.desc.hq": "القيادة والحوكمة والتنسيق في باريس",
  "menu.desc.affiliates": "ممثلون رسميون في الدول والمدن",
  "menu.group.membersPartners": "الأعضاء والشركاء",
  "menu.desc.institutional": "أعضاء مؤسسيون وشركات ومشاريع صغيرة ومتوسطة وأفراد",
  "menu.desc.partners": "شراكات ورعايات ومبادرات مشتركة وتعاون",
  "menu.membership.intro": "استكشف مزايا العضوية وتقدّم بطلب وانظر دليل الأعضاء.",
  "menu.membership.promo": "ابدأ مسيرتك مع WBC وافتح فرص أعمال عالمية.",
  "menu.group.membership": "العضوية",
  "menu.desc.wbcMembership": "الأنواع والمزايا والرسوم",
  "menu.desc.become": "ابدأ طلب العضوية",
  "menu.group.directory": "الدليل",
  "menu.desc.ourMembers": "دليل الأعضاء النشطين",
  "menu.group.benefits": "المزايا",
  "menu.group.join": "انضم",
  "menu.events.intro":
    "فعاليات WBC الخاصة وفعاليات الأعمال وورش العمل والتدريب وغيرها عبر الشبكة العالمية.",
  "menu.events.promo": "تصفّح البرامج القادمة وأبرز الفعاليات السابقة.",
  "menu.group.eventCategories": "فئات الفعاليات",
  "menu.group.moreCategories": "المزيد من الفئات",
  "home.whatIsWbc": "ما هو WBC؟",
  "home.featuredServices": "خدمات مميزة",
  "home.servicesDesc": "خدمات مختارة من برنامجنا لدعم الأعمال في أنحاء العالم.",
  "home.latestNews": "آخر الأخبار",
  "home.newsKicker": "الأنشطة المؤسسية وأخبار الأعمال",
  "home.newsTitle": "الزخم الحالي عبر شبكة WBC وفي العالم",
  "home.newsIntro":
    "تابع التحديثات الأخيرة لفهم أنشطة WBC بشكل أفضل والحصول على أخبار الأعمال في العالم.",
  "home.noNews": "لا توجد مقالات منشورة بعد.",
  "home.ourValues": "قيمنا",
  "home.valuesTitle": "مبادئ WBC.",
  "home.valuesIntro":
    "تشكّل هذه القيم أسلوب جمع المؤسسات ودعم الأعضاء والشركاء وتحويل الروابط الدولية إلى تعاون عملي.",
  "home.glance": "WBC في لمحة",
  "home.founded": "التأسيس",
  "home.headquarters": "المقر",
  "home.countries": "الدول المعنية",
  "cta.joinCommunity": "انضم إلى مجتمع WBC",
  "cta.joinCommunityEvents":
    "كن أول من يعرف عن المؤتمرات والمنتديات وفعاليات الأعمال العالمية القادمة.",
  "cta.joinCommunityEvent":
    "كن عضواً للوصول إلى الفعاليات والبرامج وروابط الأعمال الدولية.",
  "cta.stayConnected": "ابقَ على تواصل",
  "cta.stayConnectedBody": "انضم إلى WBC لتلقي تحديثات البرامج والمشاركة في الشبكة العالمية.",
  "cta.becomeNetwork": "كن جزءاً من الشبكة",
  "cta.becomeNetworkBody":
    "انضم إلى WBC للظهور في دليل الأعضاء والتواصل مع المنظمات حول العالم.",
  "cta.readyJoin": "هل أنت مستعد للانضمام إلى WBC؟",
  "cta.readyJoinBody": "كن جزءاً من شبكة قائمة على التعاون والابتكار والثقة.",
  "cta.exploreJobs": "استكشف المزيد من الفرص",
  "cta.exploreJobsBody":
    "اكتشف المزيد من الوظائف والتدريب في شبكة WBC واعثر على ما يناسب مهاراتك.",
  "cta.viewInternships": "عرض جميع التدريبات",
  "cta.joinAffiliate": "انضم إلى شبكة WBC",
  "cta.joinAffiliateBody": "كن عضواً وتواصل مع الفروع والمؤسسات والشركاء حول العالم.",
  "events.emptyTitle": "قائمة البرامج قيد الإعداد.",
  "events.emptyBody":
    "ستظهر هنا قمم ومنتديات وفعاليات WBC المؤكدة عند نشرها. عد قريباً أو تواصل معنا لمعرفة أحدث المواعيد.",
  "events.emptyCategory": "لا يوجد شيء مجدول في {name} حالياً.",
  "events.emptyCategoryBody":
    "اختر جميع الفعاليات لرؤية البرنامج كاملاً، أو فئة أخرى. تُضاف التواريخ الجديدة عند تأكيد كل لقاء.",
  "events.about": "عن هذه الفعالية",
  "news.empty": "لا توجد مقالات منشورة بعد.",
};

const zh: Dict = {
  ...en,
  "nav.about": "关于我们",
  "nav.network": "全球网络",
  "nav.membership": "会员",
  "nav.events": "活动",
  "nav.contact": "联系我们",
  "nav.ourMembers": "我们的会员",
  "nav.news": "新闻",
  "nav.jobs": "职位",
  "cta.join": "加入 WBC",
  "lang.label": "语言",
  "footer.tagline": "一个国际商业支持组织，连接全球的企业、专业人士和机构。",
  "footer.about": "关于",
  "footer.network": "网络",
  "footer.membership": "会员",
  "footer.resources": "资源",
  "footer.rights": "版权所有。",
  "footer.privacy": "隐私政策",
  "footer.terms": "服务条款",
  "link.whoWeAre": "我们是谁",
  "link.whatWeDo": "我们的工作",
  "link.governance": "治理",
  "link.team": "WBC 团队",
  "link.hq": "WBC 总部",
  "link.affiliates": "WBC 分支机构",
  "link.institutional": "机构会员",
  "link.partners": "合作伙伴与赞助商",
  "link.wbcMembership": "WBC 会员资格",
  "link.benefits": "会员权益",
  "link.become": "成为会员",
  "ui.home": "首页",
  "ui.viewAll": "查看全部",
  "ui.viewAllServices": "查看全部服务",
  "ui.viewAllUpdates": "查看全部动态",
  "ui.viewNetwork": "查看网络",
  "ui.allEvents": "全部活动",
  "ui.openMenu": "打开菜单",
  "ui.closeMenu": "关闭菜单",
  "ui.skipToContent": "跳到内容",
  "ui.viewFullProfile": "查看完整简介",
  "ui.email": "邮箱：",
  "ui.phone": "电话：",
  "ui.contactTeam": "联系 WBC 团队",
  "menu.about.intro":
    "了解世界商业理事会——我们的使命、愿景、价值观以及赋能全球企业的国际倡议。",
  "menu.about.promo": "探索 WBC 的故事，以及我们如何连接全球企业。",
  "menu.group.aboutWbc": "关于 WBC",
  "menu.desc.whoWeAre": "我们的使命、愿景与价值观",
  "menu.desc.whatWeDo": "项目与全球倡议",
  "menu.group.leadership": "领导层",
  "menu.desc.governance": "领导架构与政策",
  "menu.desc.team": "认识 WBC 团队",
  "menu.network.intro": "总部、分支机构、会员与合作伙伴共同组成协作型全球网络。",
  "menu.network.promo": "了解 WBC 如何连接各地区的机构与企业。",
  "menu.group.structure": "网络结构",
  "menu.desc.hq": "巴黎的领导、治理与协调",
  "menu.desc.affiliates": "各国与城市的官方代表",
  "menu.group.membersPartners": "会员与合作伙伴",
  "menu.desc.institutional": "机构、企业、中小企业及个人会员",
  "menu.desc.partners": "合作、赞助、联合倡议与协作",
  "menu.membership.intro": "了解会员权益、申请入会并浏览会员名录。",
  "menu.membership.promo": "开启您的 WBC 之旅，解锁全球商业机会。",
  "menu.group.membership": "会员",
  "menu.desc.wbcMembership": "类型、权益与费用",
  "menu.desc.become": "开始会员申请",
  "menu.group.directory": "名录",
  "menu.desc.ourMembers": "现役会员名录",
  "menu.group.benefits": "权益",
  "menu.group.join": "加入",
  "menu.events.intro": "WBC 特别活动、商务活动、工作坊与培训，以及全球网络的其他活动。",
  "menu.events.promo": "浏览即将举行的项目与往期活动亮点。",
  "menu.group.eventCategories": "活动类别",
  "menu.group.moreCategories": "更多类别",
  "home.whatIsWbc": "什么是 WBC？",
  "home.featuredServices": "精选服务",
  "home.servicesDesc": "从我们支持全球企业的完整项目中精选的服务。",
  "home.latestNews": "最新新闻",
  "home.newsKicker": "机构动态与商业新闻",
  "home.newsTitle": "WBC 网络与全球当前动能",
  "home.newsIntro": "关注最新动态，更好地了解 WBC 活动以及全球商业新闻。",
  "home.noNews": "尚无已发布的新闻。",
  "home.ourValues": "我们的价值观",
  "home.valuesTitle": "WBC 的原则。",
  "home.valuesIntro":
    "这些价值观决定我们如何汇聚机构、支持会员与合作伙伴，并将国际联系转化为务实合作。",
  "home.glance": "WBC 一览",
  "home.founded": "成立",
  "home.headquarters": "总部",
  "home.countries": "参与国家",
  "cta.joinCommunity": "加入 WBC 社区",
  "cta.joinCommunityEvents": "第一时间了解即将举行的会议、论坛和全球商务活动。",
  "cta.joinCommunityEvent": "成为会员，参与活动、项目和国际商务连接。",
  "cta.stayConnected": "保持联系",
  "cta.stayConnectedBody": "加入 WBC，接收项目更新并参与全球网络。",
  "cta.becomeNetwork": "成为网络的一部分",
  "cta.becomeNetworkBody": "加入 WBC，出现在会员名录中，并与全球组织建立联系。",
  "cta.readyJoin": "准备好加入 WBC 了吗？",
  "cta.readyJoinBody": "加入一个建立在协作、创新与信任之上的网络。",
  "cta.exploreJobs": "探索更多机会",
  "cta.exploreJobsBody": "发现 WBC 网络中更多的职位与实习，找到适合您技能与兴趣的机会。",
  "cta.viewInternships": "查看全部实习",
  "cta.joinAffiliate": "加入 WBC 网络",
  "cta.joinAffiliateBody": "成为会员，与全球分支机构、机构和合作伙伴建立联系。",
  "events.emptyTitle": "活动列表正在准备中。",
  "events.emptyBody":
    "已确认的 WBC 峰会、论坛和网络活动发布后将显示在此。请稍后再来，或联系我们获取最新日期。",
  "events.emptyCategory": "目前 {name} 暂无安排。",
  "events.emptyCategoryBody":
    "选择全部活动查看完整日程，或选择其他类别。每次活动确认后都会添加新日期。",
  "events.about": "关于本活动",
  "news.empty": "尚无已发布的新闻。",
};

const ru: Dict = {
  ...en,
  "nav.about": "О нас",
  "nav.network": "Глобальная сеть",
  "nav.membership": "Членство",
  "nav.events": "Мероприятия",
  "nav.contact": "Контакты",
  "nav.ourMembers": "Наши члены",
  "nav.news": "Новости",
  "nav.jobs": "Вакансии",
  "cta.join": "Вступить в WBC",
  "lang.label": "Язык",
  "footer.tagline":
    "Международная организация поддержки бизнеса, объединяющая компании, профессионалов и учреждения по всему миру.",
  "footer.about": "О нас",
  "footer.network": "Сеть",
  "footer.membership": "Членство",
  "footer.resources": "Ресурсы",
  "footer.rights": "Все права защищены.",
  "footer.privacy": "Политика конфиденциальности",
  "footer.terms": "Условия использования",
  "link.whoWeAre": "Кто мы",
  "link.whatWeDo": "Чем мы занимаемся",
  "link.governance": "Управление",
  "link.team": "Команда WBC",
  "link.hq": "Штаб-квартира WBC",
  "link.affiliates": "Отделения WBC",
  "link.institutional": "Институциональные члены",
  "link.partners": "Партнёры и спонсоры",
  "link.wbcMembership": "Членство в WBC",
  "link.benefits": "Преимущества членства",
  "link.become": "Стать членом",
  "ui.home": "Главная",
  "ui.viewAll": "Смотреть всё",
  "ui.viewAllServices": "Все услуги",
  "ui.viewAllUpdates": "Все обновления",
  "ui.viewNetwork": "Смотреть сеть",
  "ui.allEvents": "Все мероприятия",
  "ui.openMenu": "Открыть меню",
  "ui.closeMenu": "Закрыть меню",
  "ui.skipToContent": "Перейти к содержанию",
  "ui.viewFullProfile": "Смотреть полный профиль",
  "ui.email": "Эл. почта:",
  "ui.phone": "Телефон:",
  "ui.contactTeam": "Связаться с командой WBC",
  "menu.about.intro":
    "Узнайте о Всемирном деловом совете — наша миссия, видение, ценности и глобальные инициативы в поддержку бизнеса.",
  "menu.about.promo": "Узнайте историю WBC и то, как мы соединяем компании по всему миру.",
  "menu.group.aboutWbc": "О WBC",
  "menu.desc.whoWeAre": "Наша миссия, видение и ценности",
  "menu.desc.whatWeDo": "Программы и глобальные инициативы",
  "menu.group.leadership": "Руководство",
  "menu.desc.governance": "Структура руководства и политики",
  "menu.desc.team": "Познакомьтесь с командой WBC",
  "menu.network.intro":
    "Штаб-квартира, отделения, члены и партнёры работают как одна глобальная сеть.",
  "menu.network.promo": "Узнайте, как WBC соединяет институты и компании в разных регионах.",
  "menu.group.structure": "Структура сети",
  "menu.desc.hq": "Руководство, управление и координация в Париже",
  "menu.desc.affiliates": "Официальные представители в странах и городах",
  "menu.group.membersPartners": "Члены и партнёры",
  "menu.desc.institutional": "Институциональные, корпоративные, МСП и индивидуальные члены",
  "menu.desc.partners": "Партнёрства, спонсорство, совместные инициативы и сотрудничество",
  "menu.membership.intro":
    "Изучите преимущества членства, подайте заявку и просмотрите каталог членов.",
  "menu.membership.promo": "Начните путь с WBC и откройте глобальные бизнес-возможности.",
  "menu.group.membership": "Членство",
  "menu.desc.wbcMembership": "Типы, преимущества, взносы",
  "menu.desc.become": "Начать заявку на членство",
  "menu.group.directory": "Каталог",
  "menu.desc.ourMembers": "Каталог действующих членов",
  "menu.group.benefits": "Преимущества",
  "menu.group.join": "Вступить",
  "menu.events.intro":
    "Специальные мероприятия WBC, деловые события, семинары и тренинги, а также другие события глобальной сети.",
  "menu.events.promo": "Смотрите предстоящие программы и яркие моменты прошедших событий.",
  "menu.group.eventCategories": "Категории мероприятий",
  "menu.group.moreCategories": "Другие категории",
  "home.whatIsWbc": "Что такое WBC?",
  "home.featuredServices": "Ключевые услуги",
  "home.servicesDesc": "Избранные услуги из нашей программы поддержки бизнеса по всему миру.",
  "home.latestNews": "Последние новости",
  "home.newsKicker": "Институциональная деятельность и деловые новости",
  "home.newsTitle": "Текущая динамика сети WBC и мира",
  "home.newsIntro":
    "Следите за обновлениями, чтобы лучше понимать деятельность WBC и деловые новости в мире.",
  "home.noNews": "Пока нет опубликованных материалов.",
  "home.ourValues": "Наши ценности",
  "home.valuesTitle": "Принципы WBC.",
  "home.valuesIntro":
    "Эти ценности определяют, как мы собираем институты, поддерживаем членов и партнёров и превращаем международные связи в практическое сотрудничество.",
  "home.glance": "WBC кратко",
  "home.founded": "Основан",
  "home.headquarters": "Штаб-квартира",
  "home.countries": "Страны участия",
  "cta.joinCommunity": "Присоединиться к сообществу WBC",
  "cta.joinCommunityEvents":
    "Узнавайте первыми о предстоящих конференциях, форумах и международных деловых событиях.",
  "cta.joinCommunityEvent":
    "Станьте членом, чтобы получать доступ к мероприятиям, программам и международным деловым связям.",
  "cta.stayConnected": "Оставайтесь на связи",
  "cta.stayConnectedBody":
    "Присоединяйтесь к WBC, чтобы получать обновления программ и участвовать в глобальной сети.",
  "cta.becomeNetwork": "Стать частью сети",
  "cta.becomeNetworkBody":
    "Присоединяйтесь к WBC, чтобы появиться в каталоге членов и связаться с организациями по всему миру.",
  "cta.readyJoin": "Готовы присоединиться к WBC?",
  "cta.readyJoinBody": "Станьте частью сети, построенной на сотрудничестве, инновациях и доверии.",
  "cta.exploreJobs": "Больше возможностей",
  "cta.exploreJobsBody":
    "Откройте больше вакансий и стажировок в сети WBC и найдите то, что подходит вашим навыкам.",
  "cta.viewInternships": "Все стажировки",
  "cta.joinAffiliate": "Присоединиться к сети WBC",
  "cta.joinAffiliateBody":
    "Станьте членом и свяжитесь с отделениями, институтами и партнёрами по всему миру.",
  "events.emptyTitle": "Программа мероприятий готовится.",
  "events.emptyBody":
    "Подтверждённые саммиты, форумы и события WBC появятся здесь после публикации. Загляните позже или свяжитесь с нами за актуальными датами.",
  "events.emptyCategory": "В категории {name} пока ничего не запланировано.",
  "events.emptyCategoryBody":
    "Выберите Все мероприятия, чтобы увидеть полную программу, или другую категорию. Новые даты добавляются после подтверждения.",
  "events.about": "Об этом мероприятии",
  "news.empty": "Пока нет опубликованных материалов.",
};

export const DICTIONARIES: Record<LangCode, Dict> = { en, fr, es, ar, zh, ru };

export function interpolate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (output, [key, value]) => output.replaceAll(`{${key}}`, value),
    template,
  );
}
