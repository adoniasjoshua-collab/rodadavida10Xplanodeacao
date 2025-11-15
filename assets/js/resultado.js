/*
  Script for: resultado.html
  ---
  Handles the results view by rendering scores, analyzing strengths, and
  wiring the chart/share experiences while producing contextual insights.
*/

const areaDefinitions = [
  { key: 'carreira', label: 'Carreira' },
  { key: 'financas', label: 'Finanças' },
  { key: 'saudeFisica', label: 'Saúde Física' },
  { key: 'saudeEmocional', label: 'Saúde Emocional' },
  { key: 'relacionamentos', label: 'Relacionamentos' },
  { key: 'desenvolvimentoPessoal', label: 'Desenvolvimento Pessoal' },
  { key: 'lazer', label: 'Lazer' },
  { key: 'espiritualidade', label: 'Espiritualidade' },
  { key: 'socialConexoes', label: 'Social / Conexões' }
];

const rodaVidaInsights = {
  carreira: {
    low: 'Carreira em alerta: as dívidas apertam, o cartão estoura e você se sente invisível no trabalho. Acorda cedo, faz jornada dupla, mas no final resta culpa por não ter dado conta. Respire, diga “Deus está comigo” e escreva dois passos simples: atualizar um contato e agradecer por algo bom hoje. Micro-ações: (1) envie uma mensagem de gratidão para alguém que ajudou você; (2) defina um horário para estudar 10 minutos sobre algo que pode trazer renda.',
    medium: 'Carreira em transição: você já produz, mas vive sem rotina, pula entre tarefas e o cansaço toma conta. Sua família sente falta de presença e a ansiedade da comparação nas redes dói. Micro-ações: (1) estabeleça um “tempo offline” de 20 minutos por dia para focar numa tarefa; (2) compartilhe com alguém da igreja um pequeno plano de crescimento e peça oração.',
    high: 'Carreira com frutos: graças a Deus, você entrega resultados, mas o perigo é cair no “muito trabalho” e esquecer do descanso e do Senhor. Continue mantendo disciplina digital, celebre o progresso e ofereça apoio aos que ainda lutam. Micro-ações: (1) dedique 5 minutos para agradecer em oração por cada conquista; (2) envie uma mensagem de incentivo a alguém que está no começo.'
  },
  financas: {
    low: 'Finanças em alerta: juros altos, contas no vermelho e medo de abrir o aplicativo do banco. O problema não é seu valor, é o sistema que oprime. Enxugue gastos, anote tudo e peça ajuda de um irmão de fé. Micro-ações: (1) liste três gastos que podem esperar uma semana; (2) desligue o celular 30 minutos por dia para evitar compras impulsivas.',
    medium: 'Finanças em cuidado: há controle, mas dinheiro vai embora rápido. Falta disciplina para seguir o orçamento e sobra ansiedade por “dar conta”. Ajuste pequenos hábitos e firme um compromisso semanal com a planilha ou app. Micro-ações: (1) defina um dia da semana para revisar gastos e orar sobre eles; (2) coloque um lembrete para poupar R$10 pelo menos dois dias da semana.',
    high: 'Finanças em paz: você consegue pagar contas e guardar algo extra, mas não relaxe. Continue compartilhando conhecimento com amigos e orando pela sabedoria financeira.',
  },
  saude: {
    low: 'Corpo em alerta: o cansaço físico mistura-se com o emocional, você almoça na mesa e corre para a próxima tarefa. Acolha o corpo que Deus te deu e cuide dele com passos suaves. Micro-ações: (1) caminhe 10 minutos após o almoço e agradeça pelo movimento; (2) desligue as notificações durante um jantar em família.',
    medium: 'Corpo em ajuste: você se exercita às vezes, mas o ritmo é irregular. Crie rotina leve com alongamento e água. Micro-ações: (1) marque cinco minutos de respiração profunda antes de dormir; (2) comece o dia com uma oração pela saúde.',
    high: 'Corpo equilibrado: o cuidado físico reflete respeito a Deus. Continue mantendo horários, lembrando de descansar e envolvendo a família em atividades leves.',
  },
  desenvolvimento: {
    low: 'Desenvolvimento em alerta: falta foco, você se sente perdido sobre o futuro e a voz do “não consigo” é alta. Acolha a inquietação, faça um plano pequeno e peça apoio de alguém experiente. Micro-ações: (1) estude 10 minutos de conteúdo prático sobre sua área; (2) conte a um mentor espiritual o que aprendeu hoje.',
    medium: 'Desenvolvimento em andamento: você aprende algo, mas a disciplina falha. Reforce o hábito com metas semanais e use o celular como ferramenta, não refúgio. Micro-ações: (1) estabeleça um “dia sem redes” para focar em um projeto; (2) compartilhe um insight com alguém da sua rede.',
    high: 'Desenvolvimento consistente: você cresce e utiliza o conhecimento com propósito. Continue inspirando outros e mantenha rotina de estudo e oração.',
  },
  emocional: {
    low: 'Emoções em alerta: o coração dispara, a ansiedade é constante e o sono não vem. Fale com Deus, abra o coração para alguém e aceite cuidado pastoral. Micro-ações: (1) escreva três coisas pelas quais você é grato antes de dormir; (2) desligue as telas por 15 minutos e respire profundamente.',
    medium: 'Emoções em equilíbrio: você sente o peso, mas ainda vive no modo “dar conta”. Procure conversar com um pastor ou amigo e crie espaço para emoções. Micro-ações: (1) compartilhe uma emoção com alguém fiel; (2) peça oração sempre que a ansiedade voltar.',
    high: 'Emoções bem cuidadas: você sabe reconhecer os sinais e busca apoio. Continue fortalecendo a rede emocional e orando pela comunidade.',
  },
  relacionamentos: {
    low: 'Relacionamentos em alerta: famílias exaustas, casais discutem por dinheiro e tempo. Acolha as feridas, peça perdão, faça um gesto de cuidado. Micro-ações: (1) combine um “encontro em casa” sem celular; (2) envie uma mensagem de amor à pessoa que vive com você.',
    medium: 'Relacionamentos em cuidado: falta tempo de qualidade e há irritações. Brinque juntos, divida tarefas e ore pela união. Micro-ações: (1) proponha 10 minutos de conversa sem distrações; (2) planeje um momento de oração em família.',
    high: 'Relacionamentos fortalecidos: vocês caminham juntos e se apoiam. Continue cultivando momentos íntimos e convidando outros casais.',
  },
  lazer: {
    low: 'Lazer em alerta: a vida vira trabalho, descanso fica para depois e o celular preenche o vazio. Faça algo leve para recarregar. Micro-ações: (1) saia para caminhar com música de louvor; (2) apague as notificações por 30 minutos e aproveite o momento.',
    medium: 'Lazer em equilíbrio: marca tempo, mas se culpa depois. Permita-se descansar e incluir brincadeiras simples.',
    high: 'Lazer saudável: você respeita o descanso e inspira outros a viverem momentos leves.',
  },
  contribuicao: {
    low: 'Contribuição em alerta: você sente que não pode ajudar porque luta para sobreviver. Doe o que tem – tempo, escuta, presença. Micro-ações: (1) converse com um vizinho que precisa de ajuda; (2) participe de uma ação social da igreja.',
    medium: 'Contribuição em movimento: doa tempo, mas falta constância. Agende um dia por semana para servir e peça apoio do grupo.',
    high: 'Contribuição sólida: você impacta pessoas e mantém humildade. Continue sendo luz e inspiração.',
  },
  espiritual: {
    low: 'Espiritualidade em alerta: falta oração, a Bíblia fica fechada e a rotina digital domina. Reserve minutos para o Senhor. Micro-ações: (1) leia um versículo antes de dormir; (2) participe de uma oração comunitária esta semana.',
    medium: 'Espiritualidade em cuidado: você busca Deus, mas a pressa atrapalha. Estabeleça um ritual breve diário com foco e gratidão.',
    high: 'Espiritualidade firme: você prioriza a presença de Deus. Continue mantendo disciplina e compartilhando testemunhos.',
  },
  social: {
    low: 'Social em alerta: as redes substituem o abraço e você se sente só. Abra a porta, convide alguém para um café e desligue o celular. Micro-ações: (1) faça uma ligação por áudio para um amigo; (2) compartilhe uma palavra de encorajamento no grupo.',
    medium: 'Social em cuidado: há contato, mas o tempo real é curto. Marque encontros presenciais, ouça mais do que fala.',
    high: 'Social em conexão: você constrói comunidades e se mostra presente. Continue cuidando dos relacionamentos reais.',
  }
};

