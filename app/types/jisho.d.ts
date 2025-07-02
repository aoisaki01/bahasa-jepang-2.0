// Definisi untuk satu kata dari Jisho API untuk Flashcard
export interface JishoWord {
  slug: string;
  is_common: boolean;
  tags: string[];
  jlpt: string[];
  japanese: {
    word?: string; // Kanji, bisa jadi tidak ada
    reading: string; // Cara baca (Hiragana/Katakana)
  }[];
  senses: {
    english_definitions: string[];
    parts_of_speech: string[];
  }[];
}

// Definisi untuk data yang kita gunakan di Latihan Membaca
// Ini adalah subset dari JishoWord untuk menyederhanakan
export interface SentenceData {
  japanese: {
    word?: string;
    reading: string;
  }[];
}