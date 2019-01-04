const bodies = [
    {
        Name: "Sun",
        Diameter: 1392684,
        Distance: 0,
        NoOrbit: true,
        Color: "rgb(240,111,19)",
        Image: { Name: "sun.jpg", Scale: 1.253 },
        Satellites: [
            {
                Name: "Mercury",
                Diameter: 4880,
                Distance: 57909050,
                Color: "rgb(149,145,148)",
                Image: { Name: "mercury.jpg", Scale: 1 },
            },
            {
                Name: "Venus",
                Diameter: 12104,
                Distance: 108208000,
                Color: "rgb(174,109,37)",
                Image: { Name: "venus.jpg", Scale: 1 },
            },
            {
                Name: "Earth",
                Diameter: 12742,
                Distance: 149598261,
                Color: "rgb(104,105,129)",
                Image: { Name: "earth.jpg", Scale: 1.148 },
                Satellites: [
                    {
                        Name: "Moon",
                        Diameter: 3474,
                        Distance: 384399,
                        Color: "rgb(96,95,92)",
                        Image: { Name: "moon.jpg", Scale: 1 }
                    }
                ]
            },
            {
                Name: "Mars",
                Diameter: 6780,
                Distance: 227939100,
                Color: "rgb(173,139,103)",
                Image: { Name: "mars.jpg", Scale: 1 },
                Satellites: [
                    {
                        Name: "Phobos",
                        Diameter: 23,
                        Distance: 9376,
                        Color: "rgb(168,156,147)",
                        Image: { Name: "phobos.jpg", Scale: 1 },
                    },
                    {
                        Name: "Deimos",
                        Diameter: 12,
                        Distance: 23463,
                        Color: "rgb(202,177,149)",
                        Image: { Name: "deimos.jpg", Scale: 1 },
                    }
                ]
            },
            {
                Name: "Jupiter",
                Diameter: 139822,
                Distance: 778547200,
                Color: "rgb(167,160,158)",
                Image: { Name: "jupiter.jpg", Scale: 1 },
                Satellites: [
                    {
                        Name: "Metis",
                        Diameter: 45,
                        Distance: 127690,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Adrastea",
                        Diameter: 17,
                        Distance: 128690,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Amalthea",
                        Diameter: 175,
                        Distance: 181366,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Thebe",
                        Diameter: 100,
                        Distance: 221889,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Io",
                        Diameter: 3643,
                        Distance: 421700,
                        Color: "rgb(128,128,0)"
                    },
                    {
                        Name: "Europa",
                        Diameter: 3122,
                        Distance: 671034,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Ganymede",
                        Diameter: 5262,
                        Distance: 1070412,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Callisto",
                        Diameter: 4821,
                        Distance: 1882709,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Leda",
                        Diameter: 16,
                        Distance: 11187781,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Himalia",
                        Diameter: 170,
                        Distance: 11451971,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Lysithea",
                        Diameter: 36,
                        Distance: 11740560,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Elara",
                        Diameter: 86,
                        Distance: 11778034,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Ananke",
                        Diameter: 28,
                        Distance: 21454952,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Carme",
                        Diameter: 46,
                        Distance: 23197992,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Pasiphae",
                        Diameter: 60,
                        Distance: 23609042,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Sinope",
                        Diameter: 38,
                        Distance: 24057865,
                        Color: "rgb(128,128,128)"
                    }
                ]
            },
            {
                Name: "Saturn",
                Diameter: 116464,
                Distance: 1433449370,
                Color: "rgb(168,146,128)",
                Image: { Name: "saturn.jpg", Scale: 2.56 },
                Satellites: [
                    {
                        Name: "Pan",
                        Diameter: 28,
                        Distance: 133584,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Atlas",
                        Diameter: 30,
                        Distance: 137670,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Prometheus",
                        Diameter: 86,
                        Distance: 139380,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Pandora",
                        Diameter: 81,
                        Distance: 141720,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Epimethius",
                        Diameter: 116,
                        Distance: 151422,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Janus",
                        Diameter: 179,
                        Distance: 151472,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Mimas",
                        Diameter: 396,
                        Distance: 185404,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Enceladus",
                        Diameter: 504,
                        Distance: 237950,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Tethys",
                        Diameter: 1062,
                        Distance: 294619,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Telesto",
                        Diameter: 25,
                        Distance: 294619,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Calypso",
                        Diameter: 21,
                        Distance: 294619,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Dione",
                        Diameter: 1123,
                        Distance: 377396,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Helene",
                        Diameter: 35,
                        Distance: 377396,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Rhea",
                        Diameter: 1527,
                        Distance: 527108,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Titan",
                        Diameter: 5151,
                        Distance: 1221930,
                        Color: "rgb(128,128,0)"
                    },
                    {
                        Name: "Hyperion",
                        Diameter: 270,
                        Distance: 1481010,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Iapetus",
                        Diameter: 1469,
                        Distance: 3560820,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Kiviuq",
                        Diameter: 16,
                        Distance: 11294800,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Ijiraq",
                        Diameter: 12,
                        Distance: 11355316,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Phoebe",
                        Diameter: 213,
                        Distance: 12869700,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Paaliaq",
                        Diameter: 22,
                        Distance: 15103400,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Albiorix",
                        Diameter: 32,
                        Distance: 16266700,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Erriapus",
                        Diameter: 10,
                        Distance: 17236900,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Siarnaq",
                        Diameter: 40,
                        Distance: 17776600,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Tarvos",
                        Diameter: 15,
                        Distance: 18562800,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Ymir",
                        Diameter: 18,
                        Distance: 22429673,
                        Color: "rgb(128,128,128)"
                    }
                ]
            },
            {
                Name: "Uranus",
                Diameter: 50724,
                Distance: 2870671400,
                Color: "rgb(206,244,245)",
                Image: { Name: "uranus.jpg", Scale: 1 },
                Satellites: [
                    {
                        Name: "Cordelia",
                        Diameter: 40,
                        Distance: 49770,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Ophelia",
                        Diameter: 43,
                        Distance: 53790,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Bianca",
                        Diameter: 41,
                        Distance: 59170,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Cressida",
                        Diameter: 80,
                        Distance: 61780,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Desdemona",
                        Diameter: 64,
                        Distance: 62680,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Juliet",
                        Diameter: 94,
                        Distance: 64350,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Portia",
                        Diameter: 135,
                        Distance: 66090,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Rosalind",
                        Diameter: 72,
                        Distance: 69940,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Cupid",
                        Diameter: 18,
                        Distance: 74800,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Belinda",
                        Diameter: 90,
                        Distance: 75260,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Perdita",
                        Diameter: 30,
                        Distance: 76400,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Puck",
                        Diameter: 162,
                        Distance: 86010,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Mab",
                        Diameter: 25,
                        Distance: 97700,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Miranda",
                        Diameter: 472,
                        Distance: 129390,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Ariel",
                        Diameter: 1158,
                        Distance: 191020,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Umbriel",
                        Diameter: 1169,
                        Distance: 266300,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Titania",
                        Diameter: 1577,
                        Distance: 435910,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Oberon",
                        Diameter: 1523,
                        Distance: 583520,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Francisco",
                        Diameter: 22,
                        Distance: 4276000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Caliban",
                        Diameter: 72,
                        Distance: 7230000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Stephano",
                        Diameter: 32,
                        Distance: 8002000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Trinculo",
                        Diameter: 18,
                        Distance: 8571000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Sycorax",
                        Diameter: 150,
                        Distance: 12179000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Margaret",
                        Diameter: 20,
                        Distance: 14345000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Prospero",
                        Diameter: 50,
                        Distance: 16418000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Setebos",
                        Diameter: 48,
                        Distance: 17459000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Ferdinand",
                        Diameter: 20,
                        Distance: 20900000,
                        Color: "rgb(128,128,128)"
                    }
                ]
            },
            {
                Name: "Neptune",
                Diameter: 49244,
                Distance: 4498542600,
                Color: "rgb(102,160,247)",
                Image: { Name: "neptune.jpg", Scale: 1.124 },
                Satellites: [
                    {
                        Name: "Naiad",
                        Diameter: 66,
                        Distance: 48227,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Thalassa",
                        Diameter: 82,
                        Distance: 50074,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Despina",
                        Diameter: 150,
                        Distance: 52526,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Galatea",
                        Diameter: 176,
                        Distance: 61953,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Larissa",
                        Diameter: 194,
                        Distance: 73548,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "S/2004 N 1",
                        Diameter: 18,
                        Distance: 105300,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Proteus",
                        Diameter: 420,
                        Distance: 117646,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Triton",
                        Diameter: 2705,
                        Distance: 354759,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Nereid",
                        Diameter: 340,
                        Distance: 5513818,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Halimede",
                        Diameter: 62,
                        Distance: 16611000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Sao",
                        Diameter: 44,
                        Distance: 22228000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Laomedeia",
                        Diameter: 42,
                        Distance: 23567000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Psamathe",
                        Diameter: 40,
                        Distance: 48096000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Neso",
                        Diameter: 60,
                        Distance: 49285000,
                        Color: "rgb(128,128,128)"
                    }
                ]
            },
            {
                Name: "Pluto",
                Diameter: 2368,
                Distance: 5874000000,
                Color: "rgb(147,143,139)",
                Image: { Name: "pluto2.jpg", Scale: 1 },
                Satellites: [
                    {
                        Name: "Charon",
                        Diameter: 1207,
                        Distance: 17536,
                        Color: "rgb(75,70,68)",
                        Image: { Name: "charon2.jpg", Scale: 1 }
                    },
                    {
                        Name: "Styx",
                        Diameter: 18,
                        Distance: 42000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Nix",
                        Diameter: 92,
                        Distance: 48708,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Kerberos",
                        Diameter: 24,
                        Distance: 59000,
                        Color: "rgb(128,128,128)"
                    },
                    {
                        Name: "Hydra",
                        Diameter: 114,
                        Distance: 64749,
                        Color: "rgb(128,128,128)"
                    }
                ]
            }
        ],
        Regions: [
            {
                Name: "Asteroid Belt",
                Start: 299300000,
                Stop: 598400000,
                Color: "rgba(255,255,255,0.05)"
            },
            {
                Name: "Kuiper Belt",
                Start: 4498542600,
                Stop: 7480000000,
                Color: "rgba(255,255,255,0.05)"
            },
            {
                Name: "Oort Cloud",
                Start: 7480000000,
                Stop:  7480000000000,
                Color: "rgba(0,255,0,0.04)"
            },
            {
                Name: "Solar Tidal Truncation",
                Start: 14960000000000,
                Stop:  29920000000000,
                Color: "rgba(255,0,0,0.04)"
            }
        ]
    },
    {
        Name: "Proxima Centauri",
        Diameter: 196368,
        Distance: 40142000000000,
        NoOrbit: true,
        Color: "rgb(255,255,0)"
    },
    {
        Name: "Alpha Centauri A",
        Diameter: 1708823,
        Distance: 41340000000000,
        NoOrbit: true,
        Color: "rgb(255,255,0)",
        Satellites: [
            {
                Name: "Alpha Centauri B",
                Diameter: 1204672,
                Distance: 3700000000,
                Color: "rgb(255,255,0)",
                NoOrbit: true,
                Satellites: [
                    {
                        Name: "Alpha Centauri Bb",
                        Diameter: 15000,
                        Distance: 6000000,
                        Color: "rgb(149,145,148)"
                    }
                ]
            }
        ]
    },
];