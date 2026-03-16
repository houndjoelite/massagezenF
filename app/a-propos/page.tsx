import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Heart, Shield, CheckCircle, FlaskConical, BookOpen, Scale } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = {
  title: "À Propos de MassageZen | Notre Mission, Méthodologie & Équipe",
  description:
    "Découvrez MassageZen : qui nous sommes, comment nous testons les appareils de massage, et pourquoi nos recommandations sont fiables et indépendantes.",
}

// ─── Valeurs ────────────────────────────────────────────────────────────────
const values = [
  {
    icon: FlaskConical,
    title: "Tests indépendants",
    description:
      "Chaque appareil est évalué sur une période minimale de 2 semaines selon une grille de critères précise. Aucun fabricant ne finance nos tests.",
  },
  {
    icon: Users,
    title: "Communauté en croissance",
    description:
      "Des milliers de lecteurs nous font confiance chaque mois pour choisir leurs appareils de massage. Nos recommandations sont basées sur leurs retours réels.",
  },
  {
    icon: Heart,
    title: "Passion du bien-être",
    description:
      "Notre équipe pratique et teste au quotidien les produits qu'elle recommande. Pas de revue de presse — uniquement de l'expérience directe.",
  },
  {
    icon: Shield,
    title: "Transparence totale",
    description:
      "Nous déclarons nos liens affiliés, nous citons nos sources médicales et nous signalons les défauts des produits autant que leurs qualités.",
  },
]

// ─── Critères de test ────────────────────────────────────────────────────────
const testCriteria = [
  {
    icon: CheckCircle,
    label: "Efficacité ressentie",
    detail: "Testé sur 2 semaines minimum, sur différents profils (sportif, sédentaire, douleurs chroniques)",
  },
  {
    icon: CheckCircle,
    label: "Facilité d'utilisation",
    detail: "Ergonomie, prise en main, niveau sonore, clarté des réglages",
  },
  {
    icon: CheckCircle,
    label: "Durabilité",
    detail: "Qualité de fabrication, autonomie batterie, robustesse des embouts",
  },
  {
    icon: CheckCircle,
    label: "Rapport qualité/prix",
    detail: "Comparé systématiquement aux alternatives disponibles au même tarif",
  },
  {
    icon: CheckCircle,
    label: "Avis utilisateurs vérifiés",
    detail: "Croisés depuis Amazon, forums spécialisés et retours de notre communauté",
  },
  {
    icon: CheckCircle,
    label: "Validation médicale",
    detail: "Les affirmations sur la santé sont recoupées avec des sources médicales (HAS, INSERM, VIDAL)",
  },
]