const areaContextData = {
  carreira: {
    displayName: 'Carreira',
    context: 'concorrência por vagas formais e demanda por habilidades digitais no Brasil',
    example: 'Atualize seu perfil no LinkedIn, revise o currículo e participe de meetups como os do Cubo Itaú ou do Sebrae local'
  },
  financas: {
    displayName: 'Finanças',
    context: 'inflação persistente, juros altos e pressão para equilibrar despesas fixas e crédito rotativo',
    example: 'Monte um orçamento no aplicativo do banco digital, compare taxas e reserve uma parte para a reserva de emergência'
  },
  saudeFisica: {
    displayName: 'Saúde Física',
    context: 'rotina sedentária, alimentação ultraprocessada e pouco tempo para descanso em centros urbanos',
    example: 'Inclua caminhadas no parque, aulas gratuitas nas praças ou desafios físicos em grupo'
  },
  saudeEmocional: {
    displayName: 'Saúde Emocional',
    context: 'estresse do trânsito, sobrecarga de informações e dificuldade de acesso a apoio psicológico',
    example: 'Use rodas de conversa comunitárias, termômetros emocionais ou psicoterapia online com profissionais brasileiros'
  },
  relacionamentos: {
    displayName: 'Relacionamentos',
    context: 'distâncias familiares, jornadas longas e encontros presenciais limitados',
    example: 'Agende almoços em família, converse por áudio com amigos e participe de grupos locais de suporte'
  },
  desenvolvimentoPessoal: {
    displayName: 'Desenvolvimento Pessoal',
    context: 'mudanças rápidas em tecnologia e exigência de aprendizagem contínua',
    example: 'Faça cursos gratuitos do Gov.br, Alura ou SENAI e tire um projeto prático para aplicar o que aprendeu'
  },
  lazer: {
    displayName: 'Lazer',
    context: 'rotina corrida que pulveriza o tempo livre e dificulta vivenciar a cultura local',
    example: 'Conheça centros culturais gratuitos, feiras de bairro e passeios curtos no entorno'
  },
  espiritualidade: {
    displayName: 'Espiritualidade',
    context: 'vida hiperconectada que reduz a presença interior e a conexão com valores',
    example: 'Participe de cultos comunitários, cultive meditação guiada em português ou momentos de silêncio em espaços próximos'
  },
  socialConexoes: {
    displayName: 'Social / Conexões',
    context: 'isolamento digital e pouca atuação em coletivos com impacto local',
    example: 'Engaje-se em voluntariado de bairro, associações culturais ou rodas de conversa para alinhar ações sociais'
  }
};

