import { getRtcUrl } from './index';

describe('getRtcUrl', () => {
  it('should use EU RTC endpoint for eu-residency', () => {
    const url = getRtcUrl({ location: 'eu-residency' });
    expect(url).toBe('wss://livekit.rtc.eu.residency.elevenlabs.io');
  });
  it('should use India RTC endpoint for in-residency', () => {
    const url = getRtcUrl({ location: 'in-residency' });
    expect(url).toBe('wss://livekit.rtc.in.residency.elevenlabs.io');
  });
  it('should use global RTC endpoint for global', () => {
    const url = getRtcUrl({ location: 'global' });
    expect(url).toBe('wss://livekit.rtc.elevenlabs.io');
  });
  it('should use US RTC endpoint for us', () => {
    const url = getRtcUrl({ location: 'us' });
    expect(url).toBe('wss://livekit.rtc.elevenlabs.io');
  });
  it('should use custom rtcUrl if provided', () => {
    const url = getRtcUrl({ rtcUrl: 'wss://custom.example.com' });
    expect(url).toBe('wss://custom.example.com');
  });
});
