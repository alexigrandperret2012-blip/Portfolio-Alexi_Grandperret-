export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") {
    return new URL(path, window.location.origin).toString();
  }

  return path;
}
