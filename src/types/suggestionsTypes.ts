export interface Suggestions {
  place_id: number;
  display_name: string;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  address: {
    county: string;
    state: string;
    country: string;
    boundingbox: string[];
  };
}
