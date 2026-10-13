const OpenAI = require('openai');
const nayeli = require('../assistants/nayeli');

const MAX_MESSAGE_CHARS = 1200;
const MAX_HISTORY_ITEMS = 6;
const MAX_HISTORY_CHARS = 1200;
const MODES = new Set(['general','profile','product','promotion']);
const MAX_OUTPUT_TOKENS = {
  general:450,
  profile:750,
  product:650,
  promotion:1200
};

function normalizeMode(value) {
  const mode = String(value || '').trim().toLowerCase();
  return MODES.has(mode) ? mode : 'general';
}

function cleanMessage(value, limit) {
  return String(value || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').trim().slice(0,limit);
}

function safeHistory(history) {
  return (Array.isArray(history) ? history : [])
    .filter(item => item && (item.role === 'user' || item.role === 'assistant'))
    .slice(-MAX_HISTORY_ITEMS)
    .map(item => ({role:item.role,content:cleanMessage(item.content,MAX_HISTORY_CHARS)}))
    .filter(item => item.content);
}

function configuration(env = process.env) {
  return {
    enabled:env.NAYELI_PREVIEW_ENABLED === 'true',
    hasApiKey:Boolean(String(env.OPENAI_API_KEY || '').trim()),
    model:nayeli.MODEL
  };
}

async function reply({message,history,context,mode,client,env = process.env}) {
  const config = configuration(env);
  if (!config.enabled) {
    const error = new Error('La vista previa de Nayeli está desactivada.');
    error.code = 'NAYELI_DISABLED';
    throw error;
  }
  const cleanedMessage = cleanMessage(message,MAX_MESSAGE_CHARS);
  if (!cleanedMessage) {
    const error = new Error('Escribe un mensaje para Nayeli.');
    error.code = 'NAYELI_INVALID_MESSAGE';
    throw error;
  }
  if (!client && !config.hasApiKey) {
    const error = new Error('OpenAI no está configurado.');
    error.code = 'NAYELI_NOT_CONFIGURED';
    throw error;
  }

  const openai = client || new OpenAI({apiKey:env.OPENAI_API_KEY});
  const input = [...safeHistory(history),{role:'user',content:cleanedMessage}];
  const selectedMode = normalizeMode(mode);
  const response = await openai.responses.create({
    model:config.model,
    instructions:nayeli.instructions(String(context || '').slice(0,6000),selectedMode),
    input,
    max_output_tokens:MAX_OUTPUT_TOKENS[selectedMode],
    reasoning:{effort:'none'},
    store:false
  });
  return {reply:String(response.output_text || '').trim(),model:config.model,mode:selectedMode,usage:response.usage || {}};
}

module.exports = { configuration, reply, safeHistory, normalizeMode, MAX_MESSAGE_CHARS, MAX_HISTORY_ITEMS, MAX_OUTPUT_TOKENS };
