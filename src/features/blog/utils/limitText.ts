function limitText(text: string, maxLength?: number) {
  if (!maxLength || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export default limitText;
