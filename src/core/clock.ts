/**
 * 时间源。抽出来是为了让引擎能在测试里被"手动推进"。
 *
 * 权威时钟的选择（这里是最容易做错的地方）：
 * - `perf` = performance.now，基于 CLOCK_MONOTONIC，**不计算系统休眠时间**。
 *   以它为准的话，电脑睡 3 分钟醒来，计时器会凭空多出 3 分钟。
 * - `wall` = Date.now，真实流逝时间，休眠期间照常推进。
 *
 * 辩论计时必须反映真实流逝时间，因此 **以 wall 为准**；
 * perf 只在墙钟回拨（用户改时间 / NTP 跳变）时用来顶上，保证计时连续。
 */
export interface TimeSource {
  /** 单调时钟（performance.now），不受系统时间调整影响，但休眠期间不推进 */
  perf(): number;
  /** 墙钟（Date.now），真实流逝时间，休眠期间照常推进 */
  wall(): number;
}

export function systemTimeSource(): TimeSource {
  return {
    perf: () => performance.now(),
    wall: () => Date.now(),
  };
}

/**
 * 本 tick 的权威推进量（毫秒）。
 * 墙钟正常前进（含休眠）时以墙钟为准；墙钟回拨（wallDelta < 0）时退回单调时钟。
 */
export function authoritativeDelta(perfDelta: number, wallDelta: number): number {
  if (wallDelta < 0) return Math.max(0, perfDelta);
  return wallDelta;
}
