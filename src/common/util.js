function clamp(x, fromX, toX) {
  if (x < fromX) return fromX;
  if (x > toX) return toX;

  return x;
}

export const animateEx = (dx, startTime, currentTime, speed, loopted = false) => {
  console.log('animateEx', dx, startTime, currentTime, speed, loopted);

  const diff = currentTime - startTime;
  console.log('DIFF', diff);

  let time = (speed && diff / speed) || 0;

  console.log('time', time);

  if (loopted) {
    time %= 1;
  } else if (time > 1) {
    time = 1;
  }

  return { offset: dx * time, progress: time };
};

export default clamp;
