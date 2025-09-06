import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment choisir le bon appareil de massage ?",
      answer:
        "Le choix dépend de vos besoins spécifiques : zone à masser, intensité souhaitée, budget et fréquence d'utilisation. Consultez nos guides d'achat par catégorie pour des recommandations détaillées selon votre profil.",
    },
    {
      question: "Vos recommandations sont-elles fiables ?",
      answer:
        "Absolument ! Tous nos produits sont testés et évalués par notre équipe d'experts selon des critères stricts : efficacité, qualité de construction, rapport qualité-prix, avis clients et garantie. Nous ne recommandons que des produits que nous utiliserions nous-mêmes.",
    },
    {
      question: "Pourquoi les prix peuvent-ils différer de ceux affichés ?",
      answer:
        "Les prix sur Amazon changent fréquemment. Nous mettons à jour nos informations régulièrement, mais nous vous recommandons toujours de vérifier le prix final sur Amazon avant l'achat. Les prix affichés sont indicatifs.",
    },
    {
      question: "Que signifie 'Partenaire Amazon' ?",
      answer:
        "Nous participons au programme d'affiliation Amazon Associates. Cela signifie que nous percevons une petite commission sur les achats effectués via nos liens, sans coût supplémentaire pour vous. Cette commission nous aide à maintenir le site et à continuer nos tests.",
    },
    {
      question: "Proposez-vous un service après-vente ?",
      answer:
        "Nous vous accompagnons dans le choix de votre appareil, mais la garantie et le service après-vente sont gérés directement par Amazon et les fabricants. En cas de problème, contactez directement le vendeur via votre compte Amazon.",
    },
    {
      question: "À quelle fréquence mettez-vous à jour vos recommandations ?",
      answer:
        "Nous révisons nos recommandations mensuellement et ajoutons de nouveaux produits dès qu'ils sortent sur le marché. Nos guides d'achat sont mis à jour trimestriellement pour refléter les dernières innovations et tendances.",
    },
    {
      question: "Les appareils de massage sont-ils sûrs à utiliser ?",
      answer:
        "Les appareils que nous recommandons respectent les normes de sécurité européennes. Cependant, consultez toujours votre médecin avant utilisation si vous avez des problèmes de santé, êtes enceinte ou portez un pacemaker.",
    },
    {
      question: "Quelle est la différence entre un massage manuel et électrique ?",
      answer:
        "Les appareils électriques offrent une intensité constante et peuvent cibler des zones difficiles d'accès. Ils sont parfaits pour un usage régulier et autonome. Le massage manuel reste plus personnalisable mais nécessite plus d'effort et de temps.",
    },
    {
      question: "Comment entretenir mon appareil de massage ?",
      answer:
        "Suivez toujours les instructions du fabricant. En général : nettoyez après chaque usage avec un chiffon humide, évitez l'eau sur les parties électriques, rangez dans un endroit sec et vérifiez régulièrement l'état des câbles.",
    },
    {
      question: "Puis-je utiliser un appareil de massage tous les jours ?",
      answer:
        "Cela dépend du type d'appareil et de l'intensité. Les massages doux peuvent être quotidiens, mais les massages intenses (comme les pistolets de massage) sont recommandés 2-3 fois par semaine maximum. Écoutez votre corps et consultez nos guides d'utilisation.",
    },
    {
      question: "Que faire si un produit recommandé n'est plus disponible ?",
      answer:
        "Nous mettons régulièrement à jour nos recommandations. Si un produit n'est plus disponible, consultez nos alternatives dans la même catégorie ou contactez-nous pour une recommandation personnalisée.",
    },
    {
      question: "Acceptez-vous les suggestions de produits à tester ?",
      answer:
        "Oui ! Nous sommes toujours intéressés par de nouveaux produits à évaluer. Envoyez-nous vos suggestions à contact@monappareildemassage.com avec les détails du produit et pourquoi vous pensez qu'il mérite d'être testé.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Questions Fréquentes</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur nos recommandations et les appareils de massage
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>FAQ - Tout savoir sur nos recommandations</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>Vous ne trouvez pas votre réponse ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Notre équipe d'experts est là pour vous aider à choisir l'appareil de massage parfait pour vos besoins.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="font-semibold">Contactez-nous :</p>
                <p className="text-primary">contact@monappareildemassage.com</p>
                <p className="text-sm text-muted-foreground mt-2">Réponse sous 24-48h • Conseil personnalisé gratuit</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
