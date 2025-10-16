export interface BanxicoDato {
  fecha: string;
  dato: string;
}

export interface BanxicoSerie {
  idSerie: string;
  titulo: string;
  datos: BanxicoDato[];
}

export interface BanxicoResponse {
  bmx: {
    series: BanxicoSerie[];
  };
}

export interface MinMax {
  min: string | null;
  max: string | null;
}
