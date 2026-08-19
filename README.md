# 🖥️ Computador Fácil - Guia Visual e Inclusivo de Hardware

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com)
[![CI & Build Verification](https://github.com/actions/starter-workflows/actions/workflows/node.js.yml/badge.svg)](https://github.com)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Vite 6](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel Analytics](https://img.shields.io/badge/Vercel-Analytics%20%26%20Speed%20Insights-black?logo=vercel)](https://vercel.com/analytics)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Plataforma interativa e acessível projetada para apresentar o conceito de **Hardware**, **Software**, **Peopleware**, **Periféricos de Entrada/Saída/Mistos**, **Tipos e Custos de Computadores**, e **Montagem Segura com Prevenção Antiestática (ESD)** para iniciantes e pessoas em processo de alfabetização digital.

---

## ⚡ Importação e Publicação Rápida

### 🚀 1. No GitHub
1. Crie um novo repositório vazio no seu GitHub: [github.com/new](https://github.com/new).
2. Execute no terminal:
   ```bash
   git init
   git add .
   git commit -m "feat: Computador Fácil - Versão Inicial Completa"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
3. O fluxo de **GitHub Actions** em `.github/workflows/ci.yml` executará a checagem automática de tipos e compilação do projeto.

---

### ▲ 2. Na Vercel
1. Acesse [vercel.com/new](https://vercel.com/new) e clique em **Import** no repositório criado.
2. As configurações já estão salvas no arquivo `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Routing**: SPA Rewrites para `/index.html` com cabeçalhos de segurança e cache otimizado.
3. Clique em **Deploy**! A Vercel conectará o monitoramento automático do `@vercel/analytics` e `@vercel/speed-insights`.

---

## 📂 Estrutura de Código-Fonte (Leitura de Arquivos)

| Caminho do Arquivo | Função Principal e Leitura |
| :--- | :--- |
| `vercel.json` | Regras de roteamento, compressão, cache imutável e cabeçalhos de segurança na Edge da Vercel. |
| `.github/workflows/ci.yml` | Pipeline de CI/CD para validar builds e testes a cada commit no GitHub. |
| `vite.config.ts` | Configurações do Vite 6, plugins do React 19 e Tailwind CSS v4. |
| `src/App.tsx` | Componente raiz que orquestra os módulos, estado de acessibilidade e provedores da Vercel (`<Analytics />`, `<SpeedInsights />`). |
| `src/data/hardwareContent.ts` | Base de conhecimento estruturada em TypeScript com analogias, peças, periféricos e questões. |
| `src/components/SourceCodeExplorer.tsx` | Leitor e visualizador interativo de código-fonte integrado diretamente no navegador. |
| `src/components/InsideCaseExplorer.tsx` | Visor interativo em Raio-X do gabinete e fluxo de ventilação. |
| `src/components/InteractiveAssemblyGame.tsx` | Simulador gamificado para montagem do computador na ordem correta. |
| `src/components/QuizSection.tsx` | Desafio de fixação com telemetria e feedback sonoro imediato. |
| `src/utils/speech.ts` | Wrapper da **Web Speech API** para narração auditiva em Português do Brasil (`pt-BR`). |
| `src/utils/vercelIntegration.ts` | Leitor de ambiente Vercel e emissor de eventos customizados de telemetria. |

---

## 🛠️ Comandos de Desenvolvimento

```bash
# Instalação das dependências
npm install

# Iniciar servidor local na porta 3000
npm run dev

# Verificação de tipos TypeScript (Lint)
npm run lint

# Compilação otimizada para produção (Vercel / GitHub Pages)
npm run build

# Pré-visualização do pacote compilado
npm run preview
```

---

## 📄 Licença
Distribuído sob a licença [MIT](LICENSE).
