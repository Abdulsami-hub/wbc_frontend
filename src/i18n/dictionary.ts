import type { LangCode } from "./languages";

export type TranslationKey =
  | "nav.about"
  | "nav.network"
  | "nav.membership"
  | "nav.events"
  | "nav.contact"
  | "nav.ourMembers"
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
  | "link.become";

type Dict = Record<TranslationKey, string>;

const en: Dict = {
  "nav.about": "About Us",
  "nav.network": "Global Network",
  "nav.membership": "Membership",
  "nav.events": "Events",
  "nav.contact": "Contact",
  "nav.ourMembers": "Our Members",
  "cta.join": "Join WBC",
  "lang.label": "Language",
  "footer.tagline":
    "Building a global network that empowers businesses through collaboration, innovation, and trust.",
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
  "link.partners": "Strategic Partners",
  "link.wbcMembership": "WBC Membership",
  "link.benefits": "Benefits",
  "link.become": "Become a Member",
};

const fr: Dict = {
  "nav.about": "À propos",
  "nav.network": "Réseau mondial",
  "nav.membership": "Adhésion",
  "nav.events": "Événements",
  "nav.contact": "Contact",
  "nav.ourMembers": "Nos membres",
  "cta.join": "Rejoindre le WBC",
  "lang.label": "Langue",
  "footer.tagline":
    "Construire un réseau mondial qui renforce les entreprises par la collaboration, l'innovation et la confiance.",
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
  "link.partners": "Partenaires stratégiques",
  "link.wbcMembership": "Adhésion WBC",
  "link.benefits": "Avantages",
  "link.become": "Devenir membre",
};

const es: Dict = {
  "nav.about": "Sobre nosotros",
  "nav.network": "Red global",
  "nav.membership": "Membresía",
  "nav.events": "Eventos",
  "nav.contact": "Contacto",
  "nav.ourMembers": "Nuestros miembros",
  "cta.join": "Únete al WBC",
  "lang.label": "Idioma",
  "footer.tagline":
    "Construimos una red global que impulsa a las empresas mediante colaboración, innovación y confianza.",
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
  "link.partners": "Socios estratégicos",
  "link.wbcMembership": "Membresía WBC",
  "link.benefits": "Beneficios",
  "link.become": "Hazte miembro",
};

const de: Dict = {
  "nav.about": "Über uns",
  "nav.network": "Globales Netzwerk",
  "nav.membership": "Mitgliedschaft",
  "nav.events": "Veranstaltungen",
  "nav.contact": "Kontakt",
  "nav.ourMembers": "Unsere Mitglieder",
  "cta.join": "WBC beitreten",
  "lang.label": "Sprache",
  "footer.tagline":
    "Wir bauen ein globales Netzwerk, das Unternehmen durch Zusammenarbeit, Innovation und Vertrauen stärkt.",
  "footer.about": "Über uns",
  "footer.network": "Netzwerk",
  "footer.membership": "Mitgliedschaft",
  "footer.resources": "Ressourcen",
  "footer.rights": "Alle Rechte vorbehalten.",
  "footer.privacy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "link.whoWeAre": "Wer wir sind",
  "link.whatWeDo": "Was wir tun",
  "link.governance": "Governance",
  "link.team": "WBC-Team",
  "link.hq": "WBC-Hauptsitz",
  "link.affiliates": "WBC-Partnerbüros",
  "link.institutional": "Institutionelle Mitglieder",
  "link.partners": "Strategische Partner",
  "link.wbcMembership": "WBC-Mitgliedschaft",
  "link.benefits": "Vorteile",
  "link.become": "Mitglied werden",
};

const ar: Dict = {
  "nav.about": "من نحن",
  "nav.network": "الشبكة العالمية",
  "nav.membership": "العضوية",
  "nav.events": "الفعاليات",
  "nav.contact": "اتصل بنا",
  "nav.ourMembers": "أعضاؤنا",
  "cta.join": "انضم إلى WBC",
  "lang.label": "اللغة",
  "footer.tagline": "نبني شبكة عالمية تمكّن الشركات من خلال التعاون والابتكار والثقة.",
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
  "link.partners": "الشركاء الاستراتيجيون",
  "link.wbcMembership": "عضوية WBC",
  "link.benefits": "المزايا",
  "link.become": "كن عضواً",
};

const zh: Dict = {
  "nav.about": "关于我们",
  "nav.network": "全球网络",
  "nav.membership": "会员",
  "nav.events": "活动",
  "nav.contact": "联系我们",
  "nav.ourMembers": "我们的会员",
  "cta.join": "加入 WBC",
  "lang.label": "语言",
  "footer.tagline": "构建全球网络，通过合作、创新与信任赋能企业。",
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
  "link.partners": "战略伙伴",
  "link.wbcMembership": "WBC 会员资格",
  "link.benefits": "会员权益",
  "link.become": "成为会员",
};

