export interface Opinion {
  idOpinion: number;
  user: string;
  comment: string;
  score: number;
  datestamp: string;
}

export interface addOpinion {
  user: string;
  idCourt: number;
  comment: string;
  score: number;
  datestamp: string;
}
