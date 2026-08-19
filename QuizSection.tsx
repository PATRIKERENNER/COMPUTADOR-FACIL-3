import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/hardwareContent';
import { QuizQuestion } from '../types/hardware';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';
import { trackVercelEvent } from '../utils/vercelIntegration';

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredMap, setAnsweredMap] = useState<{ [qId: number]: { optIndex: number; isCorrect: boolean } }>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const isCurrentAnswered = answeredMap[currentQ.id] !== undefined;

  const handleSelectOption = (index: number) => {
    if (isCurrentAnswered) return;

    const opt = currentQ.options[index];
    setSelectedOptionIndex(index);

    const isCorrect = opt.isCorrect;
    if (isCorrect) {
      sounds.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      sounds.playBuzzer();
    }

    setAnsweredMap((prev) => ({
      ...prev,
      [currentQ.id]: { optIndex: index, isCorrect },
    }));
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsFinished(true);
      sounds.playSuccess();
      trackVercelEvent('conclusao_quiz_informatica', {
        pontuacao_final: score,
        total_questoes: QUIZ_QUESTIONS.length,
        aproveitamento_percentual: Math.round((score / QUIZ_QUESTIONS.length) * 100),
      });
    }
  };

  const handleResetQuiz = () => {
    sounds.playPop();
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setAnsweredMap({});
    setIsFinished(false);
  };

  const handleReadQuestion = () => {
    sounds.playPop();
    speech.speak(
      `Pergunta ${currentIndex + 1}: ${currentQ.question}. Opção 1: ${currentQ.options[0].text}. Opção 2: ${currentQ.options[1].text}. Opção 3: ${currentQ.options[2].text}.`
    );
  };

  return (
    <section id="quiz" className="py-12 sm:py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Desafio Rápido • Fixação do Conhecimento
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
            Quiz Interativo de Informática Básica
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Veja o quanto você aprendeu! Perguntas simples com respostas comentadas na hora.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 sm:p-8">
          
          {!isFinished ? (
            <div>
              {/* Question Header Status */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs font-bold text-slate-500">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                  Questão {currentIndex + 1} de {QUIZ_QUESTIONS.length}
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-emerald-700 font-extrabold">
                    Pontos: {score}
                  </span>
                  <button
                    onClick={handleReadQuestion}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Ouvir a pergunta e opções"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="mt-6 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl sm:text-4xl">{currentQ.illustration}</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 font-heading leading-snug">
                    {currentQ.question}
                  </h3>
                </div>
              </div>

              {/* Options Grid */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = isCurrentAnswered && answeredMap[currentQ.id].optIndex === idx;
                  const isCorrect = opt.isCorrect;

                  let btnStyle = 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-800';
                  if (isCurrentAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-200';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isCurrentAnswered}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm md:text-base leading-relaxed">
                          {opt.text}
                        </span>
                      </div>

                      {isCurrentAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isCurrentAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Callout after answering */}
              {isCurrentAnswered && (
                <div className="mt-5 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 animate-fadeIn">
                  <span className="text-xs font-bold uppercase text-indigo-900 block mb-1">
                    {answeredMap[currentQ.id].isCorrect ? '🎉 Resposta Correta!' : '💡 Explicação:'}
                  </span>
                  <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                    {currentQ.options.find((o) => o.isCorrect)?.explanation}
                  </p>
                </div>
              )}

              {/* Next Question Navigation */}
              {isCurrentAnswered && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
                  >
                    <span>{currentIndex === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultado Final 🏆' : 'Próxima Pergunta'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl mb-4 shadow-xs">
                🏆
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Quiz Concluído com Sucesso!
              </h3>

              <p className="text-base text-slate-600 mt-2">
                Você acertou <strong className="text-emerald-600 text-xl">{score}</strong> de <strong>{QUIZ_QUESTIONS.length}</strong> perguntas!
              </p>

              <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs sm:text-sm text-slate-700 font-medium">
                {score === QUIZ_QUESTIONS.length
                  ? '🌟 Perfeito! Você dominou 100% dos conceitos de hardware, periféricos e montagem segura!'
                  : score >= 4
                  ? '👏 Muito bem! Você já compreende a essência de como o computador e seus componentes funcionam.'
                  : '💪 Bom esforço! Vale a pena dar mais uma olhada nas explicações visuais e tentar de novo.'}
              </div>

              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Fazer o Quiz Novamente</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