const PDF_FEEDBACK_ID = 'pdf-feedback';

const insightAreaKeyMap = {
  carreira: 'carreira',
  financas: 'financas',
  saudeFisica: 'saude',
  saudeEmocional: 'emocional',
  relacionamentos: 'relacionamentos',
  desenvolvimentoPessoal: 'desenvolvimento',
  lazer: 'lazer',
  espiritualidade: 'espiritual',
  socialConexoes: 'social'
};

const generateAreaFeedback = (areaKey, score) => {
  const insightKey = insightAreaKeyMap[areaKey] || areaKey;
  const insights = rodaVidaInsights[insightKey];
  if (!insights) {
    return '';
  }

  const normalizedScore = Math.max(0, Math.min(Number(score) || 0, 10));
  if (normalizedScore <= 3) return insights.low;
  if (normalizedScore <= 7) return insights.medium;
  return insights.high;
};

const levelMetadata = {
  low: { color: '#f56565', emoji: '🔥', label: 'Alerta' },
  medium: { color: '#f59e0b', emoji: '⚠️', label: 'Atenção' },
  good: { color: '#48bb78', emoji: '💪', label: 'Potencial' },
  great: { color: '#0ea5e9', emoji: '✨', label: 'Suporte' }
};

const createInsightPayload = (level, area, payload) => ({
  level,
  levelLabel: levelMetadata[level].label,
  color: levelMetadata[level].color,
  statusEmoji: levelMetadata[level].emoji,
  ...payload
});