// ─── Équipe ──────────────────────────────────────────────────────────────────
const team = [
  {
    name: "L'équipe éditoriale Elite",
    role: "Rédaction & Tests produits",
    bio: "Passionnés de bien-être, de sport et de récupération, nos rédacteurs testent personnellement chaque appareil avant toute recommandation. Ils croisent leur expérience avec les retours de notre communauté et les dernières publications scientifiques sur le massage thérapeutique.",
  },
  {
    name: "Nos conseillers santé",
    role: "Validation médicale",
    bio: "Pour les sujets touchant à la douleur chronique, aux contre-indications et aux bénéfices physiologiques, nous consultons des professionnels de santé (kinésithérapeutes, rhumatologues) afin de garantir l'exactitude des informations publiées.",
  },
]

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>À propos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* ── HERO ── */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">
              À Propos de MassageZen
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Guide indépendant pour choisir les meilleurs appareils de massage —
              des recommandations honnêtes, sourcées et testées en conditions réelles.
            </p>
          </div>

          {/* ── MISSION ── */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Notre Mission</h2>
              <p className="text-lg text-muted-foreground">
                Chez MassageZen, nous croyons que chacun mérite d'accéder aux bienfaits du massage
                thérapeutique — sans se perdre dans une offre devenue immense. Notre mission est de
                vous accompagner dans le choix des appareils les mieux adaptés à vos besoins et à
                votre budget, grâce à des comparatifs honnêtes et des guides pratiques rédigés par
                des passionnés de bien-être.
              </p>
              <p className="text-lg text-muted-foreground">
                Nous ne recommandons que des produits que nous avons réellement testés. Nous citons
                nos sources médicales. Nous déclarons nos liens affiliés. C'est ce qui nous distingue
                des sites qui se contentent de recopier les fiches produit Amazon.
              </p>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img
                src="/massage-zen-team-wellness-experts.png"
                alt="Équipe MassageZen — experts bien-être et massage thérapeutique"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── ÉQUIPE ── */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Qui sommes-nous ?</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              MassageZen est un site indépendant, sans investisseur ni actionnaire. Les personnes
              derrière ce projet partagent une passion commune : aider les gens à mieux récupérer,
              moins souffrir et prendre soin d'eux au quotidien.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="border border-border">
                  <CardContent className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── MÉTHODOLOGIE ── */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Comment on teste nos produits</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Chaque appareil recommandé sur MassageZen est évalué selon une grille de critères
              précise, appliquée de manière identique à tous les produits — du moins cher au plus
              haut de gamme.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testCriteria.map((c) => (
                <div
                  key={c.label}
                  className="flex gap-4 items-start p-5 rounded-xl bg-secondary/30 border border-border"
                >
                  <c.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{c.label}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── VALEURS ── */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── AFFILIATION ── */}
          <div className="mb-16 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8">
            <div className="flex gap-4 items-start">
              <Scale className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200">
                  Notre engagement de transparence — liens affiliés
                </h2>
                <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                  Certains liens présents sur MassageZen sont des <strong>liens affiliés</strong>,
                  notamment via le Programme Partenaires Amazon. Si vous achetez via ces liens, nous
                  percevons une petite commission — <strong>sans aucun coût supplémentaire pour vous</strong>.
                  Cette commission nous permet de financer nos tests, de maintenir le site et de
                  publier du contenu gratuit.
                </p>
                <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                  Elle n'influence jamais nos recommandations : nous signalons les défauts des
                  produits autant que leurs qualités, et nous refusons de recommander un produit
                  décevant même s'il génère une commission plus élevée.
                </p>
                <p className="text-amber-700 dark:text-amber-400 text-xs">
                  Ce site participe au Programme Partenaires d'Amazon EU, un programme d'affiliation
                  conçu pour permettre à des sites de percevoir une rémunération grâce à la création
                  de liens vers Amazon.fr.
                </p>
              </div>
            </div>
          </div>

          {/* ── SOURCES ── */}
          <div className="mb-16">
            <div className="flex gap-4 items-start bg-secondary/30 border border-border rounded-2xl p-8">
              <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Nos sources médicales et scientifiques</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Les informations relatives à la santé publiées sur MassageZen s'appuient sur des
                  sources médicales reconnues. Chaque affirmation clinique est recoupée et citée dans
                  le corps des articles.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-none">
                  <li>
                    <a
                      href="https://www.ameli.fr/assure/sante/themes/douleur-musculaire"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      Ameli.fr (Assurance Maladie)
                    </a>
                    {" "}— Douleurs musculaires et recommandations HAS
                  </li>
                  <li>
                    <a
                      href="https://www.has-sante.fr/jcms/c_732257/fr/lombalgie-commune"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      Haute Autorité de Santé (HAS)
                    </a>
                    {" "}— Prise en charge des lombalgies et douleurs chroniques
                  </li>
                  <li>
                    <a
                      href="https://www.vidal.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      VIDAL
                    </a>
                    {" "}— Électrostimulation TENS et indications thérapeutiques (2024)
                  </li>
                  <li>
                    <a
                      href="https://www.inserm.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      INSERM
                    </a>
                    {" "}— Effets physiologiques du massage sur la récupération musculaire
                  </li>
                  <li>
                    <a
                      href="https://pubmed.ncbi.nlm.nih.gov/15916429"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      Weerapong P. et al., Sports Medicine 2005
                    </a>
                    {" "}— Mécanismes du massage et effets sur la performance et la récupération
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── STATS ── */}
          <div className="bg-secondary/30 rounded-2xl p-8 lg:p-12 text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">MassageZen en chiffres</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Appareils comparés en détail</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">6</div>
                <p className="text-muted-foreground">Sources médicales citées par article</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2 sem.</div>
                <p className="text-muted-foreground">Durée minimale de test par produit</p>
              </div>
            </div>
          </div>

          {/* ── MENTIONS LÉGALES LINK ── */}
          <div className="text-center text-sm text-muted-foreground space-x-4">
            <a href="/mentions-legales" className="hover:text-primary underline underline-offset-2">
              Mentions légales
            </a>
            <span>·</span>
            <a href="/politique-confidentialite" className="hover:text-primary underline underline-offset-2">
              Politique de confidentialité
            </a>
            <span>·</span>
            <a href="/contact" className="hover:text-primary underline underline-offset-2">
              Contact
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
