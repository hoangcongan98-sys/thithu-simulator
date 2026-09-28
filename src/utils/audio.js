// Audio utility functions using Web Audio API

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playBeep(frequency = 800, duration = 0.15, volume = 0.3) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function playTingTong() {
  // Two-tone doorbell sound
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // First tone - "ting" (higher pitch)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(1200, now);
  gain1.gain.setValueAtTime(0.4, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc1.start(now);
  osc1.stop(now + 0.3);

  // Second tone - "tong" (lower pitch)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(800, now + 0.3);
  gain2.gain.setValueAtTime(0.001, now);
  gain2.gain.setValueAtTime(0.4, now + 0.3);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
  osc2.start(now + 0.3);
  osc2.stop(now + 0.7);
}

export function playTun() {
  // Short warning horn sound
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.linearRampToValueAtTime(350, now + 0.5);
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.setValueAtTime(0.3, now + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.start(now);
  osc.stop(now + 0.5);
}

export function playErrorSound() {
  // Alert beep for error/penalty
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  for (let i = 0; i < 2; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(600, now + i * 0.2);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.setValueAtTime(0.25, now + i * 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.2 + 0.15);

    osc.start(now + i * 0.2);
    osc.stop(now + i * 0.2 + 0.15);
  }
}

export function playSuccessSound() {
  // Ascending two-tone for pass
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  [523, 784].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.2);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.setValueAtTime(0.35, now + i * 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.2 + 0.3);
    osc.start(now + i * 0.2);
    osc.stop(now + i * 0.2 + 0.3);
  });
}

export function playFailSound() {
  // Descending two-tone for fail
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  [523, 330].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.25);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.setValueAtTime(0.35, now + i * 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.25 + 0.35);
    osc.start(now + i * 0.25);
    osc.stop(now + i * 0.25 + 0.35);
  });
}

// Cache for the best Vietnamese voice found
let cachedViVoice = null;
let voiceSearchDone = false;

/**
 * Find the best female Northern Vietnamese voice available.
 * Priority order:
 *   1. Microsoft HoaiMy (Edge - Natural female Northern Vietnamese)
 *   2. Microsoft An (Edge - older female Vietnamese)
 *   3. Google tiếng Việt (Chrome - female Vietnamese)
 *   4. Any Vietnamese voice with "female" in name
 *   5. Any vi-VN voice
 *   6. Any voice starting with "vi"
 */
function findBestVietnameseVoice() {
  if (voiceSearchDone && cachedViVoice) return cachedViVoice;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Priority keywords for female Northern Vietnamese voices (ranked)
  const priorityNames = [
    'hoaimy',
    'an ',
    'google tiếng việt',
    'google vi',
    'linh',
    'mai',
  ];

  // Step 1: Filter Vietnamese voices only
  const viVoices = voices.filter(v =>
    v.lang === 'vi-VN' || v.lang === 'vi' || v.lang.startsWith('vi-')
  );

  if (viVoices.length === 0) {
    voiceSearchDone = true;
    return null;
  }

  // Step 2: Try to match priority names (best match first)
  for (const keyword of priorityNames) {
    const match = viVoices.find(v =>
      v.name.toLowerCase().includes(keyword)
    );
    if (match) {
      cachedViVoice = match;
      voiceSearchDone = true;
      console.log(`[TTS] Selected voice: "${match.name}" (${match.lang})`);
      return match;
    }
  }

  // Step 3: Prefer female voices (by name heuristic)
  const femaleKeywords = ['female', 'woman', 'nữ', 'girl'];
  const femaleVoice = viVoices.find(v =>
    femaleKeywords.some(kw => v.name.toLowerCase().includes(kw))
  );
  if (femaleVoice) {
    cachedViVoice = femaleVoice;
    voiceSearchDone = true;
    console.log(`[TTS] Selected female voice: "${femaleVoice.name}" (${femaleVoice.lang})`);
    return femaleVoice;
  }

  // Step 4: Fallback to first Vietnamese voice
  cachedViVoice = viVoices[0];
  voiceSearchDone = true;
  console.log(`[TTS] Fallback voice: "${viVoices[0].name}" (${viVoices[0].lang})`);
  return viVoices[0];
}

// Text-to-speech function for Vietnamese (female, Northern accent)
export function speak(text, rate = 1.0) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = rate;
    utterance.pitch = 1.1;   // Slightly higher pitch for feminine tone
    utterance.volume = 1.0;

    // Select the best Vietnamese female voice
    const voice = findBestVietnameseVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = resolve;
    utterance.onerror = resolve;

    window.speechSynthesis.speak(utterance);
  });
}

// Pre-load voices (some browsers load asynchronously)
export function preloadVoices() {
  if (!('speechSynthesis' in window)) return;

  // Force voice list load
  window.speechSynthesis.getVoices();

  // Listen for async voice loading
  window.speechSynthesis.onvoiceschanged = () => {
    voiceSearchDone = false; // Reset cache to re-search
    cachedViVoice = null;
    findBestVietnameseVoice();
  };
}

