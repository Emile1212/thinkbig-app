import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Think Big Marketing Agency',
  description:
    'Comment Think Big Marketing Agency recueille, utilise, partage et protège tes renseignements personnels.',
  alternates: { canonical: '/politique-de-confidentialite' },
};

const UPDATED = '11 novembre 2026';
const EMAIL = 'bonjour@wethinkbigmarketing.com';

export default function PrivacyPolicyPage() {
  return (
    <main className="legal dark">
      <div className="legal-wrap">
        <a href="/" className="legal-back">← Retour au site</a>

        <h1>Politique de confidentialité</h1>
        <p className="legal-updated">Dernière mise à jour : {UPDATED}</p>

        <p>
          Think Big Marketing Agency (« Think Big », « nous ») est une agence de publicité basée au
          Québec. Cette politique explique quels renseignements personnels nous recueillons, pourquoi,
          avec qui nous les partageons et quels sont tes droits. Elle s'applique à notre site
          wethinkbigmarketing.com, à nos formulaires (y compris les formulaires de publicités Facebook
          et Instagram) et à nos prises de rendez-vous.
        </p>

        <h2>1. Renseignements que nous recueillons</h2>
        <p>Nous recueillons seulement ce qui est nécessaire pour te répondre et te servir :</p>
        <ul>
          <li>
            <strong>Coordonnées :</strong> nom, adresse courriel, numéro de téléphone, ville et nom de
            ton entreprise.
          </li>
          <li>
            <strong>Informations sur ton entreprise :</strong> les réponses que tu donnes dans nos
            formulaires (secteur, chiffre d'affaires approximatif, budget publicitaire, défis
            marketing, meilleur moment pour te joindre).
          </li>
          <li>
            <strong>Rendez-vous :</strong> la date et l'heure de l'appel que tu réserves.
          </li>
          <li>
            <strong>Données techniques :</strong> pages consultées, type d'appareil et de navigateur,
            recueillies par des témoins (cookies) ou outils de mesure, le cas échéant.
          </li>
        </ul>

        <h2>2. Pourquoi nous les utilisons</h2>
        <ul>
          <li>Te contacter par téléphone, texto ou courriel à la suite de ta demande.</li>
          <li>Planifier et préparer ton appel stratégique.</li>
          <li>Évaluer si nos services correspondent aux besoins de ton entreprise.</li>
          <li>Te transmettre une soumission ou une proposition, si tu en fais la demande.</li>
          <li>Améliorer notre site et mesurer la performance de nos publicités.</li>
        </ul>
        <p>
          Nous ne vendons jamais tes renseignements personnels et nous ne les utilisons pas à d'autres
          fins sans ton consentement.
        </p>

        <h2>3. Consentement</h2>
        <p>
          En remplissant un de nos formulaires ou en réservant un appel, tu consens à ce que nous
          utilisions tes renseignements aux fins décrites ci-dessus. Tu peux retirer ton consentement
          en tout temps en nous écrivant à <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>

        <h2>4. Avec qui nous les partageons</h2>
        <p>
          Tes renseignements sont accessibles seulement aux membres de notre équipe qui en ont besoin.
          Nous faisons aussi appel à des fournisseurs de services qui les traitent pour notre compte,
          uniquement pour les fins prévues :
        </p>
        <ul>
          <li>Meta Platforms (Facebook et Instagram), pour les formulaires de publicités;</li>
          <li>notre outil de prise de rendez-vous (Calendly);</li>
          <li>notre logiciel de gestion de la relation client (CRM) et nos outils de communication;</li>
          <li>notre hébergeur web.</li>
        </ul>
        <p>
          Certains de ces fournisseurs peuvent conserver des données à l'extérieur du Québec,
          notamment aux États-Unis. Dans ce cas, nous nous assurons qu'ils offrent une protection
          adéquate de tes renseignements.
        </p>

        <h2>5. Conservation</h2>
        <p>
          Nous conservons tes renseignements le temps nécessaire pour répondre à ta demande et pour la
          durée de notre relation d'affaires, puis au plus 3 ans après notre dernier échange, sauf si la
          loi exige une durée plus longue. Ils sont ensuite détruits ou anonymisés.
        </p>

        <h2>6. Sécurité</h2>
        <p>
          Nous prenons des mesures raisonnables pour protéger tes renseignements contre la perte, l'accès
          non autorisé et l'utilisation abusive : accès limité, comptes protégés par mot de passe et
          outils reconnus.
        </p>

        <h2>7. Tes droits</h2>
        <p>Conformément aux lois applicables, dont la Loi 25 au Québec, tu peux en tout temps :</p>
        <ul>
          <li>demander l'accès aux renseignements que nous détenons sur toi;</li>
          <li>faire corriger un renseignement inexact ou incomplet;</li>
          <li>demander la suppression de tes renseignements;</li>
          <li>retirer ton consentement ou demander de ne plus être contacté.</li>
        </ul>
        <p>
          Pour exercer un de ces droits, écris-nous à <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Nous te
          répondrons dans un délai de 30 jours.
        </p>

        <h2>8. Témoins (cookies)</h2>
        <p>
          Notre site peut utiliser des témoins et des outils de mesure (comme le pixel Meta) pour
          comprendre comment il est utilisé et mesurer nos publicités. Tu peux les bloquer ou les
          supprimer dans les paramètres de ton navigateur.
        </p>

        <h2>9. Responsable de la protection des renseignements personnels</h2>
        <p>
          Pour toute question ou plainte concernant cette politique ou tes renseignements personnels,
          communique avec le responsable de la protection des renseignements personnels de Think Big :
        </p>
        <p>
          Think Big Marketing Agency
          <br />
          Courriel : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <p>
          Si tu n'es pas satisfait de notre réponse, tu peux t'adresser à la Commission d'accès à
          l'information du Québec.
        </p>

        <h2>10. Modifications</h2>
        <p>
          Nous pouvons mettre à jour cette politique. La date de la dernière mise à jour est indiquée en
          haut de cette page.
        </p>
      </div>
    </main>
  );
}
