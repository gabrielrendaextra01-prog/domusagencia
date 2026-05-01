/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Smartphone, 
  MessageCircle, 
  Menu, 
  X, 
  AlertCircle,
  BarChart3,
  Globe,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';

// --- Types ---
interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepProps {
  number: string;
  title: string;
  description: string;
}

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  metric: string;
  image: string;
}

// --- Components ---

const Benefit = ({ icon, title, description }: BenefitProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="p-8 bg-surface border border-white/5 hover:border-brand/40 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-brand/30 group-hover:bg-brand transition-colors"></div>
    <div className="text-brand mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-black uppercase tracking-tighter italic mb-3">{title}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Step = ({ number, title, description }: StepProps) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-12 pb-12 border-l border-white/10 last:border-0 last:pb-0"
  >
    <div className="absolute left-[-11px] top-0 w-5 h-5 bg-brand flex items-center justify-center text-[10px] font-black text-black italic">
      {number}
    </div>
    <h3 className="text-lg font-bold uppercase tracking-tight mb-2 italic">{title}</h3>
    <p className="text-white/50 text-sm">{description}</p>
  </motion.div>
);

const Testimonial = ({ name, role, content, metric, image }: TestimonialProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03 }}
    className="p-8 bg-surface border border-white/5 flex flex-col justify-between"
  >
    <div>
      <p className="text-white/80 italic text-lg leading-snug mb-8">"{content}"</p>
      <div className="flex items-center gap-4 mb-6">
        <img src={image} alt={name} className="w-10 h-10 rounded-none grayscale border border-white/10" referrerPolicy="no-referrer" />
        <div>
          <h4 className="font-bold text-sm uppercase tracking-tight">{name}</h4>
          <p className="text-[10px] uppercase tracking-widest text-white/40">{role}</p>
        </div>
      </div>
    </div>
    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Resultado Real:</span>
      <span className="text-xl font-black italic text-brand">{metric}</span>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = "https://i.imgur.com/xTD827V.png";
  const whatsappLink = "https://wa.me/5519983935731?text=Olá! Gostaria de um orçamento para uma Landing Page de alta conversão.";

  return (
    <div ref={containerRef} className="min-h-screen bg-surface-dark text-light selection:bg-brand selection:text-black">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[100] origin-left"
        style={{ scaleX }}
      />
      
      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-surface-dark/95 border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Domus Page" className="h-10 w-auto" referrerPolicy="no-referrer" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#problema" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">A Metodologia</a>
            <a href="#resultados" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Portfólio</a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-brand pb-1 hover:text-brand transition-all"
            >
              Falar com Especialista
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-40 bg-surface-dark pt-24 px-6 md:hidden flex flex-col gap-8 text-center"
          >
            <a href="#problema" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic italic tracking-tighter">O Método</a>
            <a href="#processo" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic tracking-tighter">Ciclo</a>
            <a href="#resultados" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic tracking-tighter">Cases</a>
            <a href={whatsappLink} className="bg-brand text-black py-5 text-xl font-black uppercase">Começar Agora</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Modern Background Accents */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-brand/20 blur-[120px] rounded-full pointer-events-none"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-start relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-7"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-brand mb-6 border-l-2 border-brand pl-3 overflow-hidden whitespace-nowrap"
            >
              Performance e Conversão
            </motion.div>
            <h1 className="text-[40px] md:text-8xl font-black leading-[1.1] md:leading-[0.9] tracking-tighter uppercase italic mb-8">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="block"
              >Pare de queimar </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-brand block"
              >ROI</motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="block"
              >com sites que <br className="hidden md:block" /> não vendem.</motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-white/70 leading-relaxed mb-10 max-w-xl"
            >
              Transformamos seu tráfego em lucro real. Criamos Landing Pages de alta performance com <span className="text-white font-bold">Arquitetura de Conversão</span> validada para negócios que buscam escala.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto bg-brand/90 backdrop-blur-md text-black px-10 py-6 text-xl font-black uppercase italic tracking-tighter rounded-2xl transition-all text-center flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(226,255,0,0.2)] hover:shadow-[0_0_50px_rgba(226,255,0,0.4)] border border-white/20"
              >
                <div className="relative flex items-center justify-center">
                  <MessageCircle size={24} fill="currentColor" />
                  <Smartphone size={10} className="absolute text-black" fill="black" />
                </div>
                Quero Minha Página Lucrativa
              </motion.a>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold leading-tight">
                Vagas limitadas para <br/> projetos exclusivos este mês
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="md:col-span-5 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface p-8 border border-white/5"
              >
                <div className="text-5xl font-black italic text-brand">+35%</div>
                <div className="text-[10px] uppercase tracking-widest font-bold mt-2 text-white/50">Conversão Média</div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-surface p-8 border border-white/5"
              >
                <div className="text-5xl font-black italic text-brand">1.2s</div>
                <div className="text-[10px] uppercase tracking-widest font-bold mt-2 text-white/50">Carregamento</div>
              </motion.div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="mt-4 bg-surface p-10 border border-white/5 relative overflow-hidden group shadow-2xl"
            >
               <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8 underline decoration-brand underline-offset-4 italic">Engenharia Domus</div>
               <div className="space-y-4">
                  {[
                    "AIDA Framework",
                    "Copywriting Agressivo",
                    "Mobile-First UI"
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + (i * 0.1) }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 size={16} className="text-brand" />
                      <span className="text-xs font-bold uppercase tracking-tight text-white/80">{text}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- PROBLEMA --- */}
      <section id="problema" className="py-24 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-8"
          >
            <h2 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 leading-tight">
              70% dos seus leads abandonam <br/> páginas <span className="text-brand">lentas e genéricas.</span>
            </h2>
            <p className="text-white/50 text-lg uppercase tracking-tight font-medium">Cada segundo de delay custa faturamento real do seu bolso.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:col-span-4 flex justify-end"
          >
            <div className="w-20 h-20 border-2 border-brand flex items-center justify-center text-brand animate-spin-slow">
              <Zap size={32} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- AGITAÇÃO / SOLUÇÃO MIX --- */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="border-l-4 border-brand pl-8 py-4">
              <h3 className="text-brand font-black uppercase text-xs tracking-[0.4em] mb-4">O Problema</h3>
              <p className="text-white/70 leading-relaxed">Sites genéricos não convertem tráfego qualificado. Se você investe em anúncios mas não tem uma oferta irresistível, está apenas premiando o Zuckerberg.</p>
            </div>
            <div className="bg-white/5 p-10 relative">
               <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 italic italic underline decoration-brand underline-offset-4">Consequências Diretas</h4>
               <ul className="space-y-4 text-sm font-bold uppercase tracking-tight text-white/80">
                 <li className="flex gap-3 text-red-500/80"><X size={14} /> ROI Negativo no Tráfego</li>
                 <li className="flex gap-3 text-red-500/80"><X size={14} /> Leads desqualificados</li>
                 <li className="flex gap-3 text-red-500/80"><X size={14} /> Escala de Vendas Travada</li>
               </ul>
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              A dominação digital exige <br/><span className="text-brand">exclusividade técnica.</span>
            </h3>
            <p className="text-white/50 mb-10 leading-relaxed">Nós não fazemos sites. Nós construímos máquinas de vendas otimizadas para converter cada real investido no maior lucro possível.</p>
            <div className="grid grid-cols-1 gap-4 mt-8">
               {[
                 {
                   title: "Método de Copy Híbrido",
                   desc: "Fusão estratégica entre gatilhos de venda agressiva e narrativa sofisticada para converter sem parecer um anúncio."
                 },
                 {
                   title: "Infraestrutura Ultra Veloz",
                   desc: "Páginas codificadas para carregar em menos de 1.2s. Cada segundo de atraso derruba sua conversão em até 7%."
                 },
                 {
                   title: "UI Focada em Decisão",
                   desc: "Design de alta autoridade que elimina distrações e guia o olhar do lead exatamente para o botão de ação."
                 }
               ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`border-b border-white/5 transition-all duration-300 overflow-hidden ${expandedIndex === i ? 'bg-white/[0.02] -mx-4 px-4' : ''}`}
                  >
                    <button 
                      onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                      className="w-full py-6 flex justify-between items-center group cursor-pointer text-left"
                    >
                      <span className={`font-black uppercase tracking-widest text-sm transition-colors italic ${expandedIndex === i ? 'text-brand' : 'group-hover:text-brand'}`}>
                        {item.title}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedIndex === i ? 90 : 0 }}
                        className={expandedIndex === i ? 'text-brand' : 'text-white/20'}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <p className="pb-8 text-white/50 text-sm leading-relaxed max-w-lg">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFICIOS (GRID) --- */}
      <section className="py-24 bg-surface-dark relative overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-wrap gap-20 p-20"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-9xl font-black italic select-none">DOMUS</div>
          ))}
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-1 relative z-10">
          <Benefit 
            icon={<Target size={32} />} 
            title="Copy Estratégico"
            description="Escrita persuasiva baseada em gatilhos mentais de alto impacto emocional e lógico."
          />
          <Benefit 
            icon={<Zap size={32} />} 
            title="Lighthouse 99+"
            description="Carregamento em menos de 1.2 segundos para garantir retenção máxima do usuário."
          />
          <Benefit 
            icon={<BarChart3 size={32} />} 
            title="Foco em Dados"
            description="Desenvolvimento orientado a métricas. Cada botão e cor tem um propósito de conversão."
          />
        </div>
      </section>

      {/* --- COMO FUNCIONA (EDITORIAL DESIGN) --- */}
      <section id="processo" className="py-24 border-t border-white/5 bg-surface/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <h2 className="text-[32px] md:text-5xl font-black uppercase italic tracking-tighter leading-none">
              Ciclo de Performance <br/><span className="text-brand">Domus Page</span>
            </h2>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold border border-white/10 px-4 py-2">
              Iteração Semanal
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-8">
            {[
              { n: "01", t: "Diagnóstico", d: "Mapeamento de funil e identificação de gargalos de conversão." },
              { n: "02", t: "Arquitetura", d: "Criação da narrativa de vendas e hierarquia de informação." },
              { n: "03", t: "Design/Code", d: "Interface mobile-first com codificação limpa e otimizada." },
              { n: "04", t: "Escala", d: "Página no ar pronta para receber tráfego e gerar faturamento." }
            ].map((step, i) => (
              <div key={i} className="space-y-6">
                <span className="text-5xl font-black italic text-brand opacity-20">{step.n}</span>
                <h4 className="text-lg font-black uppercase tracking-tight italic underline decoration-brand/30 underline-offset-4">{step.t}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESULTADOS --- */}
      <section id="resultados" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 self-center text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-6">
              O que diz quem <br/> <span className="text-brand font-black">domina</span> o mercado.
            </h2>
            <p className="text-white/40 text-sm italic">Provas reais de negócios que escalaram com nossa metodologia.</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Testimonial 
              name="Ricardo Santos"
              role="Infoprodutor"
              content="Minha conversão subiu de 2% para 11%. A copy da Domus é outro nível."
              metric="+250% ROAS"
              image="https://i.pravatar.cc/100?img=12"
            />
            <Testimonial 
              name="Dra. Marina Costa"
              role="Owner Clínica"
              content="O WhatsApp não parou mais. Leads qualificados que chegam prontos para comprar."
              metric="85 Leads/mês"
              image="https://i.pravatar.cc/100?img=25"
            />
          </div>
        </div>
      </section>

      {/* --- OFERTA FINAL --- */}
      <section className="py-24 md:py-32 bg-brand text-black overflow-hidden relative">
        <div className="absolute top-[-10%] right-[-10%] text-[200px] md:text-[300px] font-black italic opacity-5 pointer-events-none uppercase tracking-tighter">
          DOMUS
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-[36px] md:text-8xl font-black uppercase italic tracking-tighter leading-[0.95] md:leading-[0.85] mb-10">
            Pronto para ver seus <br/> lucros <span className="underline decoration-black underline-offset-4 md:underline-offset-8">dispararem?</span>
          </h2>
          <p className="text-lg md:text-xl font-bold uppercase tracking-tight mb-12 max-w-2xl mx-auto opacity-80">
            Últimas 3 vagas disponíveis para implementação estratégica este mês. Não deixe seu ROI virar custo.
          </p>
          
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6 bg-brand backdrop-blur-md text-black px-10 md:px-16 py-6 md:py-8 text-xl md:text-2xl font-black uppercase italic tracking-tighter rounded-2xl transition-transform shadow-[0_0_30px_rgba(226,255,0,0.3)] border border-white/20 animate-neon-pulse"
          >
            Falar com Especialista
            <div className="relative flex items-center justify-center">
              <MessageCircle size={32} fill="currentColor" />
              <Smartphone size={14} className="absolute text-black" fill="black" />
            </div>
          </motion.a>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-16 border-t border-white/5 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Domus Page" className="h-8 w-auto" referrerPolicy="no-referrer" />
              </div>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest max-w-xs leading-relaxed">
                Framework PAS (Problema, Agitação, Solução) + Escassez Real + Prova Social Quantitativa.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6">Menu</h5>
                <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-white/60">
                  <li><a href="#" className="hover:text-brand transition-colors">Intro</a></li>
                  <li><a href="#problema" className="hover:text-brand transition-colors">Método</a></li>
                  <li><a href="#processo" className="hover:text-brand transition-colors">Cases</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6">Social</h5>
                <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-white/60">
                  <li><a href="https://www.instagram.com/domuspages/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">Instagram</a></li>
                  <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">WhatsApp</a></li>
                </ul>
              </div>
              <div className="hidden md:block">
                 <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    <span className="text-[10px] text-white/50 italic font-bold uppercase tracking-widest">99/100 PageSpeed</span>
                 </div>
                 <p className="text-[8px] text-white/20 uppercase tracking-[0.2em]">Validated for Conversion</p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold text-white/20">
            <div>© 2024 Domus Page • Built for performance</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white/40">Privacy Policy</a>
              <a href="#" className="hover:text-white/40">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Widget */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-3 group">
        <div className="bg-white text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 shadow-xl border border-slate-100">
          Como podemos ajudar?
        </div>
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand text-black w-14 h-14 flex items-center justify-center rounded-full border-4 border-black hover:scale-110 active:scale-95 transition-all shadow-2xl relative animate-neon-pulse"
        >
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black z-10"></div>
          <div className="relative flex items-center justify-center">
            <MessageCircle size={32} fill="currentColor" />
            <Smartphone size={14} className="absolute text-black" fill="black" />
          </div>
        </a>
      </div>
    </div>
  );
}