const buildLowInsight = (area) => createInsightPayload('low', area, {
  title: `${area.displayName} em alerta`,
  description: `Problemas: ${area.displayName} sofre com falta de foco, ${area.context}.`,
  emotionalInsight: 'Você pode estar se sentindo inseguro, sobrecarregado e sem margem para testar novos passos.',
  microStepsToday: `Liste seu maior bloqueio e dê um micro passo simples (ex: ${area.example}).`,
  weeklyAction: `Valide esse micro passo durante a semana e busque um recurso local para te orientar, como ${area.example}.`,
  exampleRelevantToBrazil: `Exemplo brasileiro: ${area.example}.`
});

const buildMediumInsight = (area) => createInsightPayload('medium', area, {
  title: `${area.displayName} em terreno instável`,
  description: `Riscos: negligenciar esse ponto pode piorar os impactos, ${area.context}; responda com intenção e clareza.`,
  emotionalInsight: 'A ansiedade de “dar conta” pode aumentar e roubar energia da semana.',
  microStepsToday: `Identifique um hábito que drena sua energia e substitua por uma atitude leve (ex: ${area.example}).`,
  weeklyAction: `Reserve tempo para revisar esse hábito e experimentar ${area.example} como trilha de apoio.`,
  exampleRelevantToBrazil: `Por exemplo, ${area.example}.`
});

const buildGoodInsight = (area) => createInsightPayload('good', area, {
  title: `${area.displayName} com ritmo promissor`,
  description: `Oportunidades: ${area.displayName} já está em curva ascendente; aproveite ${area.context} para avançar.`,
  emotionalInsight: 'Você sente orgulho, mas a inquietação pede ajustes sutis.',
  microStepsToday: `Fortaleça esse ritmo revisando resultados e registrando ideias pequenas (ex: ${area.example}).`,
  weeklyAction: `Projete uma ação semanal que expanda esse ganho, como usar ${area.example}.`,
  exampleRelevantToBrazil: `Exemplo prático: ${area.example}.`
});

const buildGreatInsight = (area) => createInsightPayload('great', area, {
  title: `${area.displayName} sólido e sustentável`,
  description: `Reforço: continue nutrindo os hábitos que sustentam ${area.displayName}, especialmente frente a ${area.context}.`,
  emotionalInsight: 'Você sente confiança e tranquilidade, um bom sinal de equilíbrio.',
  microStepsToday: `Celebre o avanço compartilhando o aprendizado e anotando como manter o ritmo (ex: ${area.example}).`,
  weeklyAction: `Use ${area.example} para inspirar outras áreas e sustentar o foco na consistência.`,
  exampleRelevantToBrazil: `Caso brasileiro: ${area.example}.`
});

const insightPayloads = Object.fromEntries(
  Object.entries(areaContextData).map(([key, area]) => [
    key,
    {
      low: buildLowInsight(area),
      medium: buildMediumInsight(area),
      good: buildGoodInsight(area),
      great: buildGreatInsight(area)
    }
  ])
);

const determineSeverityLevel = (score) => {
  if (score <= 3) return 'low';
  if (score <= 6) return 'medium';
  if (score <= 8) return 'good';
  return 'great';
};

const defaultInsight = {
  title: 'Insight em preparação',
  color: '#6b7280',
  description: 'Ainda estamos construindo o feedback para essa área.',
  emotionalInsight: 'Mantenha a curiosidade ativa enquanto os dados são consolidados.',
  microStepsToday: 'Observe o que já funciona e escreva um pequeno agradecimento a si mesmo.',
  weeklyAction: 'Revisite a área no fim da semana e registre aprendizados.',
  exampleRelevantToBrazil: 'Compartilhe esse momento com alguém próximo e faça uma pausa brasileira: um café com pão de queijo.',
  level: 'good',
  levelLabel: 'Em breve',
  statusEmoji: '✨'
};

