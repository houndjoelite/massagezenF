import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Mentions Légales</h1>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Éditeur du site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Nom du site :</h4>
                  <p>Mon Appareil de Massage</p>
                </div>
                <div>
                  <h4 className="font-semibold">URL :</h4>
                  <p>www.monappareildemassage.com</p>
                </div>
                <div>
                  <h4 className="font-semibold">Contact :</h4>
                  <p>contact@monappareildemassage.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hébergement</CardTitle>
              </CardHeader>
              <CardContent>
<p>Ce site est hébergé par o2switch, 222-224 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la
                  propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                  téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
                  formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Programme d'affiliation Amazon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions
                  requises.
                </p>
                <p>
                  Ce site participe au Programme Partenaires d'Amazon EU, un programme d'affiliation conçu pour
                  permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.fr.
                </p>
                <p>
                  Les prix affichés peuvent ne pas être à jour. Nous vous invitons à vérifier le prix sur Amazon avant
                  tout achat.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation de responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à
                  différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
                </p>
                <p>
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir
                  le signaler par email à contact@monappareildemassage.com.
                </p>
                <p>
                  L'utilisateur du site s'engage à accéder au site en utilisant un matériel récent, ne contenant pas de
                  virus et avec un navigateur de dernière génération mis-à-jour.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Droit applicable</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit
                  français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de
                  toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents
                  pour connaître de ce litige.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
