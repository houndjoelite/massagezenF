import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = {
  title: "Mentions Légales | Mon Appareil de Massage",
  description:
    "Mentions légales de monappareildemassage.com : éditeur du site, hébergement, affiliation Amazon, données personnelles et politique de confidentialité.",
}

export default function MentionsLegalesPage() {
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
                <BreadcrumbPage>Mentions légales</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl mx-auto">

            {/* Titre */}
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                Mentions Légales
              </h1>
              <p className="text-muted-foreground text-sm">
                Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance
                dans l'économie numérique (LCEN)
              </p>
            </div>

            <div className="space-y-8">

              {/* ── 1. ÉDITEUR ── */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Éditeur du site</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Nom du site</p>
                      <p className="text-muted-foreground">Mon Appareil de Massage</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">URL</p>
                      <p className="text-muted-foreground">https://monappareildemassage.com</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Directeur de publication</p>
                      <p className="text-muted-foreground">Houndjo Jean Jacques</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Statut</p>
                      <p className="text-muted-foreground">Particulier — site personnel</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Pays de résidence</p>
                      <p className="text-muted-foreground">Bénin, Afrique de l'Ouest</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Contact</p>
                      <p className="text-muted-foreground">
                        <a
                          href="mailto:houndjojeanjacques82@gmail.com"
                          className="text-primary underline underline-offset-2 hover:opacity-80"
                        >
                          contact@monappareildemassage.com
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ── 2. HÉBERGEMENT ── */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Hébergement</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground space-y-2">
                  <p>
                    Ce site est hébergé par{" "}
                    <strong className="text-foreground">Vercel Inc.</strong>
                  </p>
                  <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                  <p>
                    Site :{" "}
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      vercel.com
                    </a>
                  </p>
                </CardContent>
              </Card>

              {/* ── 3. AFFILIATION AMAZON ── */}
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle>3. Programme d'affiliation Amazon</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">
                      monappareildemassage.com participe au Programme Partenaires d'Amazon EU
                    </strong>
                    , un programme d'affiliation conçu pour permettre à des sites de percevoir
                    une rémunération grâce à la création de liens vers Amazon.fr.
                  </p>
                  <p>
                    En tant que Partenaire Amazon, certains liens présents sur ce site sont des{" "}
                    <strong className="text-foreground">liens affiliés</strong>. Lorsque vous
                    cliquez sur ces liens et effectuez un achat, nous percevons une commission —{" "}
                    <strong className="text-foreground">
                      sans aucun coût supplémentaire pour vous
                    </strong>
                    .
                  </p>
                  <p>
                    Cette rémunération permet de financer les tests produits, de maintenir le site
                    gratuitement accessible et de produire du contenu éditorial indépendant. Elle
                    n'influence jamais nos recommandations : les produits sont évalués selon des
                    critères objectifs, quelle que soit la commission générée.
                  </p>
                  <p>
                    Les prix affichés sur ce site sont indicatifs et peuvent varier. Nous vous
                    invitons à vérifier le prix en vigueur sur Amazon.fr avant tout achat.
                  </p>
                </CardContent>
              </Card>

              {/* ── 4. CONTENU MÉDICAL ── */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Contenu à caractère médical et de santé</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed space-y-3 text-muted-foreground">
                  <p>
                    Les informations publiées sur ce site concernant les bienfaits du massage,
                    les contre-indications et les recommandations d'utilisation ont un caractère{" "}
                    <strong className="text-foreground">informatif et éducatif uniquement</strong>.
                    Elles ne constituent pas un avis médical et ne se substituent pas à une
                    consultation auprès d'un professionnel de santé qualifié.
                  </p>
                  <p>
                    En cas de douleur persistante, de pathologie diagnostiquée ou de doute sur
                    l'utilisation d'un appareil de massage, nous recommandons de consulter un
                    médecin, un kinésithérapeute ou un rhumatologue avant toute utilisation.
                  </p>
                  <p>
                    Les sources médicales citées dans nos articles (HAS, Ameli.fr, INSERM, VIDAL,
                    publications scientifiques) sont référencées afin de permettre leur
                    vérification indépendante.
                  </p>
                </CardContent>
              </Card>

              {/* ── 5. PROPRIÉTÉ INTELLECTUELLE ── */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Propriété intellectuelle</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed space-y-3 text-muted-foreground">
                  <p>
                    L'ensemble des contenus présents sur ce site (textes, guides, comparatifs,
                    images originales) relève de la législation française et internationale sur
                    le droit d'auteur et la propriété intellectuelle. Tous les droits de
                    reproduction sont réservés.
                  </p>
                  <p>
                    La reproduction totale ou partielle de ces contenus sur tout support
                    électronique est formellement interdite sans autorisation écrite préalable
                    du directeur de la publication.
                  </p>
                  <p>
                    Les images de produits utilisées dans les comparatifs sont issues des
                    programmes d'affiliation Amazon et appartiennent à leurs éditeurs respectifs.
                  </p>
                </CardContent>
              </Card>

              {/* ── 6. DONNÉES PERSONNELLES / RGPD ── */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Données personnelles et RGPD</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed space-y-3 text-muted-foreground">
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et
                    à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de
                    rectification et de suppression des données vous concernant.
                  </p>
                  <p>
                    Ce site peut utiliser des cookies à des fins de mesure d'audience (analytics)
                    et d'affichage de liens affiliés. Aucune donnée personnelle identifiable n'est
                    collectée sans votre consentement explicite.
                  </p>
                  <p>
                    Pour exercer vos droits ou pour toute question relative à vos données
                    personnelles, contactez :{" "}
                    <a
                      href="mailto:houndjojeanjacques82@gmail.com"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                    contact@monappareildemassage.com
                    </a>
                  </p>
                  <p>
                    Pour en savoir plus sur la gestion de vos données, consultez notre{" "}
                    <a
                      href="/politique-confidentialite"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      politique de confidentialité →
                    </a>
                  </p>
                </CardContent>
              </Card>

              {/* ── 7. LIMITATION DE RESPONSABILITÉ ── */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Limitation de responsabilité</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed space-y-3 text-muted-foreground">
                  <p>
                    Les informations contenues sur ce site sont fournies à titre indicatif.
                    monappareildemassage.com s'efforce de maintenir ses contenus à jour mais ne
                    peut garantir l'exactitude, la complétude ou l'actualité de toutes les
                    informations publiées.
                  </p>
                  <p>
                    Le site ne pourra être tenu responsable des dommages directs ou indirects
                    résultant de l'utilisation du site ou des produits recommandés. L'utilisation
                    de tout appareil de massage se fait sous la responsabilité de l'utilisateur.
                  </p>
                  <p>
                    Pour signaler une erreur ou une information inexacte :{" "}
                    <a
                      href="mailto:houndjojeanjacques82@gmail.com"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      contact@monappareildemassage.com
                    </a>
                  </p>
                </CardContent>
              </Card>

              {/* ── 8. DROIT APPLICABLE ── */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Droit applicable</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Le présent site et les modalités de son utilisation sont régis par le droit
                    français. En cas de litige et après échec de toute tentative de résolution
                    amiable, les tribunaux français seront seuls compétents.
                  </p>
                </CardContent>
              </Card>

              {/* Date + liens */}
              <p className="text-center text-xs text-muted-foreground pt-2">
                Dernière mise à jour : 16 mars 2026
              </p>

              <div className="text-center text-sm text-muted-foreground space-x-4 pb-8">
                <a
                  href="/a-propos"
                  className="hover:text-primary underline underline-offset-2"
                >
                  À propos
                </a>
                <span>·</span>
                <a
                  href="/politique-confidentialite"
                  className="hover:text-primary underline underline-offset-2"
                >
                  Politique de confidentialité
                </a>
                <span>·</span>
                <a
                  href="/contact"
                  className="hover:text-primary underline underline-offset-2"
                >
                  Contact
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