const getInsightPayload = (areaName, score) => {
  const normalizedArea = insightPayloads[areaName] ? areaName : 'carreira';
  const normalizedScore = Math.max(0, Math.min(Number(score) || 0, 10));
  const level = determineSeverityLevel(normalizedScore);
  const areaInsights = insightPayloads[normalizedArea];
  return areaInsights[level] || defaultInsight;
};

const formatReportDate = (date = new Date()) => date.toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});

const renderUserProfileCard = () => {
  const container = document.getElementById('report-info-card');
  if (!container) return;
  const profile = getStoredUserProfile();
  const today = formatReportDate();
  container.innerHTML = `
    <div>
      <p class="report-info__label">Nome</p>
      <p class="report-info__value">${profile?.name || 'Não informado'}</p>
    </div>
    <div>
      <p class="report-info__label">Email</p>
      <p class="report-info__value">${profile?.email || 'Não informado'}</p>
    </div>
    <div>
      <p class="report-info__label">Cidade</p>
      <p class="report-info__value">${profile?.city || 'Não informado'}</p>
    </div>
    <div>
      <p class="report-info__label">Data do relatório</p>
      <p class="report-info__value">${today}</p>
    </div>
  `;
};

const createInsightCard = (definition, score) => {
  const feedback = getInsightPayload(definition.key, score);
  const feedbackText = generateAreaFeedback(definition.key, score);
  const card = document.createElement('article');
  card.classList.add('insight-card', `insight-card--${feedback.level}`);
  card.innerHTML = `
    <header class="insight-card__header">
      <div>
        <p class="insight-card__label">${definition.label}</p>
        <h4 class="insight-card__headline">${feedback.statusEmoji} ${feedback.title}</h4>
        <span class="insight-card__level">${feedback.levelLabel}</span>
      </div>
      <span class="insight-card__score">${score}/10</span>
    </header>
    <p class="insight-card__description">${feedback.description}</p>
    <ul class="insight-card__meta">
      <li class="insight-card__meta-item"><strong>Emoção:</strong> ${feedback.emotionalInsight}</li>
      <li class="insight-card__meta-item insight-card__meta-item--micro-step"><strong>Micro passos:</strong> ${feedback.microStepsToday}</li>
      <li class="insight-card__meta-item"><strong>Ação semanal:</strong> ${feedback.weeklyAction}</li>
      <li class="insight-card__meta-item"><strong>Exemplo:</strong> ${feedback.exampleRelevantToBrazil}</li>
    </ul>
  `;
  return card;
};

const summarizeInsightLevels = (assessmentData) => {
  const base = { low: 0, medium: 0, good: 0, great: 0 };
  if (!assessmentData) return base;
  return areaDefinitions.reduce((counts, definition) => {
    const score = assessmentData[definition.key] ?? 0;
    const level = determineSeverityLevel(score);
    counts[level] += 1;
    return counts;
  }, base);
};

const buildSummaryText = (counts) => {
  const segments = [];
  if (counts.low) segments.push(`${counts.low} ${counts.low === 1 ? 'área' : 'áreas'} pedem atenção urgente`);
  if (counts.medium) segments.push(`${counts.medium} ${counts.medium === 1 ? 'área' : 'áreas'} exigem cuidado`);
  if (counts.good) segments.push(`${counts.good} ${counts.good === 1 ? 'área' : 'áreas'} estão em crescimento consistente`);
  if (counts.great) segments.push(`${counts.great} ${counts.great === 1 ? 'área' : 'áreas'} sustentam resultados sólidos`);
  return segments.length
    ? segments.join(' · ')
    : 'Todas as áreas estão estáveis. Continue mantendo o ritmo.';
};

const renderInsightsSummary = (assessmentData) => {
  const summary = document.getElementById('insights-summary');
  if (!summary) return;
  const counts = summarizeInsightLevels(assessmentData);
  summary.innerHTML = `
    <p class="insights-summary__headline">Visão rápida</p>
    <p class="insights-summary__text">${buildSummaryText(counts)}</p>
  `;
};

