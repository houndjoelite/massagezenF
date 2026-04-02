import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Retour | MonAppareilDeMassage",
  description:
    "Notre politique de retour — retours gérés par Amazon sous 30 jours.",
};

export default function PolitiqueRetour() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        lineHeight: "1.7",
      }}
    >
      <h1
        style={{
          color: "#1a3a5c",
          borderBottom: "3px solid #e67e22",
          paddingBottom: "12px",
        }}
      >
        Politique de Retour
      </h1>
      <p>Dernière mise à jour : avril 2026</p>

      <h2 style={{ color: "#1a3a5c" }}>1. Fonctionnement des retours</h2>
      <p>
        Les produits présentés sur <strong>monappareildemassage.com</strong> sont
        vendus et expédiés par <strong>Amazon</strong> via notre programme de
        partenariat affilié. Les retours sont donc entièrement gérés par Amazon,
        conformément à leur politique officielle.
      </p>

      <h2 style={{ color: "#1a3a5c" }}>2. Délai de retour</h2>
      <p>
        Vous disposez de <strong>30 jours</strong> à compter de la date de
        réception de votre commande pour retourner un produit, qu&apos;il soit
        défectueux ou non défectueux.
      </p>

      <h2 style={{ color: "#1a3a5c" }}>3. Conditions de retour</h2>
      <ul style={{ paddingLeft: "20px" }}>
        <li>Le produit doit être retourné dans son emballage d&apos;origine</li>
        <li>
          Le produit ne doit pas avoir été endommagé par une mauvaise utilisation
        </li>
        <li>
          Les accessoires et notices fournis doivent être inclus dans le colis de
          retour
        </li>
      </ul>

      <h2 style={{ color: "#1a3a5c" }}>4. Comment initier un retour</h2>
      <ol style={{ paddingLeft: "20px" }}>
        <li>
          Connectez-vous à votre compte Amazon sur{" "}
          <a href="https://www.amazon.fr" style={{ color: "#e67e22" }}>
            amazon.fr
          </a>
        </li>
        <li>
          Accédez à <strong>Mes commandes</strong>
        </li>
        <li>Sélectionnez la commande concernée</li>
        <li>
          Cliquez sur <strong>&quot;Retourner ou remplacer des articles&quot;</strong>
        </li>
        <li>Suivez les instructions pour générer votre étiquette de retour</li>
      </ol>

      <h2 style={{ color: "#1a3a5c" }}>5. Remboursement</h2>
      <p>
        Une fois le retour réceptionné et validé par Amazon, le remboursement est
        effectué sous <strong>3 à 5 jours ouvrés</strong> sur le moyen de paiement
        utilisé lors de l&apos;achat.
      </p>

      <h2 style={{ color: "#1a3a5c" }}>6. Produits défectueux</h2>
      <p>
        Si vous recevez un produit défectueux ou endommagé, vous pouvez initier un
        retour immédiatement sans attendre les 30 jours. Amazon prend en charge les
        frais de retour dans ce cas.
      </p>

      <h2 style={{ color: "#1a3a5c" }}>7. Contact</h2>
      <p>
        Pour toute question relative à un retour, vous pouvez contacter le service
        client Amazon directement sur{" "}
        <a
          href="https://www.amazon.fr/gp/help/customer/display.html"
          style={{ color: "#e67e22" }}
          target="_blank"
          rel="noreferrer"
        >
          cette page
        </a>
        .
      </p>
      <p>
        Pour toute autre question concernant notre site, contactez-nous à :{" "}
        <a
          href="mailto:contact@monappareildemassage.com"
          style={{ color: "#e67e22" }}
        >
          contact@monappareildemassage.com
        </a>
      </p>
    </div>
  );
}
