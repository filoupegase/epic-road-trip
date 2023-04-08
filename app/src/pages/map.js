import React, { useState, useEffect } from "react";
import { Feature } from "ol";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { OSM, Vector as VectorSource } from "ol/source";
import "ol/ol.css";

export default function MapComponent() {
  useEffect(() => {
    const features = [];

    fetch("/api/amadeus/get-hotel-list-by-city?city=Paris")
      .then((res) => res.json())
      .then((result) => {
        result.forEach((elem) => {
          const feature = new Feature({
            geometry: new Point(
              fromLonLat([+elem.geoCode.longitude, +elem.geoCode.latitude])
            ),
          });

          features.push(feature);
        });

        const vectorSource = new VectorSource({
          features: features,
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        const map = new Map({
          target: "hotel_map",
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer,
          ],
          view: new View({
            center: fromLonLat([2.3488, 48.8534]),
            zoom: 12,
          }),
        });
      });
  }, []);

  return (
    <div
      className=""
      style={{ height: "400px", width: "100%" }}
      id="hotel_map"
    />
  );
}
