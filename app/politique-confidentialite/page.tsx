import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Politique de Confidentialité</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Collecte des données personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Mon Appareil de Massage s'engage à protéger la vie privée de ses utilisateurs. Cette politique de
                  confidentialité explique quelles informations nous collectons, comment nous les utilisons et vos
                  droits concernant ces données.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Données collectées :</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Données de navigation (pages visitées, durée de visite, appareil utilisé)</li>
                    <li>Adresse email (uniquement si vous nous contactez)</li>
                    <li>Cookies techniques nécessaires au fonctionnement du site</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilisation des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Nous utilisons vos données pour :</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Améliorer l'expérience utilisateur sur notre site</li>
                    <li>Répondre à vos questions et demandes de contact</li>
                    <li>Analyser le trafic et l'utilisation du site (données anonymisées)</li>
                    <li>Assurer la sécurité et le bon fonctionnement du site</li>
                  </ul>
                </div>
                <p>
                  <strong>Nous ne vendons jamais vos données personnelles à des tiers.</strong>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Ces cookies nous
                  permettent de mémoriser vos préférences et d'analyser l'utilisation du site.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Types de cookies utilisés :</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>
                      <strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site
                    </li>
                    <li>
                      <strong>Cookies d'analyse :</strong> Pour comprendre comment vous utilisez notre site
                    </li>
                    <li>
                      <strong>Cookies d'affiliation :</strong> Pour le programme Amazon Associates
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter le
                  fonctionnement du site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partage des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Nous ne partageons vos données personnelles qu'avec :</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    <strong>Notre hébergeur (o2switch) :</strong> Pour assurer le fonctionnement du site
                  </li>
                  <li>
                    <strong>Services d'analyse (Google Analytics) :</strong> Données anonymisées uniquement
                  </li>
                  <li>
                    <strong>Amazon :</strong> Dans le cadre du programme d'affiliation (données de navigation anonymes)
                  </li>
                </ul>
                <p>Aucune donnée personnelle identifiable n'est transmise à des fins commerciales.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vos droits (RGPD)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits
                  suivants :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>
                    <strong>Droit d'accès :</strong> Connaître les données que nous détenons sur vous
                  </li>
                  <li>
                    <strong>Droit de rectification :</strong> Corriger des données inexactes
                  </li>
                  <li>
                    <strong>Droit à l'effacement :</strong> Demander la suppression de vos données
                  </li>
                  <li>
                    <strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données
                  </li>
                  <li>
                    <strong>Droit à la portabilité :</strong> Récupérer vos données dans un format lisible
                  </li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous à : <strong>contact@monappareildemassage.com</strong>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sécurité des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos
                  données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Chiffrement SSL/TLS pour toutes les communications</li>
                  <li>Hébergement sécurisé chez Vercel</li>
                  <li>Accès limité aux données personnelles</li>
                  <li>Surveillance régulière de la sécurité</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Pour toute question concernant cette politique de confidentialité ou vos données personnelles, vous
                  pouvez nous contacter à :
                </p>
                <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                  <p className="font-semibold">contact@monappareildemassage.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