const renderInsights = (assessmentData) => {
  renderInsightsSummary(assessmentData);
  const container = document.getElementById('insights-grid');
  if (!container || !assessmentData) return;
  container.innerHTML = '';
  areaDefinitions.forEach(definition => {
    const score = assessmentData[definition.key] ?? 0;
    container.appendChild(createInsightCard(definition, score));
  });
};

const loadLifeWheelChart = () => {
  const ctx = document.getElementById('lifeWheelChart');
  if (!ctx) {
    console.error('Canvas #lifeWheelChart não encontrado.');
    return;
  }

  const storedScores = getStoredAssessment() || {};
  const labels = areaDefinitions.map(def => def.label);
  const dataValues = areaDefinitions.map(def => storedScores[def.key] ?? 0);
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue('--primary').trim() || '#007bff';
  const dangerColor = rootStyles.getPropertyValue('--danger').trim() || '#f56565';
  const lowScoreThreshold = 5;
  const pointColors = dataValues.map(value => (value <= lowScoreThreshold ? dangerColor : primaryColor));
  const pointHoverColors = pointColors.map(color => color);

  if (window.lifeWheelChartInstance) {
    window.lifeWheelChartInstance.destroy();
  }

  window.lifeWheelChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Roda da Vida 10X',
        data: dataValues,
        backgroundColor: 'rgba(0, 123, 255, 0.25)',
        borderColor: primaryColor,
        borderWidth: 2,
        pointBackgroundColor: pointColors,
        pointBorderColor: pointColors,
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBorderColor: pointHoverColors
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 10,
          ticks: {
            stepSize: 1,
            color: '#333'
          },
          grid: {
            color: '#ccc'
          },
          angleLines: {
            color: '#bbb'
          }
        }
      }
    }
  });
};

