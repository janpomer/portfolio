import { sectionIds } from './policy.mjs';

export function observeSections({ headings, observe, schedule, cancel, visible, onVisibility, emit }) {
  const inView = new Set(), timers = new Map(), seen = new Set();
  let stopped = false;
  function reset(heading) {
    if (timers.has(heading)) cancel(timers.get(heading));
    timers.delete(heading);
  }
  function start(heading) {
    const id = heading.closest('section')?.id;
    if (stopped || !visible() || seen.has(id) || timers.has(heading) || !sectionIds.includes(id)) return;
    timers.set(heading, schedule(() => {
      timers.delete(heading);
      if (stopped || !visible() || !inView.has(heading)) return;
      seen.add(id);
      emit(id);
    }, 2000));
  }
  const observer = observe(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        inView.add(entry.target);
        start(entry.target);
      } else {
        inView.delete(entry.target);
        reset(entry.target);
      }
    }
  });
  headings.forEach(heading => observer.observe(heading));
  const offVisibility = onVisibility(() => {
    for (const heading of inView) {
      reset(heading);
      if (visible()) start(heading);
    }
  });
  return () => {
    stopped = true;
    for (const heading of timers.keys()) reset(heading);
    observer.disconnect();
    offVisibility();
  };
}
