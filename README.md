# Plano de Impacto Social — Associação Marica Talentos

Projeto acadêmico (UFSC / EPS2351) para elaboração de um modelo estruturado de monitoramento e avaliação de impacto social, esportivo e familiar da Associação Marica Talentos.

Este repositório contém a **Estrutura Analítica do Projeto (EAP)** e uma **visualização interativa** em React + TypeScript.

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Build para deploy

```bash
npm run build
npm run preview
```

O build estático é gerado em `dist/` e pode ser publicado em Vercel, Netlify ou GitHub Pages.

## Estrutura Analítica do Projeto (EAP)

**1. Iniciação e planejamento**
- 1.1 Reunião de kick-off com a ONG (presencial)
- 1.2 Elaboração e assinatura do termo de abertura / confidencialidade

**2. Diagnóstico organizacional**
- 2.1 Levantamento do contexto e das atividades da ONG
- 2.2 Mapeamento da situação atual (ausência de indicadores)

**3. Modelagem de indicadores**
- 3.1 Indicadores Sociais
  - 3.1.1 Ficha NPS de satisfação (escala 0–10)
  - 3.1.2 Taxa de retenção escolar
- 3.2 Indicadores Esportivos
  - 3.2.1 Ficha técnica diária do aluno (evolução técnica/comportamental)
  - 3.2.2 % Presença e pontualidade nos treinos
- 3.3 Indicadores de Engajamento Familiar
  - 3.3.1 NPS Familiar (formulário periódico)
  - 3.3.2 Protocolo da reunião semestral de acompanhamento
- 3.4 Fichas técnicas dos indicadores (documentação completa de cada ind.)

**4. Sistema de acompanhamento**
- 4.1 Fluxo de coleta e armazenamento de dados
  - 4.1.1 Processo de coleta (formulários gratuitos)
  - 4.1.2 Requisitos básicos para dashboard futuro
- 4.2 Modelo de relatório de impacto para prestação de contas
  - 4.2.1 Estrutura do relatório
  - 4.2.2 Critérios de avaliação de eficácia contínua

**5. Entrega e encerramento**
- 5.1 Capacitação do cliente (como interpretar os indicadores)
- 5.2 Apresentação na Banca Final e entrega do Relatório Técnico

## Nota de escopo

Esta EAP cobre as etapas de planejamento e modelagem do Plano de Impacto Social. Estão fora do escopo: execução em campo, monitoramento operacional com as crianças, implementação de softwares pagos e compra de equipamentos de TI.
