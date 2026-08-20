"use client";

import React, { useRef } from "react";
import data from "@/content/data.json";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FormWizard } from "@/components/FormWizard";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingPage() {
  const narrativeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ["start end", "end start"]
  });

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* HERO SECTION */}
      <section className="pt-16 pb-20 px-4 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 text-balance leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {data.hero.headline}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-3xl mb-12 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {data.hero.subheadline}
        </motion.p>

        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <VideoPlayer 
            url={data.vsl.videoUrl} 
            poster={data.vsl.posterUrl} 
            title={data.vsl.title} 
          />
        </motion.div>
      </section>

      {/* NARRATIVE SECTION */}
      <section ref={narrativeRef} className="py-24 px-4 bg-[#111827]">
        <div className="max-w-4xl mx-auto space-y-32">
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary)]">
              {data.narrative.transition}
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="order-2 md:order-1 aspect-square bg-[#1E293B] rounded-2xl border border-[var(--color-border)] flex items-center justify-center p-8 text-center text-gray-500">
              [Image: Placeholder Pratos/Ambiente]
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <h3 className="text-3xl font-bold text-white">{data.narrative.contentTitle}</h3>
              <p className="text-lg text-[var(--color-muted-foreground)]">{data.narrative.contentDescription}</p>
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white">{data.narrative.trafficTitle}</h3>
              <p className="text-lg text-[var(--color-muted-foreground)]">{data.narrative.trafficDescription}</p>
            </div>
            <div className="aspect-square bg-[#1E293B] rounded-2xl border border-[var(--color-border)] flex items-center justify-center p-8 text-center text-gray-500">
              [Image: Placeholder Dashboard Ads]
            </div>
          </motion.div>

        </div>
      </section>

      {/* PORTFOLIO & BENEFITS */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Veja como funciona na prática</h2>
          <p className="text-xl text-[var(--color-muted-foreground)]">Conteúdo e anúncios trabalhando juntos.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24">
          {data.portfolio.map((item, idx) => (
             <div key={item.id} className="aspect-[4/5] rounded-xl bg-[#1E293B] border border-[var(--color-border)] overflow-hidden relative flex flex-col justify-end p-4">
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm p-4 text-center">
                  Placeholder {item.type} {idx + 1}
                </div>
             </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-[#1E293B] rounded-3xl p-8 md:p-12 border border-[var(--color-border)]">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">O que você ganha</h3>
          <ul className="grid sm:grid-cols-2 gap-4">
            {data.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start text-gray-300">
                <span className="text-[var(--color-primary)] mr-3">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-[var(--color-background)] to-black relative">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Quer descobrir se essa estratégia faz sentido para o seu restaurante?</h2>
          <p className="text-lg text-[var(--color-muted-foreground)]">Responda algumas perguntas rápidas. Vamos entender o momento do seu negócio e ver se podemos ajudar.</p>
        </div>

        <FormWizard />
      </section>
    </main>
  );
}
