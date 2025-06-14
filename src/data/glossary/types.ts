
export interface GlossaryTerm {
  term: string;
  definition: string;
  links?: {
    text: string;
    url: string;
  }[];
}

export interface GlossaryCategory {
  id: string;
  title: string;
  terms: GlossaryTerm[];
}
