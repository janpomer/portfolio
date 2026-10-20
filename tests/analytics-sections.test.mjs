import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { observeSections } from '../src/features/analytics/sections.mjs';
function setup() {
  let callback, visible = true, visibility;
  const timers = new Map(), emitted = [];
  let sequence = 0;
  const heading = { closest: () => ({ id: 'projects' }) };
  const stop = observeSections({ headings: [heading],
    observe: fn => { callback = fn; return { observe() {}, disconnect() {} }; },
    schedule: fn => { timers.set(++sequence, fn); return sequence; }, cancel: id => timers.delete(id),
    visible: () => visible, onVisibility: fn => { visibility = fn; return () => {}; },
    emit: id => emitted.push(id) });
  return { emitted, stop, enter: () => callback([{ target: heading, isIntersecting: true, intersectionRatio: 0.5 }]),
    leave: () => callback([{ target: heading, isIntersecting: false, intersectionRatio: 0 }]),
    tick: () => { for (const [id, fn] of [...timers]) { timers.delete(id); fn(); } },
    hide: () => { visible = false; visibility(); }, show: () => { visible = true; visibility(); } };
}
describe('observeSections', () => {
  it('emits only after dwell and only once per section', () => {
    const s = setup(); s.enter(); assert.deepEqual(s.emitted, []); s.tick();
    s.leave(); s.enter(); s.tick(); assert.deepEqual(s.emitted, ['projects']);
  });
  it('cancels dwell when scrolling away, hiding the tab, or stopping', () => {
    const s = setup(); s.enter(); s.leave(); s.tick(); assert.deepEqual(s.emitted, []);
    s.enter(); s.hide(); s.tick(); assert.deepEqual(s.emitted, []);
    s.show(); s.tick(); assert.deepEqual(s.emitted, ['projects']);
    const stopped = setup(); stopped.enter(); stopped.stop(); stopped.tick(); assert.deepEqual(stopped.emitted, []);
  });
});
