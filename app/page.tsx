// Landing Page de Lumina Invoice
// Design premium pour attirer et convertir les visiteurs

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-hidden">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0f1e]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              ⚡
            </div>
            <span className="font-bold text-white">Lumina</span>
            <span className="font-bold text-blue-400">Invoice</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition">Fonctionnalités</a>
            <a href="#how" className="hover:text-white transition">Comment ça marche</a>
            <a href="#pricing" className="hover:text-white transition">Tarifs</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm text-slate-400 hover:text-white transition px-4 py-2"
            >
              Connexion
            </Link>
            <Link
              href="/sign-up"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Cercles lumineux en arrière-plan */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Solution SaaS pour freelances internationaux
          </div>

          {/* Titre */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Vos factures,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              professionnelles
            </span>
            <br />
            et sans effort
          </h1>

          {/* Sous-titre */}
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Créez, envoyez et suivez vos factures en quelques clics.
            Multi-devises, génération PDF automatique, tableau de bord complet.
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/sign-up"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl transition text-lg font-medium shadow-lg shadow-blue-600/25"
            >
              Commencer gratuitement →
            </Link>
            <Link
              href="/sign-in"
              className="text-slate-400 hover:text-white px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 transition text-lg"
            >
              Se connecter
            </Link>
          </div>

          <p className="text-sm text-slate-600 mt-4">
            Gratuit pour commencer · Aucune carte bancaire requise
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="max-w-5xl mx-auto mt-20 relative">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            {/* Fausse barre de navigateur */}
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 bg-white/5 rounded-md h-6 ml-2" />
            </div>

            {/* Faux dashboard */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Revenus", value: "12,450€", color: "text-green-400" },
                { label: "En attente", value: "3,200€", color: "text-yellow-400" },
                { label: "En retard", value: "800€", color: "text-red-400" },
                { label: "Factures", value: "24", color: "text-blue-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Faux tableau */}
            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-white/5">
                {["Numéro", "Client", "Statut", "Montant", "Échéance"].map((h) => (
                  <p key={h} className="text-xs text-slate-500 font-medium">{h}</p>
                ))}
              </div>
              {[
                { num: "INV-2026-003", client: "Agence Dupont", status: "Payée", statusColor: "bg-green-500/20 text-green-400", amount: "2,400€" },
                { num: "INV-2026-002", client: "StartupXYZ", status: "En attente", statusColor: "bg-yellow-500/20 text-yellow-400", amount: "1,800€" },
                { num: "INV-2026-001", client: "Tech Corp", status: "Brouillon", statusColor: "bg-slate-500/20 text-slate-400", amount: "3,200€" },
              ].map((row) => (
                <div key={row.num} className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition">
                  <p className="text-xs text-blue-400 font-medium">{row.num}</p>
                  <p className="text-xs text-slate-300">{row.client}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${row.statusColor}`}>{row.status}</span>
                  <p className="text-xs text-white font-semibold">{row.amount}</p>
                  <p className="text-xs text-slate-500">30/04/2026</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lueur sous le dashboard */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-600/20 blur-2xl rounded-full" />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-white mb-2">5+</p>
            <p className="text-slate-500">Devises supportées</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">PDF</p>
            <p className="text-slate-500">Généré automatiquement</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">100%</p>
            <p className="text-slate-500">Données sécurisées</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wide">
              Fonctionnalités
            </p>
            <h2 className="text-4xl font-bold text-white mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Une suite complète d'outils pensée pour les freelances modernes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🧾", title: "Factures professionnelles", desc: "Créez des factures numérotées automatiquement avec votre logo, adresse et coordonnées bancaires." },
              { icon: "🌍", title: "Multi-devises", desc: "Facturez en USD, EUR, GBP, XOF et plus. Chaque facture conserve sa devise d'origine." },
              { icon: "📄", title: "Export PDF automatique", desc: "Téléchargez vos factures en PDF professionnel en un clic, prêtes à être envoyées." },
              { icon: "📊", title: "Dashboard analytique", desc: "Visualisez vos revenus mensuels, montants en attente et factures en retard." },
              { icon: "👥", title: "Gestion des clients", desc: "Répertoire complet avec devise par défaut par client pour aller plus vite." },
              { icon: "🔒", title: "Sécurisé et fiable", desc: "Authentification moderne, données chiffrées et hébergement cloud haute disponibilité." },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-blue-500/30 transition group"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="py-24 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wide">
              Comment ça marche
            </p>
            <h2 className="text-4xl font-bold text-white mb-4">
              3 étapes, c'est tout
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Créez votre profil", desc: "Renseignez les informations de votre entreprise une seule fois. Elles apparaîtront sur toutes vos factures." },
              { step: "2", title: "Ajoutez vos clients", desc: "Créez votre répertoire de clients avec leur devise par défaut pour facturer rapidement." },
              { step: "3", title: "Créez et envoyez", desc: "Générez votre facture en quelques clics, téléchargez le PDF et envoyez-le à votre client." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-blue-600/25">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wide">
            Tarifs
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Simple et transparent
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            Commencez gratuitement, évoluez selon vos besoins
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Gratuit */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
              <p className="text-sm font-medium text-slate-400 mb-2">Gratuit</p>
              <p className="text-4xl font-bold text-white mb-1">0€</p>
              <p className="text-slate-500 text-sm mb-6">Pour toujours</p>
              <ul className="flex flex-col gap-3 text-sm text-slate-400 mb-8">
                {["Jusqu'à 5 clients", "Jusqu'à 10 factures/mois", "Export PDF", "Multi-devises"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="block text-center border border-white/10 text-slate-300 hover:bg-white/5 px-6 py-2.5 rounded-lg transition text-sm font-medium"
              >
                Commencer gratuitement
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-blue-600 rounded-2xl p-8 text-left relative overflow-hidden shadow-xl shadow-blue-600/25">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium">
                Populaire
              </div>
              <p className="text-sm font-medium text-blue-200 mb-2">Pro</p>
              <p className="text-4xl font-bold text-white mb-1">9€</p>
              <p className="text-blue-200 text-sm mb-6">par mois</p>
              <ul className="flex flex-col gap-3 text-sm text-blue-100 mb-8">
                {["Clients illimités", "Factures illimitées", "Export PDF personnalisé", "Dashboard avancé", "Support prioritaire"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-white">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="block text-center bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-lg transition text-sm font-medium"
              >
                Commencer l'essai gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prêt à professionnaliser
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              votre facturation ?
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Rejoignez les freelances qui font confiance à Lumina Invoice.
          </p>
          <Link
            href="/sign-up"
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl transition text-lg font-medium shadow-lg shadow-blue-600/25"
          >
            Commencer gratuitement →
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-slate-600">
          <p>⚡ Lumina Invoice — Facturation simplifiée</p>
          <p>© 2026 Lumina Invoice. Tous droits réservés.</p>
        </div>
      </footer>

    </div>
  );
}