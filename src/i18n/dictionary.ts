import type { LangCode } from "./languages";

export type TranslationKey =
  | "nav.about"
  | "nav.network"
  | "nav.membership"
  | "nav.events"
  | "nav.contact"
  | "nav.ourMembers"
  | "nav.news"
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
  "nav.news": "News",
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
  "nav.about": "À propos de nous",
  "nav.network": "Réseau mondial",
  "nav.membership": "Adhésion",
  "nav.events": "Événements",
  "nav.contact": "Contact",
  "nav.ourMembers": "Nos membres",
  "nav.news": "Actualités",
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
  "nav.news": "Noticias",
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

const ar: Dict = {
  "nav.about": "نبذة عنا",
  "nav.network": "الشبكة العالمية",
  "nav.membership": "العضوية",
  "nav.events": "الفعاليات",
  "nav.contact": "اتصل بنا",
  "nav.ourMembers": "أعضاؤنا",
  "nav.news": "الأخبار",
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
  "nav.news": "新闻",
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

const ru: Dict = {
  "nav.about": "О нас",
  "nav.network": "Глобальная сеть",
  "nav.membership": "Членство",
  "nav.events": "Мероприятия",
  "nav.contact": "Контакты",
  "nav.ourMembers": "Наши члены",
  "nav.news": "Новости",
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

export const DICTIONARIES: Record<LangCode, Dict> = { en, fr, es, ar, zh, ru };
