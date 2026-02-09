export default function WhyChooseUs() {
  const benefits = [
    { icon: "📚", title: "Método Focado", description: "Conteúdo focado no que realmente cai nas provas da área da educação, sem enrolação." },
    { icon: "📖", title: "Material Apostilado", description: "Informações direto ao ponto com material apostilado de qualidade." },
    { icon: "🎥", title: "Vídeo Aulas", description: "Videoaulas conforme o curso adquirido para melhor aprendizado." },
    { icon: "✅", title: "Certificado com QR Code", description: "Certificado com QRCODE necessário para qualquer seletivo, prova de título." },
    { icon: "⚡", title: "Acesso Rápido", description: "Material e certificado liberado em 24 horas após conclusão." },
    { icon: "💳", title: "Pagamento Facilitado", description: "Pagamento facilitado via PIX para sua conveniência." },
  ];

  return (
    <section id="sobre" className="py-16 mb-12">
      <div className="bg-white rounded-2xl shadow-lg p-10 border border-amber-100">
        <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Por que escolher a Vecchiato Assessoria Educacional?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-3 text-lg">{benefit.icon} {benefit.title}</h3>
              <p className="text-stone-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