const it: Dict = {
  "nav.about": "Chi siamo",
  "nav.network": "Rete globale",
  "nav.membership": "Adesione",
  "nav.events": "Eventi",
  "nav.contact": "Contatti",
  "nav.ourMembers": "I nostri membri",
  "cta.join": "Unisciti al WBC",
  "lang.label": "Lingua",
  "footer.tagline":
    "Costruiamo una rete globale che rafforza le imprese attraverso collaborazione, innovazione e fiducia.",
  "footer.about": "Chi siamo",
  "footer.network": "Rete",
  "footer.membership": "Adesione",
  "footer.resources": "Risorse",
  "footer.rights": "Tutti i diritti riservati.",
  "footer.privacy": "Informativa sulla privacy",
  "footer.terms": "Termini di servizio",
  "link.whoWeAre": "Chi siamo",
  "link.whatWeDo": "Cosa facciamo",
  "link.governance": "Governance",
  "link.team": "Team WBC",
  "link.hq": "Sede WBC",
  "link.affiliates": "Affiliati WBC",
  "link.institutional": "Membri istituzionali",
  "link.partners": "Partner strategici",
  "link.wbcMembership": "Adesione WBC",
  "link.benefits": "Vantaggi",
  "link.become": "Diventa membro",
};

const tr: Dict = {
  "nav.about": "Hakkımızda",
  "nav.network": "Küresel Ağ",
  "nav.membership": "Üyelik",
  "nav.events": "Etkinlikler",
  "nav.contact": "İletişim",
  "nav.ourMembers": "Üyelerimiz",
  "cta.join": "WBC'ye Katıl",
  "lang.label": "Dil",
  "footer.tagline":
    "İş birliği, inovasyon ve güven yoluyla işletmeleri güçlendiren küresel bir ağ kuruyoruz.",
  "footer.about": "Hakkında",
  "footer.network": "Ağ",
  "footer.membership": "Üyelik",
  "footer.resources": "Kaynaklar",
  "footer.rights": "Tüm hakları saklıdır.",
  "footer.privacy": "Gizlilik Politikası",
  "footer.terms": "Hizmet Koşulları",
  "link.whoWeAre": "Biz Kimiz",
  "link.whatWeDo": "Ne Yapıyoruz",
  "link.governance": "Yönetişim",
  "link.team": "WBC Ekibi",
  "link.hq": "WBC Merkezi",
  "link.affiliates": "WBC Temsilcilikleri",
  "link.institutional": "Kurumsal Üyeler",
  "link.partners": "Stratejik Ortaklar",
  "link.wbcMembership": "WBC Üyeliği",
  "link.benefits": "Avantajlar",
  "link.become": "Üye Ol",
};

const pt: Dict = {
  "nav.about": "Sobre nós",
  "nav.network": "Rede global",
  "nav.membership": "Adesão",
  "nav.events": "Eventos",
  "nav.contact": "Contato",
  "nav.ourMembers": "Nossos membros",
  "cta.join": "Junte-se ao WBC",
  "lang.label": "Idioma",
  "footer.tagline":
    "Construímos uma rede global que fortalece empresas por meio de colaboração, inovação e confiança.",
  "footer.about": "Sobre",
  "footer.network": "Rede",
  "footer.membership": "Adesão",
  "footer.resources": "Recursos",
  "footer.rights": "Todos os direitos reservados.",
  "footer.privacy": "Política de Privacidade",
  "footer.terms": "Termos de Serviço",
  "link.whoWeAre": "Quem somos",
  "link.whatWeDo": "O que fazemos",
  "link.governance": "Governança",
  "link.team": "Equipe WBC",
  "link.hq": "Sede do WBC",
  "link.affiliates": "Afiliados WBC",
  "link.institutional": "Membros institucionais",
  "link.partners": "Parceiros estratégicos",
  "link.wbcMembership": "Adesão ao WBC",
  "link.benefits": "Benefícios",
  "link.become": "Torne-se membro",
};

const ru: Dict = {
  "nav.about": "О нас",
  "nav.network": "Глобальная сеть",
  "nav.membership": "Членство",
  "nav.events": "Мероприятия",
  "nav.contact": "Контакты",
  "nav.ourMembers": "Наши члены",
  "cta.join": "Вступить в WBC",
  "lang.label": "Язык",
  "footer.tagline":
    "Мы создаём глобальную сеть, которая укрепляет бизнес через сотрудничество, инновации и доверие.",
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
  "link.partners": "Стратегические партнёры",
  "link.wbcMembership": "Членство в WBC",
  "link.benefits": "Преимущества",
  "link.become": "Стать членом",
};

export const DICTIONARIES: Record<LangCode, Dict> = { en, fr, es, de, ar, zh, it, tr, pt, ru };
