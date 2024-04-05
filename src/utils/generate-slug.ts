export function generateSlug(text: string): string {
  return text
      .normalize("NFD") // Normaliza para decompor os caracteres acentuados em não acentuados + acento
      .replace(/[\u0300-\u036f]/g, "") // Remove os caracteres acentuados
      .toLowerCase() // Converte para minúsculas
      .replace(/[^\w\s-]/g, "") // Remove caracteres especiais exceto espaço e hífen
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/--+/g, "-") // Remove múltiplos hífens consecutivos
      .trim(); // Remove espaços extras no início e no final
}