const initResultPage = () => {
  const assessmentData = getStoredAssessment();
  const areas = window.ASSESSMENT_AREAS || [];
  const areaTitleMap = areas.reduce((acc, area) => {
    acc[area.key] = area.title;
    return acc;
  }, {});

  if (!assessmentData) {
    window.location.href = 'avaliacao.html';
    return;
  }

  renderUserProfileCard();
  loadLifeWheelChart();

  const findKeyAreas = (data) => {
    const entries = Object.entries(data);
    if (!entries.length) {
      return {
        strong: { name: '', score: 0 },
        weak: { name: '', score: 0 }
      };
    }

    const weak = entries.reduce((prev, curr) => (prev[1] <= curr[1] ? prev : curr));
    const strong = entries.reduce((prev, curr) => (prev[1] >= curr[1] ? prev : curr));

    return {
      strong: {
        name: areaTitleMap[strong[0]] || strong[0],
        score: strong[1]
      },
      weak: {
        name: areaTitleMap[weak[0]] || weak[0],
        score: weak[1]
      }
    };
  };

  const displayAnalysis = (keyAreas) => {
    const strongArea = document.getElementById('strong-point-area');
    const criticalArea = document.getElementById('critical-point-area');
    if (strongArea) strongArea.textContent = keyAreas.strong.name;
    if (criticalArea) criticalArea.textContent = keyAreas.weak.name;
  };

const microActionsByArea = {
  carreira: [
    'Reserve 20 minutos para revisar seus planos de carreira com reverência',
    'Compartilhe uma vitória com sua comunidade de fé para celebrar progresso'
  ],
  financas: [
    'Liste as dívidas em aberto e priorize a parcela mais urgente',
    'Reduza gastos com aplicativos e redes sociais por um dia para respirar'
  ],
  saudeFisica: [
    'Faça uma caminhada rápida na rua ou na praça antes do trabalho',
    'Almoce com calma, evitando telas e focando no corpo'
  ],
  saudeEmocional: [
    'Faça um check-in emocional pela manhã com oração e respiração',
    'Procure apoio de um grupo de fé quando a pressão vier'
  ],
  relacionamentos: [
    'Reserve um momento de conversa coração aberto com um familiar',
    'Combine um culto em família ou uma chamada com amigos para reforçar laços'
  ],
  desenvolvimento: [
    'Assista a um vídeo curto com conteúdo prático para o seu emprego',
    'Anote uma ideia que pode virar um projeto e compartilhe com sua igreja'
  ],
  lazer: [
    'Inclua um passeio rápido nos arredores com alguém querido',
    'Desconecte-se das redes por uma hora para viver o presente'
  ],
  contribuicao: [
    'Ofereça suas habilidades em um trabalho voluntário local',
    'Ajude alguém da família ou igreja com algo prático esta semana'
  ],
  espiritual: [
    'Separe cinco minutos para leitura bíblica antes de dormir',
    'Participe de uma oração coletiva ou culto de agradecimento'
  ],
  social: [
    'Convide um vizinho para uma conversa sobre fé e propósito',
    'Use as redes para compartilhar reflexões, não só notícias'
  ]
};

const buildPDFText = (areaKey, score) => {
  const definition = areaDefinitions.find(area => area.key === areaKey);
  const label = definition ? definition.label : areaKey;
  const feedback = generateAreaFeedback(areaKey, score) || 'Conteúdo em elaboração.';
  const actions = microActionsByArea[areaKey] || ['Mantenha pequenos passos e anote o progresso.'];
  return `
    <section class="pdf-area">
      <h3>${label} — ${score}/10</h3>
      <p>${feedback}</p>
      <p><strong>Micro-Ações da Semana:</strong> ${actions.join(' • ')}</p>
    </section>
  `;
};

const generatePDFReport = () => {
  const assessmentData = getStoredAssessment();
  if (!assessmentData) return;

  const container = document.getElementById(PDF_FEEDBACK_ID);
  if (!container) return;

  const profile = getStoredUserProfile();
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const header = `
    <section class="pdf-header">
      <h1>Roda da Vida 10X — Relatório Personalizado</h1>
      <p><strong>${profile?.name || 'Participante'}</strong> · ${formattedDate} · ${formattedTime}</p>
      <p>Uma saudação pastoral: Deus cuida do seu passo, e este relatório foi pensado para trazer clareza e conforto em tempos de pressão.</p>
    </section>
  `;

  const overview = `
    <section class="pdf-overview">
      <h2>Visão geral</h2>
      <p>A Roda da Vida mostra o equilíbrio entre as áreas mais importantes da sua jornada. Ela convida você a respirar, ganhar clareza, buscar equilíbrio, foco e restauração emocional e espiritual.</p>
      <p>Sabemos que o brasileiro vive com telas demais, contas apertadas, pressão familiar e rotina acelerada. Por isso, esse relatório é uma bússola para trazer paz e disciplina digital.</p>
    </section>
  `;

  const areaContent = areaDefinitions.map(area => {
    const score = assessmentData[area.key] ?? 0;
    return buildPDFText(area.key, score);
  }).join('');

  const finalMessage = `
    <section class="pdf-final">
      <h2>Mensagem final</h2>
      <p>O Senhor te chama para esperança, propósito e consistência. Revise esse plano semanalmente, mantenha a fé firme e confie que cada micro-ação gera transformação.</p>
    </section>
  `;

  container.innerHTML = `${header}${overview}${areaContent}${finalMessage}`;

  window.print();
};

  const setupShareButton = (keyAreas) => {
    const shareBtn = document.getElementById('share-whatsapp-btn');
    if (!shareBtn) return;

    const message = `Acabei de fazer minha Roda da Vida 10X! Meu ponto forte é *${keyAreas.strong.name}* (nota ${keyAreas.strong.score}) e o que mais precisa de atenção é *${keyAreas.weak.name}* (nota ${keyAreas.weak.score}).`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    shareBtn.href = whatsappUrl;
    shareBtn.target = '_blank';
    shareBtn.rel = 'noopener noreferrer';
  };

  const setupPdfButton = () => {
    const pdfBtn = document.getElementById('generate-pdf-btn');
    if (!pdfBtn) return;
    pdfBtn.addEventListener('click', generatePDFReport);
  };

  const keyAreas = findKeyAreas(assessmentData);
  displayAnalysis(keyAreas);
  setupShareButton(keyAreas);
  setupPdfButton();
  renderInsights(assessmentData);
};

document.addEventListener('DOMContentLoaded', initResultPage);
