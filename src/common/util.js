function clamp(x, fromX, toX) {
  if (x < fromX) return fromX;
  if (x > toX) return toX;

  return x;
}

export const animateEx = (dx, startTime, currentTime, speed, loopted = false) => {
  const diff = currentTime - startTime;

  let time = (speed && diff / speed) || 0;

  if (loopted) {
    time %= 1;
  } else if (time > 1) {
    time = 1;
  }

  return { offset: dx * time, progress: time };
};

export default clamp;
