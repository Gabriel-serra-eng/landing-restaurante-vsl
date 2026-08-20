"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { submitLead } from "@/app/actions/submitLead";

const formSchema = z.object({
  instagram: z.string().min(2, "Instagram é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  objetivo: z.string().min(1, "Selecione um objetivo"),
  faturamento: z.string().min(1, "Selecione uma faixa"),
  orcamento: z.string().min(1, "Selecione uma opção"),
  midia: z.string().min(1, "Selecione uma opção"),
  decisao: z.string().min(1, "Selecione uma opção"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
});

type FormValues = z.infer<typeof formSchema>;

export function FormWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagram: "",
      cidade: "",
      objetivo: "",
      faturamento: "",
      orcamento: "",
      midia: "",
      decisao: "",
      whatsapp: "",
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1) fieldsToValidate = ["instagram"];
    if (step === 2) fieldsToValidate = ["cidade"];
    if (step === 3) fieldsToValidate = ["objetivo"];
    if (step === 4) fieldsToValidate = ["faturamento"];
    if (step === 5) fieldsToValidate = ["orcamento"];
    if (step === 6) fieldsToValidate = ["midia"];
    if (step === 7) fieldsToValidate = ["decisao"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const eventId = crypto.randomUUID();
      // Pass eventId to fbq here in a real scenario
      const result = await submitLead(data, eventId);
      if (result.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRadioOptions = (name: keyof FormValues, options: string[]) => {
    const selected = watch(name);
    return (
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
              selected === opt
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                : "border-[var(--color-border)] hover:bg-[var(--color-muted)]"
            }`}
          >
            <input
              type="radio"
              className="hidden"
              value={opt}
              {...register(name)}
              onChange={() => {
                setValue(name, opt, { shouldValidate: true });
                setTimeout(handleNext, 300); // Auto-advance
              }}
            />
            <span className="text-base">{opt}</span>
          </label>
        ))}
        {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>}
      </div>
    );
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 border border-[var(--color-primary)] rounded-xl bg-black/50">
        <h2 className="text-3xl font-serif font-bold text-white mb-4">
          Você já pode conhecer como funciona o nosso trabalho.
        </h2>
        <div className="my-8 p-6 bg-[#1E293B] rounded-lg">
          <h3 className="text-xl text-[var(--color-primary)] font-bold mb-2">Produção de conteúdo + Gestão de tráfego pago</h3>
          <p className="text-4xl font-bold text-white mb-4">R$ 2.700<span className="text-lg text-gray-400">/mês</span></p>
          <p className="text-sm text-gray-400">A verba destinada aos anúncios é separada do valor do serviço.</p>
        </div>
        <p className="text-gray-300 mb-6">
          Vamos analisar suas respostas e entender se essa estratégia faz sentido para o seu restaurante.
        </p>
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
            QUERO FALAR COM VOCÊS
          </a>
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="bg-[var(--color-muted)] h-1 w-full">
        <div
          className="h-full bg-[var(--color-primary)] transition-all duration-300"
          style={{ width: `${(step / 8) * 100}%` }}
        />
      </div>
      <CardContent className="p-6 sm:p-10">
        <div className="mb-8">
          <p className="text-sm text-[var(--color-primary)] font-semibold mb-2">Passo {step} de 8</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">Qual é o Instagram do seu restaurante?</h3>
                  <Input placeholder="@seurestaurante" {...register("instagram")} className="text-lg h-14" />
                  {errors.instagram && <p className="text-red-500 text-sm">{errors.instagram.message}</p>}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">Em qual cidade seu restaurante está?</h3>
                  <Input placeholder="Ex: São Paulo, SP" {...register("cidade")} className="text-lg h-14" />
                  {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade.message}</p>}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">O que você mais quer melhorar hoje?</h3>
                  {renderRadioOptions("objetivo", [
                    "Atrair mais pessoas da região",
                    "Melhorar os vídeos e conteúdos",
                    "Fazer o Instagram gerar mais oportunidades",
                    "Já faço marketing, mas quero melhorar os resultados",
                    "Quero começar a investir em marketing"
                  ])}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">Quanto aproximadamente seu restaurante fatura por mês?</h3>
                  {renderRadioOptions("faturamento", [
                    "Até R$ 20 mil",
                    "R$ 20 mil a R$ 40 mil",
                    "R$ 40 mil a R$ 70 mil",
                    "R$ 70 mil a R$ 120 mil",
                    "R$ 120 mil a R$ 200 mil",
                    "Mais de R$ 200 mil"
                  ])}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">Se encontrar uma estratégia que faça sentido, quanto estaria disposto a investir por mês em marketing?</h3>
                  {renderRadioOptions("orcamento", [
                    "Ainda não tenho orçamento definido",
                    "Até R$ 1.500",
                    "R$ 1.500 a R$ 2.500",
                    "R$ 2.500 a R$ 3.500",
                    "R$ 3.500 a R$ 5.000",
                    "Mais de R$ 5.000"
                  ])}
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">Além do serviço, você estaria disposto a investir uma verba mensal nos anúncios?</h3>
                  {renderRadioOptions("midia", [
                    "Sim",
                    "Talvez, dependendo da estratégia",
                    "Ainda não"
                  ])}
                </div>
              )}

              {step === 7 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">Você é responsável pela decisão sobre marketing?</h3>
                  {renderRadioOptions("decisao", [
                    "Sim",
                    "Participo da decisão",
                    "Não"
                  ])}
                </div>
              )}

              {step === 8 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white">Para finalizar, qual é o seu WhatsApp?</h3>
                  <Input type="tel" placeholder="(00) 00000-0000" {...register("whatsapp")} className="text-lg h-14" />
                  {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp.message}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <Button type="button" variant="ghost" onClick={handlePrev} disabled={isSubmitting}>
                Voltar
              </Button>
            )}
            {step < 8 && step < 3 && (
              <Button type="button" onClick={handleNext} className="ml-auto">
                Próximo
              </Button>
            )}
            {step === 8 && (
              <Button type="submit" disabled={isSubmitting} className="ml-auto w-full sm:w-auto">
                {isSubmitting ? "Enviando..." : "Quero Conhecer"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
