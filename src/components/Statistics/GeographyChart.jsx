import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { tokens } from "../../theme";

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    { id: "USA", value: 500000 }, // United States
    { id: "CAN", value: 700000 }, // Canada
    { id: "MEX", value: 350000 }, // Mexico
    { id: "BRA", value: 460000 }, // Brazil
    { id: "ARG", value: 290000 }, // Argentina
    { id: "COL", value: 230000 }, // Colombia
    { id: "RUS", value: 810000 }, // Russia
    { id: "CHN", value: 930000 }, // China
    { id: "IND", value: 880000 }, // India
    { id: "AUS", value: 300000 }, // Australia
    { id: "FRA", value: 640000 }, // France
    { id: "DEU", value: 680000 }, // Germany
    { id: "GBR", value: 400000 }, // United Kingdom
    { id: "ZAF", value: 510000 }  // South Africa
];

const geoFeatures = {
  "type": "FeatureCollection",
  "features": [
      {
          "type": "Feature",
          "properties": { "name": "USA" },
          "id": "USA",
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  // Example coordinates for the USA, simplified
                  [[-125.001650, 24.949300], [-66.932251, 24.949300], [-66.932251, 49.590400], [-125.001650, 49.590400], [-125.001650, 24.949300]]
              ]
          }
      },
      // Add similar objects for other countries (CAN, MEX, etc.) with their coordinates
  ]
};


  return (
    <ResponsiveChoropleth
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;