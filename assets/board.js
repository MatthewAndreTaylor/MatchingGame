export function newBoard() {
  let lst = ["d", "p", "z", "a", "c", "w", "s", "t"];
  lst = lst.concat(lst);
  for (let i = lst.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lst[i], lst[j]] = [lst[j], lst[i]];
  }
  return lst.join("");
}