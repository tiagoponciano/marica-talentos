export interface EapNode {
  code: string;
  name: string;
  description: string;
  children?: EapNode[];
}

export const PROJECT_TITLE =
  "Plano de Impacto Social — Associação Marica Talentos";

export const PROJECT_DESCRIPTION =
  "Projeto acadêmico (UFSC / EPS2351) para elaboração de um modelo estruturado de monitoramento e avaliação de impacto social, esportivo e familiar da Associação Marica Talentos.";

export const SCOPE_NOTE =
  "Esta EAP cobre as etapas de planejamento e modelagem do Plano de Impacto Social. Estão fora do escopo: execução em campo, monitoramento operacional com as crianças, implementação de softwares pagos e compra de equipamentos de TI.";

export const eapRoot: EapNode = {
  code: "0",
  name: PROJECT_TITLE,
  description: PROJECT_DESCRIPTION,
  children: [
    {
      code: "1",
      name: "Iniciação e planejamento",
      description:
        "Atividades iniciais de alinhamento com a ONG e formalização do projeto acadêmico.",
      children: [
        {
          code: "1.1",
          name: "Reunião de kick-off com a ONG (presencial)",
          description:
            "Encontro presencial para apresentar a equipe, entender o contexto da associação, alinhar expectativas e validar o escopo do Plano de Impacto Social.",
        },
        {
          code: "1.2",
          name: "Elaboração e assinatura do termo de abertura / confidencialidade",
          description:
            "Formalização do início do projeto e, se necessário, acordo de confidencialidade para tratamento dos dados da organização.",
        },
      ],
    },
    {
      code: "2",
      name: "Diagnóstico organizacional",
      description:
        "Levantamento do contexto atual da ONG e identificação de lacunas na gestão de resultados.",
      children: [
        {
          code: "2.1",
          name: "Levantamento do contexto e das atividades da ONG",
          description:
            "Mapeamento do público atendido, rotina de treinos, estrutura da equipe e principais desafios enfrentados pela Associação Marica Talentos.",
        },
        {
          code: "2.2",
          name: "Mapeamento da situação atual (ausência de indicadores)",
          description:
            "Identificação de como a ONG acompanha resultados hoje e quais lacunas existem na coleta, análise e prestação de contas de impacto.",
        },
      ],
    },
    {
      code: "3",
      name: "Modelagem de indicadores",
      description:
        "Definição e documentação dos indicadores sociais, esportivos e familiares.",
      children: [
        {
          code: "3.1",
          name: "Indicadores Sociais",
          description:
            "Indicadores voltados ao impacto social do programa junto aos beneficiários.",
          children: [
            {
              code: "3.1.1",
              name: "Ficha NPS de satisfação (escala 0–10)",
              description:
                "Formulário de satisfação com escala de 0 a 10. Promotores (8–10), neutros (6–7) e detratores (0–5). Cálculo: % promotores − % detratores.",
            },
            {
              code: "3.1.2",
              name: "Taxa de retenção escolar",
              description:
                "Indicador de permanência e engajamento escolar dos jovens participantes do programa.",
            },
          ],
        },
        {
          code: "3.2",
          name: "Indicadores Esportivos",
          description:
            "Indicadores de desempenho técnico, comportamental e frequência nos treinos.",
          children: [
            {
              code: "3.2.1",
              name: "Ficha técnica diária do aluno (evolução técnica/comportamental)",
              description:
                "Registro diário da evolução de cada aluno, com premiação dos três que mais evoluíram coletiva e tecnicamente ao final do semestre.",
            },
            {
              code: "3.2.2",
              name: "% Presença e pontualidade nos treinos",
              description:
                "Percentual de frequência e pontualidade dos alunos nos treinos, por turma e individualmente.",
            },
          ],
        },
        {
          code: "3.3",
          name: "Indicadores de Engajamento Familiar",
          description:
            "Indicadores de participação e satisfação das famílias no acompanhamento dos jovens.",
          children: [
            {
              code: "3.3.1",
              name: "NPS Familiar (formulário periódico)",
              description:
                "Formulário enviado periodicamente às famílias para avaliar como os alunos estão se desenvolvendo em casa e no programa.",
            },
            {
              code: "3.3.2",
              name: "Protocolo da reunião semestral de acompanhamento",
              description:
                "Roteiro, pauta e registro da reunião semestral de acompanhamento dos jovens com suas famílias.",
            },
          ],
        },
        {
          code: "3.4",
          name: "Fichas técnicas dos indicadores (documentação completa de cada ind.)",
          description:
            "Documentação padronizada de cada indicador: fórmula, fonte de dados, periodicidade, responsável e meta.",
        },
      ],
    },
    {
      code: "4",
      name: "Sistema de acompanhamento",
      description:
        "Desenho do fluxo de coleta, armazenamento e prestação de contas dos dados.",
      children: [
        {
          code: "4.1",
          name: "Fluxo de coleta e armazenamento de dados",
          description:
            "Processo de como a ONG coletará, organizará e armazenará os dados dos jovens.",
          children: [
            {
              code: "4.1.1",
              name: "Processo de coleta (formulários gratuitos)",
              description:
                "Definição de ferramentas de baixo custo para coleta, como Google Forms e planilhas.",
            },
            {
              code: "4.1.2",
              name: "Requisitos básicos para dashboard futuro",
              description:
                "Requisitos funcionais e visuais para um painel de métricas a ser implementado futuramente.",
            },
          ],
        },
        {
          code: "4.2",
          name: "Modelo de relatório de impacto para prestação de contas",
          description:
            "Estrutura para comunicar resultados a parceiros e financiadores.",
          children: [
            {
              code: "4.2.1",
              name: "Estrutura do relatório",
              description:
                "Definição das seções, periodicidade e formato do relatório de impacto social.",
            },
            {
              code: "4.2.2",
              name: "Critérios de avaliação de eficácia contínua",
              description:
                "Regras para determinar a eficácia contínua do projeto esportivo com base nos indicadores definidos.",
            },
          ],
        },
      ],
    },
    {
      code: "5",
      name: "Entrega e encerramento",
      description:
        "Transferência de conhecimento e entrega do relatório técnico final.",
      children: [
        {
          code: "5.1",
          name: "Capacitação do cliente (como interpretar os indicadores)",
          description:
            "Mini capacitação para a diretoria da ONG sobre leitura, uso e acompanhamento dos indicadores modelados.",
        },
        {
          code: "5.2",
          name: "Apresentação na Banca Final e entrega do Relatório Técnico",
          description:
            "Apresentação do projeto na banca da disciplina EPS2351 e entrega do relatório técnico definitivo.",
        },
      ],
    },
  ],
};

export function isWorkPackage(node: EapNode): boolean {
  return !node.children || node.children.length === 0;
}

export function flattenNodes(node: EapNode = eapRoot): EapNode[] {
  const nodes: EapNode[] = [node];
  for (const child of node.children ?? []) {
    nodes.push(...flattenNodes(child));
  }
  return nodes;
}

export function findNode(
  code: string,
  node: EapNode = eapRoot,
): EapNode | undefined {
  if (node.code === code) return node;
  for (const child of node.children ?? []) {
    const found = findNode(code, child);
    if (found) return found;
  }
  return undefined;
}

export function getNodeType(node: EapNode): string {
  if (node.code === "0") return "Projeto (nível 1)";
  if (isWorkPackage(node)) return "Pacote de trabalho";
  if (node.code.split(".").length === 1) return "Fase (nível 2)";
  return "Entrega / subentrega";
}
