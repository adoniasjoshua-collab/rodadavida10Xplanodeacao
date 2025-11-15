/*
  Script for: avaliacao.html
  ---
  Loads assessment cards, handles slider interactions, and saves scores.
*/

const assessmentAreas = window.ASSESSMENT_AREAS || [];
// Supply your own EmailJS (or similar) configuration via window.RODA_VIDA_EMAIL_CONFIG
const EMAIL_REPORT_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

const formatReportDate = (date = new Date()) => date.toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});

const buildScoreRows = (scores) => assessmentAreas.map(area => {
  const value = scores[area.key] ?? 0;
  return `
    <tr>
      <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">${area.title || area.key}</td>
      <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: bold;">${value}/10</td>
    </tr>
  `;
}).join('');

const buildReportEmailContent = (profile, scores) => {
  const reportDate = formatReportDate();
  return `
    <p>Olá ${profile?.name || 'participante'},</p>
    <p>Aqui está o seu relatório completo da Roda da Vida 10X (baseado na avaliação enviada em ${reportDate}).</p>
    <p><strong>Email:</strong> ${profile?.email || 'Não informado'}<br>
    <strong>Cidade:</strong> ${profile?.city || 'Não informado'}</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 8px; border-bottom: 2px solid #cbd5f5;">Área</th>
          <th style="text-align: right; padding: 8px; border-bottom: 2px solid #cbd5f5;">Nota</th>
        </tr>
      </thead>
      <tbody>
        ${buildScoreRows(scores)}
      </tbody>
    </table>
    <p style="margin-top: 12px;">Continue revisitando essa página sempre que quiser acompanhar os próximos passos.</p>
  `;
};

const sendReportEmail = async (profile, scores) => {
  const config = window.RODA_VIDA_EMAIL_CONFIG || {};
  const { serviceId, templateId, userId, subject } = config;
  if (!serviceId || !templateId || !userId || !profile?.email) {
    console.info('Configuração de email ausente ou email do usuário não foi informado. O relatório não será enviado automaticamente.');
    return false;
  }

  const reportDate = formatReportDate();
  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: userId,
    template_params: {
      to_email: profile.email,
      to_name: profile.name,
      report_date: reportDate,
      profile_city: profile.city,
      report_html: buildReportEmailContent(profile, scores),
      subject: subject || `Relatório Roda da Vida 10X - ${reportDate}`
    }
  };

  try {
    const response = await fetch(EMAIL_REPORT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Falha ao enviar e-mail de relatório:', response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Falha ao enviar e-mail de relatório:', error);
    return false;
  }
};

const loadAreas = () => {
  const grid = document.getElementById('area-grid');
  if (!grid) return;

  const storedData = getStoredAssessment();

  grid.innerHTML = '';

  assessmentAreas.forEach(area => {
    const value = storedData && storedData[area.key] !== undefined
      ? storedData[area.key]
      : 5;

    const card = document.createElement('article');
    card.className = 'assessment-card';
    card.dataset.area = area.key;
    card.innerHTML = `
      <div class="assessment-card__top">
        <div class="assessment-card__icon">${area.icon}</div>
        <div>
          <h3 class="assessment-card__title">${area.title}</h3>
          <p class="assessment-card__description">${area.description}</p>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value="${value}"
        class="assessment-card__slider"
        id="slider-${area.key}"
        data-area="${area.key}">
      <span class="assessment-card__value" id="value-${area.key}">${value}</span>
    `;

    grid.appendChild(card);
  });
};

const handleSliders = () => {
  const sliders = document.querySelectorAll('.assessment-card__slider');
  sliders.forEach(slider => {
    const valueEl = document.getElementById(`value-${slider.dataset.area}`);
    slider.addEventListener('input', () => {
      if (valueEl) {
        valueEl.textContent = slider.value;
      }
    });
  });
};

const saveScores = () => {
  const sliders = document.querySelectorAll('.assessment-card__slider');
  const result = {};
  sliders.forEach(slider => {
    result[slider.dataset.area] = parseInt(slider.value, 10);
  });

  const isSaved = saveAssessmentData(result);
  return isSaved ? result : null;
};

const goToResults = () => {
  const button = document.getElementById('see-results-btn');
  if (!button) return;

  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const result = saveScores();
    if (!result) {
      console.error('Não foi possível salvar as notas da avaliação.');
      return;
    }

    const profile = getStoredUserProfile();
    await sendReportEmail(profile, result);
    window.location.href = 'resultado.html';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadAreas();
  handleSliders();
  goToResults();
});
