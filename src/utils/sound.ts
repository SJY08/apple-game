type AudioCtor = typeof AudioContext;

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  try {
    const Ctor: AudioCtor | undefined =
    window.AudioContext ?? (window as unknown as {webkitAudioContext?: AudioCtor;}).webkitAudioContext;
    if (!Ctor) return null;
    if (!ctx) ctx = new Ctor();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function playPopSound(): void {
  const audio = getContext();
  if (!audio) return;
  const now = audio.currentTime;

  const master = audio.createGain();
  master.gain.value = 0.35;
  master.connect(audio.destination);

  const length = Math.floor(audio.sampleRate * 0.04);
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  }
  const noise = audio.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = audio.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 2200;
  noiseFilter.Q.value = 0.8;
  const noiseGain = audio.createGain();
  noiseGain.gain.setValueAtTime(0.6, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  noise.connect(noiseFilter).connect(noiseGain).connect(master);
  noise.start(now);
  noise.stop(now + 0.06);

  const osc = audio.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(760, now);
  osc.frequency.exponentialRampToValueAtTime(240, now + 0.11);
  const oscGain = audio.createGain();
  oscGain.gain.setValueAtTime(0.0001, now);
  oscGain.gain.exponentialRampToValueAtTime(0.5, now + 0.006);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
  osc.connect(oscGain).connect(master);
  osc.start(now);
  osc.stop(now + 0.16);
}