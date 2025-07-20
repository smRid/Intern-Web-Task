export interface Category {
  id: number;
  cat_id: number;
  cat_name_en: string;
  cat_name_bn: string;
  no_of_subcat: number;
  no_of_dua: number;
  cat_icon: string;
}

export interface SubCategory {
  id: number;
  cat_id: number;
  subcat_id: number;
  subcat_name_en: string;
  subcat_name_bn: string;
  no_of_dua: number;
}

export interface Dua {
  id: number;
  cat_id: number;
  subcat_id: number;
  dua_id: number;
  dua_name_en: string;
  dua_name_bn: string;
  top_en?: string;
  top_bn?: string;
  dua_arabic?: string;
  dua_indopak?: string;
  clean_arabic?: string;
  transliteration_en?: string;
  transliteration_bn?: string;
  translation_en?: string;
  translation_bn?: string;
  bottom_en?: string;
  bottom_bn?: string;
  refference_en?: string;
  refference_bn?: string;
  audio?: string;
}
